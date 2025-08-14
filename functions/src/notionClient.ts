export async function logAuditToNotion({
  notionDbId,
  notionToken,
  title,
  url,
  projectId,
  wordCount
}: {
  notionDbId?: string,
  notionToken?: string,
  title?: string,
  url: string,
  projectId?: string,
  wordCount?: number
}) {
  if (!notionDbId || !notionToken) return;
  
  const { Client } = await import('@notionhq/client');
  const notion = new Client({ auth: notionToken });
  
  await notion.pages.create({
    parent: { database_id: notionDbId },
    properties: {
      Name: { title: [{ text: { content: title || url } }] },
      URL: { url },
      Project: { rich_text: [{ text: { content: projectId || 'default' } }] },
      WordCount: { number: wordCount || 0 }
    }
  });
}