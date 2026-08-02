import { useState } from "react";
import { Building2, User, ArrowLeft, ArrowRight, Check, Upload, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Profile = "empresa" | "particular" | null;

const empresaServices = [
  "Outsourcing & Parcerias B2B",
  "Pedido de Proposta / Orçamento",
  "Avaliação Técnica de Equipamentos",
  "Inspeção / Verificação Técnica",
  "Parceria Comercial",
  "Outro Assunto"
];

const particularAreas = [
  "Avaliação Técnica",
  "Pedido de Orçamento",
  "Esclarecimento Técnico",
  "Outro Assunto"
];

function generateReferenceCode(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `#RF-${year}${month}-${randomNum}`;
}

export function BudgetForm() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Profile>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
    description?: string;
  } | null>(null);

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
    rgpdConsent: false,
  };
  const [data, setData] = useState(initialData);

  const steps = ["Perfil", "Detalhes", "Pedido"];
  const progress = ((step + 1) / steps.length) * 100;

  // Validação de email
  const isEmailValid = data.email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  const baseValid = data.name.trim().length > 1 && data.email.trim().length > 1 && isEmailValid;

  const canNext =
    (step === 0 && profile !== null && baseValid) ||
    (step === 1 && profile === "empresa" && data.company && data.contact && data.serviceNeed) ||
    (step === 1 && profile === "particular" && data.interestArea) ||
    (step === 2 && data.phone.trim().length > 5 && data.rgpdConsent);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Se estiver em passos intermédios, avança para o próximo passo se válido
    if (step < steps.length - 1) {
      if (canNext) {
        setStatusMessage(null);
        setStep((s) => s + 1);
      }
      return;
    }

    // Validação final de segurança antes da submissão à API Web3Forms
    if (!canNext || isSubmitting) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    const referenceCode = generateReferenceCode();

    try {
      const serviceType =
        profile === "empresa"
          ? `B2B - ${data.serviceNeed}`
          : `B2C - ${data.interestArea}`;

      const fromName = data.company
        ? `${data.name} (${data.company})`
        : data.name;

      const payload = {
        access_key: "224d4116-c2c0-4792-9a5d-412ba85f1414",
        subject: `Novo Contacto ${referenceCode} - REPFIX`,
        referencia: referenceCode,
        from_name: fromName,
        email: data.email,
        telefone: data.phone,
        tipo_servico: serviceType,
        message: data.description || "Sem descrição fornecida.",
        // Campos adicionais estruturados para o e-mail de notificação
        perfil: profile === "empresa" ? "Empresa" : "Particular",
        empresa: data.company || "N/A",
        cargo: data.contact || "N/A",
        ficheiro_anexo: data.fileName || "Sem anexo",
        rgpd_consentimento: data.rgpdConsent ? "Sim" : "Não"
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const successTitle = "O seu pedido foi submetido com sucesso!";
        const successDesc = `O número da sua referência é ${referenceCode}. Guarde este código para acompanhamento da sua solicitação.`;

        toast.success(successTitle, {
          description: successDesc,
          className: "bg-[#0e1a36] border border-[#BF953F]/30 text-white",
        });

        setStatusMessage({
          type: "success",
          text: successTitle,
          description: successDesc,
        });

        // Reset aos campos do formulário
        setData(initialData);
        setProfile(null);
        setStep(0);
      } else {
        throw new Error(result.message || "Falha na resposta do servidor Web3Forms");
      }
    } catch (error) {
      const errorTitle = "Ocorreu um erro ao enviar a mensagem.";
      const errorDesc = "Por favor, tente novamente ou contacte repfix3@gmail.com";

      toast.error(errorTitle, {
        description: errorDesc,
        className: "bg-[#0e1a36] border border-red-500/30 text-white",
      });

      setStatusMessage({
        type: "error",
        text: errorTitle,
        description: errorDesc,
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
          <form onSubmit={handleSubmit} className="rounded-[1.35rem] bg-[#0B1325]/90 p-8 md:p-10">
            {statusMessage && (
              <div
                className={`p-4 rounded-xl mb-6 flex items-start gap-3 border ${
                  statusMessage.type === "success"
                    ? "bg-[#BF953F]/10 border-[#BF953F]/40 text-[#FCF6BA]"
                    : "bg-red-500/10 border-red-500/40 text-red-300"
                }`}
              >
                {statusMessage.type === "success" ? (
                  <Check className="w-5 h-5 shrink-0 mt-0.5 text-[#BF953F]" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                )}
                <div>
                  <p className="font-semibold text-sm">{statusMessage.text}</p>
                  {statusMessage.description && (
                    <p className="text-xs opacity-90 mt-0.5">{statusMessage.description}</p>
                  )}
                </div>
              </div>
            )}

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
                      { id: "empresa" as const, icon: Building2, title: "Sou uma Empresa", desc: "Outsourcing técnico, avaliações de equipamentos, gestão de swap e relatórios corporativos." },
                      { id: "particular" as const, icon: User, title: "Sou um Cliente Particular", desc: "Relatórios técnicos independentes para entidades (ex.: EDP), avaliação de equipamentos e suporte." },
                    ].map((o) => {
                      const active = profile === o.id;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => {
                            setStatusMessage(null);
                            setProfile(o.id);
                          }}
                          className={`text-left rounded-2xl p-6 transition-all cursor-pointer ${
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
                    <Field label="Nome *" value={data.name} onChange={(v) => { setStatusMessage(null); setData({ ...data, name: v }); }} placeholder="O seu nome" />
                    <div>
                      <Field label="Email *" type="email" value={data.email} onChange={(v) => { setStatusMessage(null); setData({ ...data, email: v }); }} placeholder="nome@email.pt" />
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
                        <Field label="Nome da empresa *" value={data.company} onChange={(v) => { setStatusMessage(null); setData({ ...data, company: v }); }} placeholder="Acme, Lda." />
                        <Field label="Função / Cargo *" value={data.contact} onChange={(v) => { setStatusMessage(null); setData({ ...data, contact: v }); }} placeholder="Ex.: IT Manager" />
                      </div>
                      <SelectField
                        label="Serviço pretendido *"
                        value={data.serviceNeed}
                        onChange={(v) => { setStatusMessage(null); setData({ ...data, serviceNeed: v }); }}
                        options={empresaServices}
                        placeholder="Selecione um serviço"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold">Área de interesse</h3>
                      <p className="text-sm text-muted-foreground">Indique a área que despertou o seu interesse — sem necessidade de identificar um equipamento específico.</p>
                      <SelectField
                        label="Área que despertou interesse *"
                        value={data.interestArea}
                        onChange={(v) => { setStatusMessage(null); setData({ ...data, interestArea: v }); }}
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
                    onChange={(e) => { setStatusMessage(null); setData({ ...data, description: e.target.value }); }}
                    rows={5}
                    placeholder="Conte-nos o que se passa: sintomas, contexto, modelo do equipamento ou objetivo do pedido..."
                    className="w-full rounded-xl bg-[#0e1a36] border border-border/60 px-4 py-3 text-sm outline-none focus:border-[#BF953F] transition-colors resize-none"
                  />

                  <Field label="Telefone de contacto *" value={data.phone} onChange={(v) => { setStatusMessage(null); setData({ ...data, phone: v }); }} placeholder="+351 900 000 000" />

                  <label className="block">
                    <div className="text-xs font-medium text-muted-foreground mb-1.5">Anexar fotos ou ficheiros (opcional)</div>
                    <div className="rounded-xl border border-dashed border-[#BF953F]/40 bg-[#0e1a36]/60 px-4 py-5 flex items-center gap-3 cursor-pointer hover:border-[#FCF6BA]/60 transition-colors">
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
                        onChange={(e) => { setStatusMessage(null); setData({ ...data, fileName: e.target.files?.[0]?.name ?? "" }); }}
                      />
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={data.rgpdConsent}
                      onChange={(e) => { setStatusMessage(null); setData({ ...data, rgpdConsent: e.target.checked }); }}
                      className="mt-0.5 h-4 w-4 rounded border-border bg-[#0e1a36] text-[#BF953F] focus:ring-[#BF953F] accent-[#BF953F] shrink-0"
                    />
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      Concordo com o tratamento dos meus dados pessoais nos termos da <a href="#" className="text-[#FCF6BA] underline hover:text-[#BF953F]">Política de Privacidade e RGPD</a> para efeitos de processamento e resposta a este pedido. *
                    </span>
                  </label>
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setStatusMessage(null);
                  setStep((s) => Math.max(0, s - 1));
                }}
                disabled={step === 0 || isSubmitting}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Anterior
              </button>
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (canNext) {
                      setStatusMessage(null);
                      setStep((s) => s + 1);
                    }
                  }}
                  disabled={!canNext || isSubmitting}
                  className="inline-flex items-center gap-2 rounded-full bg-gold-gradient text-[#0B1325] font-semibold px-6 py-3 disabled:opacity-40 hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  Continuar <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <div className="flex flex-col items-end gap-2">
                  <button
                    type="submit"
                    disabled={!canNext || isSubmitting}
                    className="inline-flex items-center gap-2 rounded-full bg-gold-gradient text-[#0B1325] font-semibold px-6 py-3 disabled:opacity-40 hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        A enviar pedido... <Loader2 className="h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Enviar pedido <Check className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-muted-foreground text-right max-w-xs leading-tight">
                    Ao submeter, concorda com o tratamento dos dados para efeitos de resposta ao seu pedido.
                  </p>
                </div>
              )}
            </div>
          </form>
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