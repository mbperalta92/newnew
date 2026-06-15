import { Globe } from "lucide-react";
import logo from "@/assets/repfix-logo.svg";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center md:items-start gap-4">
          <img src={logo} alt="REPFIX Serviços Técnicos" className="h-14 w-auto" />
          <a href="https://www.repfix.pt" className="flex items-center gap-2.5 text-sm text-foreground/90 hover:text-[#FCF6BA] transition-colors">
            <Globe className="h-4 w-4 text-[#BF953F]" />
            <span>www.repfix.pt</span>
          </a>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} REPFIX Serviços Técnicos. Todos os direitos reservados.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Política de privacidade</a>
            <a href="#" className="hover:text-foreground transition-colors">Política de proteção de dados - RGPD</a>
          </div>
          <span>Feito com rigor em Portugal</span>
        </div>
      </div>
    </footer>
  );
}