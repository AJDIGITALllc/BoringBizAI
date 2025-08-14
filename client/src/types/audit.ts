export interface AuditResult {
  id: string;
  url: string;
  title?: string;
  description?: string;
  h1?: string;
  wordCount: number;
  imagesCount: number;
  scriptsCount: number;
  linksCount: number;
  hasWebp: boolean;
  links: string[];
  stepLockKeywords: {
    emergency: string[];
    service: string[];
    local: string[];
    problem: string[];
  };
  createdAt: string;
}

export interface AuditRequest {
  url: string;
  notionDbId?: string;
  notionToken?: string;
  airtableBaseId?: string;
  airtableToken?: string;
}

export interface StepLockKeywords {
  emergency: string[];
  service: string[];
  local: string[];
  problem: string[];
}
