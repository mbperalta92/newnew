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
      { title: "REPFIX — Serviços Técnicos para Empresas e Particulares" },
      { name: "description", content: "Diagnóstico transparente, reparação e relatórios técnicos para informática, eletrónica e eletrodomésticos. Soluções para empresas e clientes particulares." },
      { property: "og:title", content: "REPFIX — Serviços Técnicos" },
      { property: "og:description", content: "Parceria técnica rigorosa e transparente. Para a sua empresa ou para o seu equipamento pessoal." },
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
      />
      <Values />
      <Reports />
      <ImageBreak
        image="https://images.unsplash.com/photo-1518770660967-3a4e0e3d8ec6?auto=format&fit=crop&w=1920&q=80"
        eyebrow="Peritagem · Evidência"
        title="Relatórios técnicos defensáveis e auditáveis"
        caption="Documentação rigorosa pronta para os seus fluxos de decisão."
      />
      <BudgetForm />
      <Footer />
    </main>
  );
}