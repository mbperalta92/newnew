import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" className="relative pt-36 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute -top-32 right-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(191,149,63,0.25),transparent_70%)] blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(170,119,28,0.18),transparent_70%)] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-[#FCF6BA]" />
          Eletrónica · Diagnóstico de precisão · Orçamentação transparente
        </div>

        <h1 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
          <span className="text-gold-gradient">Parceria técnica</span>
          <br />
          de <span className="shimmer">ponta a ponta</span>
        </h1>

        <p className="mt-7 mx-auto max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
          A REPFIX é especializada em avaliação e análise técnica. Realizamos inspeções, diagnósticos, peritagens e auditorias, apoiando empresas e particulares na identificação de falhas, avaliação de riscos, investigação de ocorrências e tomada de decisões fundamentadas através de relatórios técnicos independentes.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#orcamentos" className="group inline-flex items-center gap-2 rounded-full bg-gold-gradient text-[#0B1325] font-semibold px-7 py-3.5 shadow-[var(--shadow-gold)] hover:scale-[1.03] transition-transform">
            Pedir Orçamento <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#servicos" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-foreground border border-[#BF953F]/60 hover:border-[#FCF6BA] hover:bg-[rgba(191,149,63,0.08)] transition-colors">
            Conhecer Serviços
          </a>
        </div>

        <div className="mt-12 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-[#FCF6BA]" /> Sem custos ocultos · Diagnóstico claro · Confidencialidade garantida
        </div>
      </div>
    </section>
  );
}