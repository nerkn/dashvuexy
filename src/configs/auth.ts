export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/api/auth/login/', // 'jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
