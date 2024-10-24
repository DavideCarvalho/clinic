import mail from '@adonisjs/mail/services/main'
import Contract from '../models/contract.js'
import User from '../models/user.js'
import ContractsService from '../services/contracts.service.js'
import { createContractValidator } from '../validators/contract.js'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  async getAll() {
    return Contract.query().preload('clinic')
  }

  async createContract(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(createContractValidator)
    if (!ctx.auth.user) throw new Error('Unauthorized')
    await ctx.auth.user.load('clinic')
    const clinic = ctx.auth.user.clinic
    let client = await User.query().where('email', payload.clientEmail).first()
    if (!client) {
      client = await User.create({
        email: payload.clientEmail,
        password: payload.clientEmail,
        clinicId: clinic.id,
      })
    }
    const contract = await Contract.create({
      startDate: payload.startDate,
      endDate: payload.endDate,
      description: '',
      status: 'active',
      clientId: client.id,
      clinicId: clinic.id,
    })
    await mail.sendLater((message) => {
      const email = message
        .to('davi.carvalho96@gmail.com')
        .cc(clinic.email)
        .from('anuaapp@gmail.com')
        .subject('Contrato criado')
        .htmlView('emails/contract_uploaded_html', { clientName: client.fullName ?? 'paciente' })
      let index = 1
      for (const file of payload.files) {
        const extension = this.checkBase64Extension(file)
        email.attach(file, {
          filename: `arquivo-${index}.${extension}`,
        })
        index++
      }
    })
    return contract
  }

  async getContractsQuantityEndingIn30Days(ctx: HttpContext) {
    if (!ctx.auth.user) throw new Error('Unauthorized')
    const ammount = await this.contractsService.getContractsQuantityEndingIn30Days(
      ctx.auth.user?.clinicId
    )
    return {
      ammount,
    }
  }

  async getActiveContractsQuantity(ctx: HttpContext) {
    if (!ctx.auth.user) throw new Error('Unauthorized')
    const ammount = await this.contractsService.getActiveContractsQuantity(ctx.auth.user?.clinicId)
    return {
      ammount,
    }
  }

  async getContractsPaginated(ctx: HttpContext) {
    if (!ctx.auth.user) throw new Error('Unauthorized')
    const queryString = ctx.request.qs()
    return this.contractsService.getContractsPaginated(
      ctx.auth.user.clinicId,
      queryString.page ?? 1,
      queryString.limit ?? 10
    )
  }

  async getContractsCreatedInLast12Months(ctx: HttpContext) {
    if (!ctx.auth.user) throw new Error('Unauthorized')
    return this.contractsService.getContractsCreatedInLast12Months(ctx.auth.user.clinicId)
  }

  private checkBase64Extension(base64File: string) {
    // Regex para capturar o cabeçalho base64
    const match = base64File.match(/^data:(.*?);base64,/)
    if (!match) {
      return 'unknown'
    }

    const mimeType = match[1]

    // Dicionário de alguns tipos MIME comuns e suas extensões
    const mimeTypes: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'application/pdf': 'pdf',
      'text/plain': 'txt',
      'application/zip': 'zip',
      // Adicione mais tipos MIME conforme necessário
    }

    // Retorna a extensão correspondente ao tipo MIME ou 'unknown'
    return mimeTypes[mimeType] || 'unknown'
  }
}
