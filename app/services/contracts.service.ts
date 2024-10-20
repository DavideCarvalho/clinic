import Contract from '#models/contract'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import { format } from 'date-fns'
import { ContractDTO } from '#controllers/dto/contract.dto'
import { Paginated } from '#controllers/dto/paginated.dto'
import { inject } from '@adonisjs/core'
import { ContractTransformer } from '#services/transformers/contract.transformer'

@inject()
export default class ContractsService {
  constructor(private readonly contractTransformer: ContractTransformer) {}

  async getContractsCreatedInLast12Months(clinicId: string) {
    const query = (await db.rawQuery(
      `
        SELECT
          YEAR(created_at) as year,
          CONCAT(UCASE(LEFT(MONTHNAME(created_at), 1)),SUBSTRING(lower(MONTHNAME(created_at)),2)) as month,
          count(*) as count
        FROM ${Contract.table}
        WHERE clinic_id = ?
        AND created_at >= ?
        GROUP BY YEAR(created_at), MONTH(created_at), month
        ORDER BY YEAR(created_at) ASC, MONTH(created_at) ASC;
      `,
      [clinicId, format(DateTime.now().minus({ months: 12 }).toJSDate(), 'yyyy-MM-dd')]
    )) as { year: number; month: number; count: number }[][]
    query.pop()
    return query.flat()
  }

  public async getContractsPaginated(
    clinicId: string,
    page: number,
    limit: number
  ): Promise<Paginated<ContractDTO>> {
    const contracts = await Contract.query()
      .where('clinicId', clinicId)
      .orderBy('createdAt', 'desc')
      .preload('client')
      .paginate(page, limit)

    return {
      data: contracts
        .toJSON()
        .data.map((contract) => this.contractTransformer.toJSON(contract as Contract)),
      meta: contracts.getMeta(),
    }
  }

  async getContractsQuantityEndingIn30Days(clinicId: string) {
    const contracts = (await db
      .from(Contract.table)
      .where(Contract.$getColumn('endDate')?.columnName as string, '>=', DateTime.now().toJSDate())
      .andWhere(
        Contract.$getColumn('endDate')?.columnName as string,
        '<=',
        DateTime.now().plus({ days: 30 }).toJSDate()
      )
      .andWhere(Contract.$getColumn('clinicId')?.columnName as string, '=', clinicId)
      .groupBy(Contract.$getColumn('clinicId')?.columnName as string)
      .count('id')) as [{ 'count(`id`)': number }] | []

    return contracts?.[0]?.['count(`id`)'] ?? 0
  }

  async getActiveContractsQuantity(clinicId: string) {
    const contracts = (await db
      .from(Contract.table)
      .where(Contract.$getColumn('status')?.columnName as string, '=', 'active')
      .andWhere(Contract.$getColumn('clinicId')?.columnName as string, '=', clinicId)
      .groupBy(Contract.$getColumn('clinicId')?.columnName as string)
      .count('id')) as [{ 'count(`id`)': number }] | []

    return contracts?.[0]?.['count(`id`)'] ?? 0
  }
}
