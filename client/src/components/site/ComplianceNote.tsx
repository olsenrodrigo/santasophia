import { cn } from "@/lib/utils";

export const COMPLIANCE_TEXT =
  "As condições, regras, taxas, prazos e critérios de contemplação variam de acordo com a administradora, grupo e modalidade contratada. A contemplação não é garantida nem necessariamente imediata. Consulte as condições aplicáveis antes da contratação.";

export function ComplianceNote({ className }: { className?: string }) {
  return <p className={cn("text-xs leading-relaxed text-muted-foreground", className)}>{COMPLIANCE_TEXT}</p>;
}
