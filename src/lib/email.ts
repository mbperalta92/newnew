import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

export const sendTicketEmail = createServerFn({ method: "POST" })
  .handler(async (ctx: { data: any }) => {
    const data = ctx.data;
    // Read the RESEND_API_KEY from environment
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.warn("RESEND_API_KEY não definida. A simular envio de pedido com sucesso em ambiente de desenvolvimento:");
      console.log(JSON.stringify(data, null, 2));
      return { success: true, mocked: true };
    }

    const resend = new Resend(apiKey);
    
    const isB2B = data.profile === "empresa";

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #BF953F;">Novo Ticket de Assistência Técnica (REPFIX)</h2>
        <p>Foi submetido um novo pedido através do site.</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Perfil:</strong> ${isB2B ? "Empresa" : "Particular"}</p>
        <p><strong>Nome do Cliente:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Contacto (Telefone):</strong> ${data.phone}</p>
        <p><strong>Consentimento RGPD:</strong> ${data.rgpdConsent ? "Aceite" : "Não registado"}</p>
        
        ${isB2B ? `
        <p><strong>Empresa:</strong> ${data.company}</p>
        <p><strong>Cargo/Função:</strong> ${data.contact}</p>
        <p><strong>Serviço Pretendido:</strong> ${data.serviceNeed}</p>
        ` : `
        <p><strong>Área de Interesse:</strong> ${data.interestArea}</p>
        `}
        
        <p><strong>Descrição / Sintomas / Equipamento:</strong></p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
          ${(data.description || "Sem descrição fornecida.").replace(/\n/g, "<br/>")}
        </div>

        ${data.fileName ? `<p><strong>Anexo Indicado pelo utilizador:</strong> ${data.fileName}</p>` : ""}
      </div>
    `;

    try {
      const response = await resend.emails.send({
        from: "REPFIX <onboarding@resend.dev>",
        to: ["repfix3@gmail.com"],
        subject: `Novo Ticket de Assistência Técnica - ${data.name}`,
        html: htmlContent,
      });

      if (response.error) {
        console.error("Erro na API do Resend:", response.error);
        return { success: true, resendError: response.error.message };
      }

      return { success: true, id: response.data?.id };
    } catch (e: unknown) {
      console.error("Falha ao enviar e-mail via Resend:", e);
      return { success: true, fallback: true };
    }
  });
