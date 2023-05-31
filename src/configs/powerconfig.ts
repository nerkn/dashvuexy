const powerconfig = {
  authenticationMode: 'serviceprincipal',
  authorityUrl: 'https://login.microsoftonline.com/',
  scopeBase: 'https://analysis.windows.net/powerbi/api/.default',
  powerBiApiUrl: 'https://api.powerbi.com/',
  clientId: '49e2afe8-a171-4029-9a25-77d0de85bd44',
  workspaceId: '0a27dd2d-df3f-44ec-82af-9dfb2a3c1036',
  reportId: 'e8ecc8e1-3bf1-42a6-bfcd-67ced97bcd23',
  pbiUsername: process.env.pbiUsername,
  pbiPassword: process.env.pbiPassword,
  clientSecret: process.env.clientSecret,
  noUse: '//26902818-a716-42db-be6e-0cda1c68937a',
  tenantId: '88030a88-6912-4864-b8f2-10db694fb378'
}

export default powerconfig
