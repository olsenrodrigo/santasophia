import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
}).extend({
  // `trim()` antes do `min()`: sem isso, um campo só com espaços passa.
  name: z.string().trim().min(2, "Informe seu nome.").max(120),
  phone: z
    .string()
    .trim()
    .max(24)
    // Aceita máscara ((16) 99197-2435, +55 16 ...), mas exige dígitos de verdade:
    // um telefone brasileiro tem no mínimo 10 dígitos com DDD.
    .refine((v) => (v.match(/\d/g) ?? []).length >= 10, "Informe um telefone válido com DDD."),
  email: z.string().trim().max(180).email("Informe um e-mail válido."),
  message: z.string().trim().min(2, "Conte um pouco sobre seu objetivo.").max(4000),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
