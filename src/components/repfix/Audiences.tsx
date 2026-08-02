import { useState } from "react";
import { Factory, ShieldCheck, Store, Briefcase, CheckCircle2 } from "lucide-react";

const audiences = [
  {
    id: "fabricantes",
    icon: Factory,
    label: "Fabricantes & Marcas",
    title: "Avaliações técnicas rigorosas para garantias",
    desc: "Apoio técnico e diagnóstico de precisão em equipamentos, emitindo relatórios técnicos independentes e orçamentação clara para validação de garantias.",
    points: ["Avaliações em 48h", "Relatório com evidência fotográfica", "Controlo de qualidade"],
  },
  {
    id: "retalho",
    icon: Store,
    label: "Retalhistas & Marcas",
    title: "Gestão eficiente de swap e apoio logístico",
    desc: "Operamos em nome da sua grande superfície, garantindo a avaliação rápida de devoluções e triagem (swap) de equipamentos.",
    points: ["Processamento de devoluções", "Logística e triagem", "Reporting de conformidade"],
  },
  {
    id: "pme",
    icon: Briefcase,
    label: "Escritórios & PMEs",
    title: "Mantemos o seu hardware e infraestrutura operacionais",
    desc: "Suporte técnico fixo ou avulso para IT corporativo, sem o custo de uma equipa interna dedicada.",
    points: ["Helpdesk técnico", "Manutenção preventiva", "Renovação de parque"],
  },
];

export function Audiences() {
  const [active, setActive] = useState(audiences[0].id);
  const current = audiences.find((a) => a.id === active)!;

  return (
    <section className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#BF953F] uppercase">Quem Ajudamos</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            Setores com quem <span className="text-gold-gradient">trabalhamos</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cada parceiro tem uma exigência diferente. A nossa estrutura adapta-se ao seu modelo operacional.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-[340px_1fr] gap-6">
          <div className="flex flex-col gap-3">
            {audiences.map((a) => {
              const isActive = a.id === active;
              return (
                <button
                  key={a.id}
                  onClick={() => setActive(a.id)}
                  className={`text-left rounded-2xl p-5 transition-all flex items-start gap-4 ${
                    isActive ? "border-gold bg-[rgba(252,246,186,0.04)]" : "glass-card hover:bg-[rgba(191,149,63,0.05)]"
                  }`}
                >
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${isActive ? "bg-gold-gradient text-[#0B1325]" : "bg-[#0e1a36] text-[#FCF6BA]"}`}>
                    <a.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{a.label}</div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{a.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-3xl border-gold p-1.5 shadow-[var(--shadow-elegant)]">
            <div className="rounded-[1.35rem] bg-[#0B1325]/90 p-8 md:p-10 h-full">
              <div className="inline-flex items-center gap-2 rounded-full glass-card px-3 py-1 text-[11px] text-muted-foreground">
                <current.icon className="h-3.5 w-3.5 text-[#FCF6BA]" />
                {current.label}
              </div>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight">{current.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{current.desc}</p>

              <ul className="mt-6 grid sm:grid-cols-3 gap-3">
                {current.points.map((p) => (
                  <li key={p} className="glass-card rounded-xl p-4 text-sm flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#FCF6BA] mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <a href="#proposta" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient text-[#0B1325] font-semibold px-6 py-3 text-sm hover:scale-[1.02] transition-transform">
                Falar com a equipa comercial
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
