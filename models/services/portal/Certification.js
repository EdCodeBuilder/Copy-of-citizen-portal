import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Certification extends Model {
  constructor(
    data = {
      name: null,
      document: null,
      contract: null,
      virtual_file: null,
    }
  ) {
    super(Api.END_POINTS.SYSTEMS_CERTIFICATION(), data)
  }
}
