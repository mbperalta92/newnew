import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

export const sendTicketEmail = createServerFn({ method: "POST" })
  .handler(async (ctx: { data: any }) => {
    const data = ctx.data;
    // Read the RESEND_API_KEY from environment
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable");
      throw new Error("Missing RESEND_API_KEY");
    }

    const resend = new Resend(apiKey);
    
    const isB2B = data.profile === "empresa";

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #BF953F;">Novo Ticket de Assistência Técnica</h2>
        <p>Foi submetido um novo pedido através do site.</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Perfil:</strong> ${isB2B ? "Empresa" : "Particular"}</p>
        <p><strong>Nome do Cliente:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Contacto (Telefone):</strong> ${data.phone}</p>
        
        ${isB2B ? `
        <p><strong>Empresa:</strong> ${data.company}</p>
        <p><strong>Cargo/Função:</strong> ${data.contact}</p>
        <p><strong>Serviço Pretendido:</strong> ${data.serviceNeed}</p>
        ` : `
        <p><strong>Área de Interesse:</strong> ${data.interestArea}</p>
        `}
        
        <p><strong>Descrição / Sintomas / Equipamento:</strong></p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
          ${data.description.replace(/\n/g, "<br/>")}
        </div>

        ${data.fileName ? `<p><strong>Anexo Indicado pelo utilizador:</strong> ${data.fileName}</p>` : ""}
      </div>
    `;

    try {
      const response = await resend.emails.send({
        from: "RepFix <repfix3@gmail.com>",
        to: "repfix3@gmail.com",
        subject: "Novo Ticket de Assistência Técnica",
        html: htmlContent,
      });

      if (response.error) {
        console.error("Resend error:", response.error);
        throw new Error(response.error.message);
      }

      return { success: true, id: response.data?.id };
    } catch (e: unknown) {
      console.error("Failed to send email:", e);
      throw new Error("Failed to send email");
    }
  });
