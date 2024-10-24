import mail from '@adonisjs/mail/services/main'
import { Job } from 'adonisjs-jobs'

type SendEmailPayload = {
  mailMessage: any
  config: any
  mailerName: any
}

export default class SendEmail extends Job {
  async handle(payload: SendEmailPayload) {
    const { mailMessage, config, mailerName } = payload
    await mail.use(mailerName).sendCompiled(mailMessage, config)
  }
}
