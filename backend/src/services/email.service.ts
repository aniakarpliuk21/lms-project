import path from "node:path";

import nodemailer, { Transporter } from "nodemailer";
import hbs from "nodemailer-express-handlebars";

import { configure } from "../configs/configure";
import { emailConstans } from "../constans/email.constans";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { managerRepository } from "../repositories/manager.repository";
import { EmailTypeToPayloadType } from "../types/email-type-to-payload.type";
import { tokenService } from "./token.service";

class EmailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      from: "Node.js",
      auth: {
        user: configure.smtpEmail,
        pass: configure.smtpPassword,
      },
    });
    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
        partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
        defaultLayout: "main",
      },
      viewPath: path.join(process.cwd(), "src", "templates", "views"),
      extName: ".hbs",
    };
    this.transporter.use("compile", hbs(hbsOptions));
  }
  public async sendEmail<T extends EmailTypeEnum>(
    type: T,
    email: string,
    context: EmailTypeToPayloadType[T],
  ): Promise<void> {
    const { subject, template } = emailConstans[type];
    const options = {
      to: email,
      subject,
      template,
      context,
    };
    await this.transporter.sendMail(options);
  }
  public async sendActivateEmail(email: string): Promise<void> {
    const manager = await managerRepository.getByEmail(email);
    if (!manager) {
      return;
    }
    const actionToken = tokenService.generateActionTokens(
      { managerId: manager._id, role: manager.role },
      ActionTokenTypeEnum.EMAIL_VERIFICATION,
    );
    await actionTokenRepository.create({
      type: ActionTokenTypeEnum.EMAIL_VERIFICATION,
      _managerId: manager._id,
      token: actionToken,
    });
    await emailService.sendEmail(EmailTypeEnum.WELCOME, email, {
      name: manager.name,
      frontUrl: configure.frontUrl,
      actionToken,
    });
  }
}
export const emailService = new EmailService();
