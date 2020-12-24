import orfeo from '@/models/routes/orfeo'
const api = process.env.VUE_APP_API_URL_BASE
export const Api = {
  END_POINTS: {
    CSFR_TOKEN: () => `${api}/csfr-cookie`,
    FORGOT_PASSWORD: () => `${api}/password/forgot`,
    RESET_PASSWORD: () => `${api}/password/reset`,
    MODULES: () => `${api}/api/admin/modules`,
    USER_MODULES: () => `${api}/api/my-modules`,
    // Orfeo
    ...orfeo,
  },
}
