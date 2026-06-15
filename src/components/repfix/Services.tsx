import { Search, Building2, FileSearch, CircuitBoard, Tv, Laptop, Handshake, Users, Briefcase, Crosshair, ClipboardCheck, Calculator, ArrowUpRight } from "lucide-react";

const blocks = [
  {
    badge: "Avaliação",
    tag: "Inspeção",
    icon: Search,
    title: "🔍 Avaliação técnica",
    desc: "Realizamos avaliações técnicas independentes para identificar falhas, analisar o estado de equipamentos e apoiar decisões fundamentadas através de uma abordagem rigorosa e objetiva.",
    items: [
      { icon: CircuitBoard, label: "Diagnóstico técnico especializado" },
      { icon: Tv, label: "Avaliação de equipamentos e sistemas" },
      { icon: Laptop, label: "Análise de falhas e desempenho" },
    ],
    cta: "Pedir avaliação",
  },
  {
    badge: "Corporativo",
    tag: "Consultoria",
    icon: Building2,
    title: "🏢 B2B Auditorias & Consultoria",
    desc: "Apoiamos empresas na identificação de riscos, otimização de ativos e tomada de decisão através de auditorias, análises técnicas e consultoria especializada.",
    items: [
      { icon: Handshake, label: "Auditorias e verificações" },
      { icon: Users, label: "Análise e mitigação de riscos" },
      { icon: Briefcase, label: "Consultoria técnica especializada" },
    ],
    cta: "Pedir proposta B2B",
  },
  {
    badge: "Peritagens",
    tag: "Laudos",
    icon: FileSearch,
    title: "📑 Peritagens",
    desc: "Produzimos relatórios técnicos independentes e fundamentados para apoiar processos de análise, investigação de ocorrências e tomada de decisão.",
    items: [
      { icon: Crosshair, label: "Peritagens técnicas independentes" },
      { icon: ClipboardCheck, label: "Investigação de ocorrências" },
      { icon: Calculator, label: "Relatórios técnicos fundamentados" },
    ],
    cta: "Solicitar relatório",
  },
];

export function Services() {
  return (
    <section id="servicos" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#BF953F] uppercase">Serviços</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            Três frentes técnicas, <span className="text-gold-gradient">um único padrão de rigor</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Particulares, empresas ou peritagens independentes — adaptamos o método, mantemos a transparência e a precisão técnica.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((b) => (
            <article key={b.badge} className="group gold-glow glass-card rounded-3xl p-7 relative overflow-hidden flex flex-col">
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(252,246,186,0.18),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center justify-between relative">
                <span className="inline-flex items-center rounded-full bg-[rgba(191,149,63,0.12)] border border-[#BF953F]/40 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-[#FCF6BA]">
                  {b.badge}
                </span>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient text-[#0B1325] shadow-[0_8px_24px_-8px_rgba(252,246,186,0.6)] group-hover:rotate-[-6deg] transition-transform duration-500">
                  <b.icon className="h-6 w-6" strokeWidth={2.2} />
                </div>
              </div>

              <div className="mt-5 text-xs font-semibold tracking-[0.2em] text-[#BF953F] uppercase">{b.tag}</div>
              <h3 className="mt-2 text-xl font-bold leading-snug">{b.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>

              <ul className="mt-6 space-y-2.5 flex-1">
                {b.items.map((i) => (
                  <li key={i.label} className="flex items-start gap-3 rounded-xl p-3 bg-[#0e1a36]/60 border border-[#BF953F]/15 group-hover:border-[#BF953F]/35 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-[#0B1325] border border-[#BF953F]/30 flex items-center justify-center shrink-0">
                      <i.icon className="h-4 w-4 text-[#FCF6BA]" />
                    </div>
                    <span className="text-xs pt-1.5 text-foreground/90">{i.label}</span>
                  </li>
                ))}
              </ul>

              <a href="#orcamentos" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-gradient group-hover:gap-2.5 transition-all">
                {b.cta} <ArrowUpRight className="h-4 w-4 text-[#FCF6BA]" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}