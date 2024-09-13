import mail from '@adonisjs/mail/services/main'
import { Job } from '@rlanz/bull-queue'

interface RegisterStripeCustomerPayload {
  mailMessage: any
  config: any
  mailerName: any
}

export default class SendEmail extends Job {
  static get $$filepath() {
    return import.meta.url
  }

  public async handle(payload: RegisterStripeCustomerPayload) {
    const { mailMessage, config, mailerName } = payload

    await mail.use(mailerName).sendCompiled(mailMessage, config)
  }

  public async rescue(payload: unknown): Promise<void> {}
}
