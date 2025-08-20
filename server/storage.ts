import { type User, type InsertUser, type Audit, type InsertAudit, type Competitor, type InsertCompetitor } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createAudit(audit: InsertAudit): Promise<Audit>;
  getAudit(id: string): Promise<Audit | undefined>;
  getAudits(): Promise<Audit[]>;
  getRecentAudits(limit?: number): Promise<Audit[]>;
  
  createCompetitor(competitor: InsertCompetitor): Promise<Competitor>;
  getCompetitors(): Promise<Competitor[]>;
  getCompetitorByUrl(url: string): Promise<Competitor | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private audits: Map<string, Audit>;
  private competitors: Map<string, Competitor>;

  constructor() {
    this.users = new Map();
    this.audits = new Map();
    this.competitors = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createAudit(insertAudit: InsertAudit): Promise<Audit> {
    const id = randomUUID();
    const now = new Date();
    const audit: Audit = {
      id,
      url: insertAudit.url,
      title: insertAudit.title ?? null,
      description: insertAudit.description ?? null,
      h1: insertAudit.h1 ?? null,
      wordCount: insertAudit.wordCount ?? null,
      imagesCount: insertAudit.imagesCount ?? null,
      scriptsCount: insertAudit.scriptsCount ?? null,
      linksCount: insertAudit.linksCount ?? null,
      hasWebp: insertAudit.hasWebp ?? null,
      links: insertAudit.links ? [...insertAudit.links] : null,
      stepLockKeywords: insertAudit.stepLockKeywords ? {
        emergency: [...insertAudit.stepLockKeywords.emergency],
        service: [...insertAudit.stepLockKeywords.service],
        local: [...insertAudit.stepLockKeywords.local],
        problem: [...insertAudit.stepLockKeywords.problem]
      } : null,
      createdAt: now,
      updatedAt: now,
    };
    this.audits.set(id, audit);
    return audit;
  }

  async getAudit(id: string): Promise<Audit | undefined> {
    return this.audits.get(id);
  }

  async getAudits(): Promise<Audit[]> {
    return Array.from(this.audits.values()).sort(
      (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getRecentAudits(limit = 10): Promise<Audit[]> {
    const allAudits = await this.getAudits();
    return allAudits.slice(0, limit);
  }

  async createCompetitor(insertCompetitor: InsertCompetitor): Promise<Competitor> {
    const id = randomUUID();
    const now = new Date();
    const competitor: Competitor = {
      id,
      name: insertCompetitor.name,
      url: insertCompetitor.url,
      industry: insertCompetitor.industry ?? null,
      score: insertCompetitor.score ?? null,
      lastAnalyzed: insertCompetitor.lastAnalyzed ?? null,
      createdAt: now,
    };
    this.competitors.set(id, competitor);
    return competitor;
  }

  async getCompetitors(): Promise<Competitor[]> {
    return Array.from(this.competitors.values()).sort(
      (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getCompetitorByUrl(url: string): Promise<Competitor | undefined> {
    return Array.from(this.competitors.values()).find(
      (competitor) => competitor.url === url
    );
  }
}

export const storage = new MemStorage();
