import { injectable } from 'inversify';
import { IMailProvider, Mail } from './IMailProvider';

@injectable()
export class ConsoleMailProvider implements IMailProvider {
  async sendMail(mail: Mail): Promise<string | null> {
    console.log(' E-MAIL (modo test) ');
    console.log(`Para: ${mail.to}`);
    console.log(`Assunto: ${mail.subject}`);
    console.log(mail.text);
    return null;
  }
}