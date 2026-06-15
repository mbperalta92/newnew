import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/repfix-logo.svg";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#relatorios", label: "Relatórios" },
  { href: "#orcamentos", label: "Orçamentos" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#inicio" className="flex items-center group" aria-label="REPFIX">
          <img src={logo} alt="REPFIX Serviços Técnicos" className="h-11 w-auto transition-transform duration-500 group-hover:scale-[1.03]" />
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="relative hover:text-foreground transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 hover:after:w-full after:bg-gold-gradient after:transition-all after:duration-300">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#orcamentos" className="hidden sm:inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold bg-gold-gradient text-[#0B1325] hover:shadow-[0_10px_30px_-6px_rgba(252,246,186,0.55)] transition-shadow">
            Entre em contacto
          </a>
          <button onClick={() => setOpen((v) => !v)} className="md:hidden p-2 rounded-md border border-border/60" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-[#0B1325]/95">
          <ul className="px-6 py-4 flex flex-col gap-3 text-sm">
            {links.map((l) => (
              <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} className="block py-1.5 text-muted-foreground hover:text-foreground">{l.label}</a></li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}