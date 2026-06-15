const specialties = [
  "Inspeções elétricas visuais",
  "Avaliação de risco",
  "Termografia",
  "Manutenção preventiva",
  "Inventário de ativos",
  "Etiquetagem de equipamentos",
  "Apoio a seguradoras",
  "Recuperação pós-sinistro",
  "Monitorização IoT",
];

export function Expansion() {
  return (
    <section className="relative py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-2xl border border-[#BF953F]/20 bg-[#0e1a36]/40 p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="text-[10px] font-medium tracking-[0.28em] text-[#BF953F]/80 uppercase">Sob consulta</div>
              <h3 className="mt-2 text-lg md:text-xl font-semibold text-foreground/90">
                Especialidades sob Consulta &amp; Vetores de Expansão
              </h3>
            </div>
            <p className="text-xs text-muted-foreground max-w-sm">
              Áreas técnicas adicionais disponíveis sob avaliação caso-a-caso, mediante âmbito e contexto operacional.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {specialties.map((s) => (
              <span
                key={s}
                className="inline-flex items-center text-[12px] px-3 py-1.5 rounded-full border border-[#BF953F]/25 bg-[#0B1325]/60 text-foreground/75 hover:border-[#BF953F]/55 hover:text-[#FCF6BA] transition-colors"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-7 pt-5 border-t border-[#BF953F]/15">
            <p className="text-[11px] text-muted-foreground leading-relaxed italic">
              Peritagem Técnica Independente (como parceiro ou subcontratado) aplicável a: Seguros, Tribunais, Empresas, Litígios e Fornecedores.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
