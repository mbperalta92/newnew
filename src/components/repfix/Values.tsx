import { Eye, Microscope, Target } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Transparência Total",
    desc: "Sem custos ocultos. Explicamos o diagnóstico de forma clara e simples, antes de qualquer intervenção.",
  },
  {
    icon: Microscope,
    title: "Rigor Técnico",
    desc: "Relatórios detalhados com identificação da causa-raiz da avaria e evidência documental.",
  },
  {
    icon: Target,
    title: "Foco na Resolução",
    desc: "Respostas rápidas para situações críticas. Emitimos diagnósticos e pareceres técnicos com a máxima agilidade, permitindo que avance sem perdas de tempo.",
  },
];

export function Values() {
  return (
    <section className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#BF953F] uppercase">Os nossos pilares</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            O que nos define <span className="text-gold-gradient">no terreno</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Acreditamos que confiança não se compra com slogans — constrói-se com método, clareza e responsabilidade.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {values.map((v) => (
            <article key={v.title} className="gold-glow glass-card rounded-3xl p-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient text-[#0B1325]">
                <v.icon className="h-6 w-6" strokeWidth={2.2} />
              </div>
              <h3 className="mt-6 text-xl font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}