import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class User extends Model {
  constructor(data = {}) {
    super(Api.END_POINTS.ORFEO_USERS(), data)
  }
}
