import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Contractor extends Model {
  constructor(
    data = {
      document_type_id: null,
      document: null,
      name: null,
      surname: null,
      birthdate: null,
      sex_id: null,
      email: null,
      institutional_email: null,
      phone: null,
      eps_id: null,
      eps: null,
      afp_id: null,
      afp: null,
      residence_country_id: null,
      residence_state_id: null,
      residence_city_id: null,
      locality_id: null,
      upz_id: null,
      neighborhood_id: null,
      neighborhood: null,
      address: null,
      contract_id: null,
      contract: null,
      transport: false,
      position: null,
      start_date: null,
      final_date: null,
      start_suspension_date: null,
      final_suspension_date: null,
      total: null,
      day: [],
      risk: null,
      subdirectorate_id: null,
      dependency_id: null,
      other_dependency_subdirectorate: null,
      supervisor_email: null,
      contract_type_id: null,
      rut: null,
      bank: null,
    }
  ) {
    super(Api.END_POINTS.CONTRACTORS(), data)
  }

  excel(options = {}) {
    return this.get(Api.END_POINTS.EXCEL(), options)
  }

  count(options = {}) {
    return this.get(Api.END_POINTS.CONTRACTORS_COUNTER(), options)
  }

  findByDocument(options = {}) {
    return this.post(Api.END_POINTS.FIND_CONTRACTORS(), options)
  }

  user(payload, options = {}) {
    return this.get(Api.END_POINTS.USER_CONTRACT(payload), options)
  }

  resendNotification(id, options = {}) {
    return this.get(Api.END_POINTS.RESEND_NOTIFICATION(id), options)
  }

  hiringUpdate(id, options = {}) {
    return this.put(Api.END_POINTS.UPDATE_BASIC_USER(id), options)
  }

  thirdParty(id, options = {}) {
    return this.put(Api.END_POINTS.THIRD_PARTY(id), options)
  }
}
