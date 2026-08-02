import { useState } from "react";
import { Globe, Mail, ShieldCheck } from "lucide-react";
import logo from "@/assets/repfix-logo.svg";
import { PrivacyModal } from "./PrivacyModal";

export function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="relative border-t border-border/60 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src={logo} alt="REPFIX Serviços Técnicos" className="h-14 w-auto" />
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-foreground/90">
              <a href="https://www.repfix.pt" className="flex items-center gap-2.5 hover:text-[#FCF6BA] transition-colors">
                <Globe className="h-4 w-4 text-[#BF953F]" />
                <span>www.repfix.pt</span>
              </a>
              <a href="mailto:repfix3@gmail.com" className="flex items-center gap-2.5 hover:text-[#FCF6BA] transition-colors">
                <Mail className="h-4 w-4 text-[#BF953F]" />
                <span>repfix3@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/60">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} REPFIX Serviços Técnicos. Todos os direitos reservados.</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-[#FCF6BA] transition-colors flex items-center gap-1.5 cursor-pointer underline"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#BF953F]" />
                <span>Política de Privacidade & RGPD</span>
              </button>
            </div>
            <span>Diagnóstico Eletrónico & Assistência Técnica em Portugal</span>
          </div>
        </div>
      </footer>

      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </>
  );
}