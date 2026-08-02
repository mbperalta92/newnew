import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/repfix/Navbar";
import { Hero } from "@/components/repfix/Hero";
import { Services } from "@/components/repfix/Services";
import { ImageBreak } from "@/components/repfix/ImageBreak";
import { Values } from "@/components/repfix/Values";
import { Reports } from "@/components/repfix/Reports";
import { BudgetForm } from "@/components/repfix/BudgetForm";
import { Footer } from "@/components/repfix/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "REPFIX | Diagnóstico Eletrónico, Assistência Técnica e Relatórios" },
      {
        name: "description",
        content:
          "Serviços especializados em diagnóstico eletrónico de hardware, reparações e relatórios técnicos para clientes particulares e parceiros empresariais.",
      },
      { property: "og:title", content: "REPFIX | Diagnóstico Eletrónico, Assistência Técnica e Relatórios" },
      {
        property: "og:description",
        content:
          "Serviços especializados em diagnóstico eletrónico de hardware, reparações e relatórios técnicos para clientes particulares e parceiros empresariais.",
      },
      { property: "og:image", content: "https://www.repfix.pt/og-image.png" },
      { property: "og:url", content: "https://www.repfix.pt" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "REPFIX" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "REPFIX | Diagnóstico Eletrónico, Assistência Técnica e Relatórios" },
      {
        name: "twitter:description",
        content:
          "Serviços especializados em diagnóstico eletrónico de hardware, reparações e relatórios técnicos para clientes particulares e parceiros empresariais.",
      },
      { name: "twitter:image", content: "https://www.repfix.pt/og-image.png" },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ImageBreak
        image="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1920&q=80"
        eyebrow="Eletrónica · Precisão"
        title="Laboratório eletrónico com instrumentação dedicada"
        caption="Equipamento moderno de medição e teste para diagnóstico fiável de avarias."
      />
      <Services />
      <ImageBreak
        image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80"
        eyebrow="Hardware · Análise"
        title="Diagnóstico ao nível do hardware"
        caption="Inspeção rigorosa e ferramentas de teste de alta resolução para resultados claros."
        align="right"
        singleLineCaptionDesktop={true}
      />
      <Values />
      <Reports />
      <ImageBreak
        image="https://images.unsplash.com/photo-1518770660967-3a4e0e3d8ec6?auto=format&fit=crop&w=1920&q=80"
        eyebrow="Avaliação · Evidência"
        title="Relatórios técnicos defensáveis e auditáveis"
        caption="Documentação rigorosa pronta para os seus fluxos de decisão."
      />
      <BudgetForm />
      <Footer />
    </main>
  );
}