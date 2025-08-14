import Airtable from 'airtable';

export async function upsertCompetitorToAirtable({
  baseId,
  token,
  url,
  title
}: {
  baseId?: string,
  token?: string,
  url: string,
  title?: string
}) {
  if (!baseId || !token) return;
  
  const base = new Airtable({ apiKey: token }).base(baseId);
  
  await base('Competitors').create([{
    fields: {
      URL: url,
      Title: title || url
    }
  }]);
}