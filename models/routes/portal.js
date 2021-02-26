const api = process.env.VUE_APP_API_URL_BASE
const path = '/api/contractors-portal'
export default {
  MENU: () => `${api}${path}/menu`,
  USERS: () => `${api}${path}/users`,
  USER_CONTRACT: (payload) => `${api}${path}/user/contract/${payload}`,
  EXCEL: () => `${api}${path}/excel`,
  ROLES: () => `${api}${path}/roles`,
  ROLES_USER: (userId) => `${api}${path}/roles/${userId}/user`,
  FIND_USERS: () => `${api}${path}/find-users`,
  PERMISSIONS: () => `${api}${path}/permissions`,
  CONTRACTORS: () => `${api}${path}/contractors`,
  CONTRACTORS_COUNTER: () => `${api}${path}/counter`,
  FIND_CONTRACTORS: () => `${api}${path}/find-contractor`,
  CONTRACTS: (userId) => `${api}${path}/contractors/${userId}/contracts`,
  THIRD_PARTY: (userId) => `${api}${path}/contractors/third-party/${userId}`,
  RESEND_NOTIFICATION: (userId) =>
    `${api}${path}/resend-notification/${userId}`,
  UPDATE_BASIC_USER: (userId) => `${api}${path}/basic-data/${userId}`,
  CONTRACTS_FILES: (contractId) =>
    `${api}${path}/contracts/${contractId}/files`,
  CONTRACT_TYPES: () => `${api}${path}/contract-types`,
  FILE_TYPES: () => `${api}${path}/file-types`,
}
