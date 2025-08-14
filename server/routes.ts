import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAuditSchema } from "@shared/schema";
import axios from "axios";
import * as cheerio from "cheerio";

// StepLock keyword patterns
const STEPLOCK_PATTERNS = {
  emergency: [
    "24/7", "emergency", "urgent", "immediate", "asap", "now", "today",
    "same day", "overnight", "fast", "quick", "rapid", "instant"
  ],
  service: [
    "repair", "fix", "service", "maintenance", "installation", "replacement",
    "diagnostic", "inspection", "cleaning", "tune-up", "overhaul"
  ],
  local: [
    "near me", "local", "nearby", "area", "city", "town", "neighborhood",
    "location", "address", "directions", "map"
  ],
  problem: [
    "broken", "not working", "failed", "damaged", "leaking", "stuck",
    "won't start", "error", "issue", "problem", "trouble", "help"
  ]
};

function extractStepLockKeywords(text: string) {
  const lowerText = text.toLowerCase();
  const keywords = {
    emergency: [] as string[],
    service: [] as string[],
    local: [] as string[],
    problem: [] as string[]
  };

  for (const [category, patterns] of Object.entries(STEPLOCK_PATTERNS)) {
    for (const pattern of patterns) {
      if (lowerText.includes(pattern)) {
        keywords[category as keyof typeof keywords].push(pattern);
      }
    }
  }

  // Remove duplicates
  for (const category of Object.keys(keywords)) {
    keywords[category as keyof typeof keywords] = Array.from(new Set(keywords[category as keyof typeof keywords]));
  }

  return keywords;
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all audits
  app.get("/api/audits", async (req, res) => {
    try {
      const audits = await storage.getAudits();
      res.json(audits);
    } catch (error) {
      console.error("Error fetching audits:", error);
      res.status(500).json({ error: "Failed to fetch audits" });
    }
  });

  // Get recent audits
  app.get("/api/audits/recent", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const audits = await storage.getRecentAudits(limit);
      res.json(audits);
    } catch (error) {
      console.error("Error fetching recent audits:", error);
      res.status(500).json({ error: "Failed to fetch recent audits" });
    }
  });

  // Create new audit
  app.post("/api/audits", async (req, res) => {
    try {
      const { url, notionDbId, notionToken, airtableBaseId, airtableToken } = req.body;

      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      // Validate URL
      try {
        new URL(url);
      } catch {
        return res.status(400).json({ error: "Invalid URL format" });
      }

      // Fetch and analyze the webpage
      const response = await axios.get(url, {
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const html = response.data;
      const $ = cheerio.load(html);

      // Extract basic information
      const title = $('title').first().text().trim() || $('h1').first().text().trim();
      const description = $('meta[name="description"]').attr('content') || '';
      const h1 = $('h1').first().text().trim();
      
      // Count various elements
      const imagesCount = $('img').length;
      const scriptsCount = $('script').length;
      const linksCount = $('a[href]').length;
      const hasWebp = $('img[src$=".webp"], img[src*=".webp"]').length > 0;
      
      // Extract text content and count words
      const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
      const wordCount = bodyText.split(' ').filter(word => word.length > 0).length;

      // Extract links (sample)
      const links = Array.from(new Set(
        $('a[href]').map((_, el) => $(el).attr('href')).get()
          .filter(href => href && href.startsWith('http'))
          .slice(0, 50)
      ));

      // Analyze StepLock keywords
      const fullText = `${title} ${description} ${h1} ${bodyText}`;
      const stepLockKeywords = extractStepLockKeywords(fullText);

      // Create audit record
      const auditData = {
        url,
        title,
        description,
        h1,
        wordCount,
        imagesCount,
        scriptsCount,
        linksCount,
        hasWebp,
        links,
        stepLockKeywords
      };

      const audit = await storage.createAudit(auditData);

      // TODO: Integrate with Notion and Airtable if tokens provided
      if (notionDbId && notionToken) {
        console.log("Would integrate with Notion:", { notionDbId, title, url });
      }

      if (airtableBaseId && airtableToken) {
        console.log("Would integrate with Airtable:", { airtableBaseId, title, url });
      }

      res.json(audit);

    } catch (error) {
      console.error("Error creating audit:", error);
      if (axios.isAxiosError(error)) {
        if (error.code === 'ENOTFOUND') {
          return res.status(400).json({ error: "Unable to reach the specified URL" });
        }
        if (error.response?.status === 404) {
          return res.status(400).json({ error: "URL not found (404)" });
        }
        if (error.code === 'ECONNABORTED') {
          return res.status(408).json({ error: "Request timeout - URL took too long to respond" });
        }
      }
      res.status(500).json({ error: "Failed to analyze URL" });
    }
  });

  // Get competitors
  app.get("/api/competitors", async (req, res) => {
    try {
      const competitors = await storage.getCompetitors();
      res.json(competitors);
    } catch (error) {
      console.error("Error fetching competitors:", error);
      res.status(500).json({ error: "Failed to fetch competitors" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
