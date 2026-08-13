import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { sendContactEmail } from "./email";

const CONTACT_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const CONTACT_RATE_LIMIT_MAX = 10;
const contactRequests = new Map<string, { count: number; resetAt: number }>();

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", (req, res, next) => {
    const now = Date.now();
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const current = contactRequests.get(ip);
    const entry = !current || current.resetAt <= now
      ? { count: 1, resetAt: now + CONTACT_RATE_LIMIT_WINDOW_MS }
      : { ...current, count: current.count + 1 };

    contactRequests.set(ip, entry);
    res.set({
      "RateLimit-Limit": String(CONTACT_RATE_LIMIT_MAX),
      "RateLimit-Remaining": String(Math.max(0, CONTACT_RATE_LIMIT_MAX - entry.count)),
      "RateLimit-Reset": String(Math.ceil(entry.resetAt / 1000)),
    });

    if (entry.count > CONTACT_RATE_LIMIT_MAX) {
      return res.status(429).json({ message: "Muitas tentativas. Tente novamente mais tarde." });
    }

    next();
  }, async (req, res) => {
    const result = insertContactMessageSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromError(result.error).toString() });
    }
    const message = await storage.createContactMessage(result.data);

    try {
      await sendContactEmail(result.data);
    } catch (err) {
      console.error("Falha ao enviar e-mail de contato:", err);
    }

    return res.status(201).json({ success: true, id: message.id });
  });

  return httpServer;
}
