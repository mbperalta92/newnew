import { FileCheck2, Lock, Crosshair, Calculator } from "lucide-react";

const features = [
  { icon: Lock, title: "Criptografia de Dados", desc: "Documentos cifrados ponta-a-ponta com acesso controlado por parceiro." },
  { icon: Crosshair, title: "Diagnóstico de Causa-Raiz", desc: "Análise estruturada com evidência fotográfica e rastreio histórico." },
  { icon: Calculator, title: "Orçamentação Detalhada", desc: "Peça-a-peça, mão-de-obra e SLA — pronto para aprovação financeira." },
];

export function Reports() {
  return (
    <section id="relatorios" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="text-xs font-semibold tracking-[0.2em] text-[#BF953F] uppercase">Relatórios Técnicos</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            Documentação técnica <span className="text-gold-gradient">de nível corporativo</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Cada intervenção gera um relatório auditável, defensável e pronto para os fluxos de aprovação
            das suas equipas financeiras, jurídicas e de seguros.
          </p>
          <ul className="mt-7 space-y-4">
            {features.map((f) => (
              <li key={f.title} className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-gold-gradient text-[#0B1325] flex items-center justify-center shrink-0">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{f.title}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{f.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-[var(--gradient-gold-soft)] blur-2xl opacity-60" />
          <div className="relative rounded-2xl border-gold p-1.5 shadow-[var(--shadow-elegant)] float-soft">
            <div className="rounded-xl bg-[#0B1325] p-6 text-left">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-md bg-gold-gradient flex items-center justify-center text-[#0B1325]">
                    <FileCheck2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gold-gradient">REPFIX · Relatório Técnico</div>
                    <div className="text-[10px] text-muted-foreground">Ref. RPX-2026-00428 · Confidencial</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full border border-[#BF953F]/60 text-[#FCF6BA]">B2B · NDA</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5 text-xs">
                <div className="glass-card rounded-lg p-3">
                  <div className="text-muted-foreground">Parceiro</div>
                  <div className="mt-1 font-semibold">Acme Insurance Group</div>
                </div>
                <div className="glass-card rounded-lg p-3">
                  <div className="text-muted-foreground">Tipo</div>
                  <div className="mt-1 font-semibold">Peritagem · Sinistro #4821</div>
                </div>
              </div>

              <div className="mt-4 glass-card rounded-lg p-4 text-xs space-y-2.5">
                <div className="font-semibold text-foreground">Causa-Raiz</div>
                {[
                  ["Fonte", "Sobretensão na rede pública", "Confirmado"],
                  ["Placa", "Componentes SMD danificados", "Substituir"],
                  ["Cobertura", "Apólice multi-riscos AC-12", "Elegível"],
                ].map(([a, b, c]) => (
                  <div key={a} className="grid grid-cols-12 gap-2 py-1.5 border-b border-border/40 last:border-0">
                    <div className="col-span-3 text-muted-foreground">{a}</div>
                    <div className="col-span-6">{b}</div>
                    <div className="col-span-3 text-right text-[#FCF6BA]">{c}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Orçamento estimado</span>
                <span className="text-lg font-bold text-gold-gradient">€ 1 284,90</span>
              </div>

              <div className="mt-5 h-1.5 rounded-full bg-[#1a2540] overflow-hidden">
                <div className="h-full w-[92%] bg-gold-gradient" />
              </div>
              <div className="mt-1.5 text-[10px] text-muted-foreground">Validação técnica · 92%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
