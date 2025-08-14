import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';
import * as cheerio from 'cheerio';
import metascraper from 'metascraper';
import metascraperTitle from 'metascraper-title';
import metascraperDescription from 'metascraper-description';
import metascraperUrl from 'metascraper-url';
import { logAuditToNotion } from './notionClient.js';
import { upsertCompetitorToAirtable } from './airtableClient.js';
import { stepLockMapText } from './stepLockMapper.js';

const scraper = metascraper([metascraperTitle(), metascraperDescription(), metascraperUrl()]);

admin.initializeApp();
const db = admin.firestore();

function validUrl(u: string): boolean {
  try {
    new URL(u);
    return true;
  } catch {
    return false;
  }
}

export const auditUrl = functions
  .region('us-central1')
  .runWith({ memory: '512MB', timeoutSeconds: 120 })
  .https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Headers','Content-Type');
    if (req.method === 'OPTIONS') return res.status(204).send('');

    try {
      const { url, projectId = 'default', notionDbId, notionToken, airtableBaseId, airtableToken } = req.body || {};

      if (!url || !validUrl(url)) return res.status(400).json({ error: "Provide a valid 'url'." });

      const resp = await axios.get(url, { timeout: 20000, headers: { 'User-Agent':'Mozilla/5.0' } });
      const html = resp.data as string;
      const $ = cheerio.load(html);

      const meta = await scraper({ html, url });
      const h1 = $('h1').first().text().trim();
      const title = meta.title || $('title').text().trim();
      const description = meta.description || $('meta[name="description"]').attr('content') || '';
      const bodyText = $('body').text().replace(/\s+/g,' ').trim();
      const wordCount = bodyText.split(' ').filter(Boolean).length;
      const imagesCount = $('img').length;
      const scriptsCount = $('script').length;
      const hasWebp = $("img[src$='.webp']").length > 0;
      const links = Array.from(new Set($('a[href]').map((_,a)=>String($(a).attr('href'))).get())).slice(0,100);

      const stepLock = stepLockMapText(bodyText);

      const doc = {
        url,
        projectId,
        fetchedAt: admin.firestore.FieldValue.serverTimestamp(),
        title,
        description,
        h1,
        wordCount,
        speedHints: {
          imagesCount,
          scriptsCount,
          hasWebp
        },
        links,
        stepLock
      };

      const ref = await db.collection('audits').add(doc);

      await logAuditToNotion({ notionDbId, notionToken, title, url, projectId, wordCount });
      await upsertCompetitorToAirtable({ baseId: airtableBaseId, token: airtableToken, url, title });

      return res.json({ id: ref.id, ...doc });
    } catch (e:any) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Failed to audit URL' });
    }
  });