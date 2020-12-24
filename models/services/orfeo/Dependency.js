import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Dependency extends Model {
  constructor(data = {}) {
    super(Api.END_POINTS.ORFEO_DEPENDENCIES(), data)
  }
}
