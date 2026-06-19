import { useState } from "react";
import { Building2, User, ArrowLeft, ArrowRight, Check, Upload, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { sendTicketEmail } from "../../lib/email";

type Profile = "empresa" | "particular" | null;

const empresaServices = [
  "Outsourcing & Parcerias B2B",
  "Pedido de Proposta / Orçamento",
  "Avaliação Técnica de Equipamentos",
  "Inspeção / Verificação Técnica",
  "Peritagem Técnica",
  "Parceria Comercial",
  "Outro Assunto"
];

const particularAreas = [
  "Peritagem",
  "Avaliação Técnica",
  "Pedido de Orçamento",
  "Esclarecimento Técnico",
  "Outro Assunto"
];

export function BudgetForm() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Profile>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const initialData = {
    name: "",
    email: "",
    company: "",
    contact: "",
    serviceNeed: "",
    interestArea: "",
    description: "",
    fileName: "",
    phone: "",
  };
  const [data, setData] = useState(initialData);

  const steps = ["Perfil", "Detalhes", "Pedido"];
  const progress = ((step + 1) / steps.length) * 100;

  // Validação de email
  const isEmailValid = data.email === "" || /\\S+@\\S+\\.\\S+/.test(data.email);
  const baseValid = data.name.trim().length > 1 && data.email.trim().length > 1 && isEmailValid;

  const canNext =
    (step === 0 && profile !== null && baseValid) ||
    (step === 1 && profile === "empresa" && data.company && data.contact && data.serviceNeed) ||
    (step === 1 && profile === "particular" && data.interestArea) ||
    (step === 2 && data.description.trim().length > 5 && data.phone.trim().length > 5);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      await sendTicketEmail({
        // @ts-ignore
        data: {
          ...data,
          profile
        }
      });
      
      toast.success("Pedido enviado com sucesso!", {
        description: "A nossa equipa entrará em contacto consigo em breve.",
        className: "bg-[#0e1a36] border border-[#BF953F]/30 text-white",
      });

      // Reset form
      setData(initialData);
      setProfile(null);
      setStep(0);
      
    } catch (error) {
      toast.error("Ocorreu um erro ao enviar o pedido.", {
        description: "Por favor, tente novamente mais tarde ou contacte-nos por telefone.",
        className: "bg-[#0e1a36] border border-red-500/30 text-white",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="orcamentos" className="relative py-28">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#BF953F] uppercase">Pedido de Análise</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            Formulário <span className="text-gold-gradient">de Contacto</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Respondemos em menos de 48h úteis com um plano de ação claro e sem compromisso.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border-gold p-1.5 shadow-[var(--shadow-elegant)]">
          <div className="rounded-[1.35rem] bg-[#0B1325]/90 p-8 md:p-10">
            <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
              <span>Passo {Math.min(step + 1, steps.length)} de {steps.length} · {steps[step] ?? "Concluído"}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#1a2540] overflow-hidden">
              <div className="h-full bg-gold-gradient transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            <div className="mt-8 min-h-[320px]">
              {step === 0 ? (
                <div className="animate-in fade-in duration-300 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-center">Como podemos ajudar?</h3>
                    <p className="text-sm text-muted-foreground text-center mt-1">Escolha o seu perfil para personalizarmos o atendimento.</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { id: "empresa" as const, icon: Building2, title: "Sou uma Empresa", desc: "Outsourcing, peritagens e relatórios técnicos." },
                      { id: "particular" as const, icon: User, title: "Sou um Cliente Particular", desc: "Quero analisar uma necessidade técnica pessoal." },
                    ].map((o) => {
                      const active = profile === o.id;
                      return (
                        <button
                          key={o.id}
                          onClick={() => setProfile(o.id)}
                          className={`text-left rounded-2xl p-6 transition-all ${
                            active ? "border-gold bg-[rgba(252,246,186,0.06)]" : "glass-card hover:bg-[rgba(191,149,63,0.06)]"
                          }`}
                        >
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${active ? "bg-gold-gradient text-[#0B1325]" : "bg-[#0e1a36] text-[#FCF6BA] border border-[#BF953F]/30"}`}>
                            <o.icon className="h-6 w-6" />
                          </div>
                          <div className="mt-4 font-semibold">{o.title}</div>
                          <div className="text-xs text-muted-foreground mt-1.5">{o.desc}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    <Field label="Nome *" value={data.name} onChange={(v) => setData({ ...data, name: v })} placeholder="O seu nome" />
                    <div>
                      <Field label="Email *" type="email" value={data.email} onChange={(v) => setData({ ...data, email: v })} placeholder="nome@email.pt" />
                      {!isEmailValid && (
                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> O contacto de email não é válido
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : step === 1 ? (
                <div className="animate-in fade-in duration-300 space-y-5">
                  {profile === "empresa" ? (
                    <>
                      <h3 className="text-lg font-semibold">Sobre a sua empresa</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Nome da empresa" value={data.company} onChange={(v) => setData({ ...data, company: v })} placeholder="Acme, Lda." />
                        <Field label="Função / Cargo" value={data.contact} onChange={(v) => setData({ ...data, contact: v })} placeholder="Ex.: IT Manager" />
                      </div>
                      <SelectField
                        label="Serviço pretendido"
                        value={data.serviceNeed}
                        onChange={(v) => setData({ ...data, serviceNeed: v })}
                        options={empresaServices}
                        placeholder="Selecione um serviço"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold">Área de interesse</h3>
                      <p className="text-sm text-muted-foreground">Indique a área que despertou o seu interesse — sem necessidade de identificar um equipamento específico.</p>
                      <SelectField
                        label="Área que despertou interesse"
                        value={data.interestArea}
                        onChange={(v) => setData({ ...data, interestArea: v })}
                        options={particularAreas}
                        placeholder="Selecione uma área"
                      />
                    </>
                  )}
                </div>
              ) : (
                <div className="animate-in fade-in duration-300 space-y-5">
                  <h3 className="text-lg font-semibold">Descreva a sua situação</h3>
                  <textarea
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                    rows={6}
                    placeholder="Conte-nos o que se passa: sintomas, contexto, modelo do equipamento ou objetivo do pedido..."
                    className="w-full rounded-xl bg-[#0e1a36] border border-border/60 px-4 py-3 text-sm outline-none focus:border-[#BF953F] transition-colors resize-none"
                  />

                  <Field label="Telefone de contacto *" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} placeholder="+351 900 000 000" />

                  <label className="block">
                    <div className="text-xs font-medium text-muted-foreground mb-1.5">Anexar fotos ou ficheiros (opcional)</div>
                    <div className="rounded-xl border border-dashed border-[#BF953F]/40 bg-[#0e1a36]/60 px-4 py-6 flex items-center gap-3 cursor-pointer hover:border-[#FCF6BA]/60 transition-colors">
                      <div className="h-10 w-10 rounded-lg bg-gold-gradient text-[#0B1325] flex items-center justify-center shrink-0">
                        <Upload className="h-5 w-5" />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">{data.fileName || "Arraste ou clique para carregar"}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Fotografias, vídeos curtos ou documentação anterior.</div>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setData({ ...data, fileName: e.target.files?.[0]?.name ?? "" })}
                      />
                    </div>
                  </label>

                  <p className="text-xs text-muted-foreground">
                    Ao submeter, concorda em ser contactado pela equipa REPFIX para fins de análise do pedido.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0 || isSubmitting}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" /> Anterior
              </button>
              {step < steps.length - 1 ? (
                <button
                  onClick={() => canNext && setStep((s) => s + 1)}
                  disabled={!canNext || isSubmitting}
                  className="inline-flex items-center gap-2 rounded-full bg-gold-gradient text-[#0B1325] font-semibold px-6 py-3 disabled:opacity-40 hover:scale-[1.02] transition-transform"
                >
                  Continuar <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canNext || isSubmitting}
                  className="inline-flex items-center gap-2 rounded-full bg-gold-gradient text-[#0B1325] font-semibold px-6 py-3 disabled:opacity-40 hover:scale-[1.02] transition-transform"
                >
                  {isSubmitting ? (
                    <>A enviar <Loader2 className="h-4 w-4 animate-spin" /></>
                  ) : (
                    <>Enviar pedido <Check className="h-4 w-4" /></>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl bg-[#0e1a36] border border-border/60 px-4 py-3 text-sm outline-none focus:border-[#BF953F] transition-colors"
      />
    </div>
  );
}

function SelectField({
  label, value, onChange, options, placeholder,
}: { label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl bg-[#0e1a36] border border-border/60 px-4 py-3 text-sm outline-none focus:border-[#BF953F] transition-colors"
      >
        <option value="" disabled>{placeholder ?? "Selecione"}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}