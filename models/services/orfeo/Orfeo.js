import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class Orfeo extends Model {
  constructor(
    data = {
      document_type: [],
      current_user_id: [],
      folder: [],
      current_dependency_id: [],
      where_has: [],
      count_by: null,
      read: null,
      status: null,
      query: null,
      start_date: null,
      final_date: null,
    }
  ) {
    super(Api.END_POINTS.ORFEO(), data)
  }

  countByMonth(options = {}) {
    return this.get(Api.END_POINTS.ORFEO_COUNTERS_MONTHS(), options)
  }

  countByFolder(options = {}) {
    return this.get(Api.END_POINTS.ORFEO_COUNTERS_FOLDER(), options)
  }

  countByRead(options = {}) {
    return this.get(Api.END_POINTS.ORFEO_COUNTERS_READ(), options)
  }

  countByFileType(options = {}) {
    return this.get(Api.END_POINTS.ORFEO_COUNTERS_TYPE(), options)
  }

  countByDependency(options = {}) {
    return this.get(Api.END_POINTS.ORFEO_COUNTERS_DEPS(), options)
  }

  countByStatus(id, options = {}) {
    return this.get(Api.END_POINTS.ORFEO_COUNTERS_STATUS(id), options)
  }

  informed(id, options = {}) {
    return this.get(Api.END_POINTS.ORFEO_COUNTERS_INFORMED(id), options)
  }

  history(id, options = {}) {
    return this.get(Api.END_POINTS.ORFEO_COUNTERS_HISTORY(id), options)
  }

  calendar(options = {}) {
    return this.get(Api.END_POINTS.ORFEO_CALENDAR(), options)
  }
}
