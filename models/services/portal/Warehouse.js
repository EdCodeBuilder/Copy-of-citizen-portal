import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Warehouse extends Model {
  constructor(
    data = {
      name: null,
      surname: null,
      document: null,
      contract: null,
      token: null,
      year: null,
      virtual_file: null,
    }
  ) {
    super(Api.END_POINTS.WAREHOUSE_CERTIFICATION(), data)
  }

  excel(options = {}) {
    return this.post(Api.END_POINTS.WAREHOUSE_EXCEL(), options)
  }
}
