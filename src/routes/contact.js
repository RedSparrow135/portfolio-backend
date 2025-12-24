import express from "express";
import { Resend } from "resend";

const router = express.Router();

router.post("/", async (req, res) => {
  const resend = new Resend(process.env.RESEND_API_KEY); // 👈 AQUÍ

  const { name, email, message, website } = req.body;

  // Honeypot
  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    await resend.emails.send({
      from: "Contacto Web <onboarding@resend.dev>",
      to: process.env.CONTACT_MAIL,
      subject: "Nuevo mensaje desde el portafolio",
      html: `
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mensaje:</b> ${message}</p>
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error enviando correo" });
  }
});

export default router;
