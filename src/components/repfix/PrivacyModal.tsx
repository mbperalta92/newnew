import { X, ShieldCheck, Lock, EyeOff, FileText } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#0B1325] border border-[#BF953F]/40 p-6 md:p-8 shadow-[var(--shadow-elegant)] text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gold-gradient text-[#0B1325] flex items-center justify-center font-bold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Política de Privacidade & RGPD</h3>
              <p className="text-xs text-muted-foreground">REPFIX — Serviços Técnicos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-white hover:bg-[#0e1a36] transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
          <div className="p-4 rounded-xl bg-[#0e1a36]/80 border border-[#BF953F]/20 text-white text-xs flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#BF953F] shrink-0 mt-0.5" />
            <p>
              A <strong>REPFIX</strong> compromete-se a proteger a privacidade dos seus utilizadores em estrito cumprimento com o Regulamento Geral sobre a Proteção de Dados (RGPD - UE 2016/679).
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white text-base mb-1.5 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#BF953F]" />
              1. Recolha e Finalidade dos Dados
            </h4>
            <p>
              Os dados recolhidos através do formulário de contacto (nome, e-mail, telefone, empresa e detalhes descritivos da avaria ou equipamento) são processados <strong>exclusivamente para a gestão, análise e resposta ao seu pedido de assistência técnica ou orçamento</strong>.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white text-base mb-1.5 flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-[#BF953F]" />
              2. Não Partilha e Proteção
            </h4>
            <p>
              Não realizamos qualquer partilha de dados pessoais com terceiros nem a transmissão de informação para efeitos de publicidade ou marketing não solicitado (*spam*).
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white text-base mb-1.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#BF953F]" />
              3. Conservação e Direitos do Titular
            </h4>
            <p>
              Os dados fornecidos são conservados apenas durante o período estritamente necessário à prestação do serviço técnico. O titular dos dados pode solicitar o acesso, retificação ou eliminação das suas informações através do e-mail oficial: <a href="mailto:repfix3@gmail.com" className="text-[#FCF6BA] underline">repfix3@gmail.com</a>.
            </p>
          </div>
        </div>

        {/* Footer action */}
        <div className="mt-8 pt-4 border-t border-border/60 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-full bg-gold-gradient text-[#0B1325] font-semibold px-6 py-2.5 text-sm hover:scale-[1.02] transition-transform cursor-pointer"
          >
            Compreendi
          </button>
        </div>
      </div>
    </div>
  );
}
