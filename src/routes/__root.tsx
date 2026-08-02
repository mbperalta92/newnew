import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          A página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ocorreu um erro do nosso lado. Pode tentar atualizar a página ou voltar ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar Novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voltar ao Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "REPFIX | Diagnóstico Eletrónico, Assistência Técnica e Relatórios" },
      {
        name: "description",
        content:
          "Serviços especializados em diagnóstico eletrónico de hardware, reparações e relatórios técnicos para clientes particulares e parceiros empresariais.",
      },
      { name: "author", content: "REPFIX Serviços Técnicos" },

      // Open Graph Tags (WhatsApp, LinkedIn, Facebook)
      { property: "og:title", content: "REPFIX | Diagnóstico Eletrónico, Assistência Técnica e Relatórios" },
      {
        property: "og:description",
        content:
          "Serviços especializados em diagnóstico eletrónico de hardware, reparações e relatórios técnicos para clientes particulares e parceiros empresariais.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.repfix.pt" },
      { property: "og:image", content: "https://www.repfix.pt/og-image.png" },
      { property: "og:site_name", content: "REPFIX" },
      { property: "og:locale", content: "pt_PT" },

      // Twitter Card Tags
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "REPFIX | Diagnóstico Eletrónico, Assistência Técnica e Relatórios" },
      {
        name: "twitter:description",
        content:
          "Serviços especializados em diagnóstico eletrónico de hardware, reparações e relatórios técnicos para clientes particulares e parceiros empresariais.",
      },
      { name: "twitter:image", content: "https://www.repfix.pt/og-image.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.svg" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster richColors theme="dark" position="top-right" />
        <Scripts />
        {/* Cloudflare Web Analytics */}
        {/*
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "YOUR_CLOUDFLARE_BEACON_TOKEN"}'
          ></script>
        */}
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}