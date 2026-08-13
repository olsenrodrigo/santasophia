import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { type ContactMessage, type InsertContactMessage, contactMessages } from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

class DatabaseStorage implements IStorage {
  private readonly db;

  constructor(databaseUrl: string) {
    const pool = new pg.Pool({ connectionString: databaseUrl });
    this.db = drizzle(pool);
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [result] = await this.db.insert(contactMessages).values(message).returning();
    return result;
  }
}

class JsonlStorage implements IStorage {
  private readonly directory = path.resolve(process.cwd(), "data");
  private readonly file = path.join(this.directory, "contact-messages.jsonl");
  private sequence = 0;
  private lastMs = 0;

  /**
   * Id monotonico sem colisao: o contador reinicia a cada milissegundo, entao
   * o offset nunca invade o milissegundo seguinte (o que acontecia acima de
   * 1000 mensagens com um contador global).
   */
  private nextId(ms: number): number {
    if (ms !== this.lastMs) {
      this.lastMs = ms;
      this.sequence = 0;
    }
    return ms * 1000 + Math.min(this.sequence++, 999);
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const createdAt = new Date();
    const record: ContactMessage = {
      id: this.nextId(createdAt.getTime()),
      ...message,
      createdAt,
    };
    await mkdir(this.directory, { recursive: true });
    await appendFile(this.file, `${JSON.stringify(record)}\n`, "utf8");
    return record;
  }
}

function createStorage(): IStorage {
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    return new DatabaseStorage(databaseUrl);
  }

  console.warn("DATABASE_URL ausente; contatos serão gravados em data/contact-messages.jsonl.");
  return new JsonlStorage();
}

export const storage = createStorage();
