import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Folder extends Model {
  constructor(data = {}) {
    super(Api.END_POINTS.ORFEO_FOLDERS(), data)
  }
}
