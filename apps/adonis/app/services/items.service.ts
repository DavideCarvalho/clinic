import Item from '../models/item.js'

export default class ItemsService {
  async getItemsNeedingReplacement(
    clinicId: string,
    { page = 1, limit = 10 }: { page?: number; limit?: number }
  ) {
    return Item.query()
      .where('clinicId', clinicId)
      .whereRaw('?? < ??', [
        Item.$getColumn('quantity')!.columnName,
        Item.$getColumn('minimumQuantity')!.columnName,
      ])
      .orderByRaw('(??  / ??)', [
        Item.$getColumn('quantity')!.columnName,
        Item.$getColumn('minimumQuantity')!.columnName,
      ])
      .paginate(page, limit)
  }
}
