let getAccessToken = async ()=>{}
if(false){
import * as msal from '@azure/msal-node'
import powerconfig from 'src/configs/powerconfig'

let currentToken: msal.AuthenticationResult | null

 getAccessToken = async function () {
  // Create a config variable that store credentials from config.json
  const config = powerconfig

  // Use MSAL.js for authentication

  const msalConfig = {
    auth: {
      clientId: config.clientId,
      authority: `${config.authorityUrl}${config.tenantId}`,
      clientSecret: ''
    }
  }

  // Check for the MasterUser Authentication
  if (config.authenticationMode.toLowerCase() === 'masteruser') {
    const clientApplication = new msal.PublicClientApplication(msalConfig)

    const usernamePasswordRequest = {
      scopes: [config.scopeBase],
      username: config.pbiUsername,
      password: config.pbiPassword
    }

    return clientApplication.acquireTokenByUsernamePassword(usernamePasswordRequest)
  }

  // Service Principal auth is the recommended by Microsoft to achieve App Owns Data Power BI embedding
  if (config.authenticationMode.toLowerCase() === 'serviceprincipal') {
    if (
      currentToken &&
      currentToken.expiresOn &&
      new Date(currentToken.expiresOn).getTime() - new Date().getTime() > 60 * 60
    ) {
      console.log('token expires', new Date(currentToken.expiresOn).getTime() - new Date().getTime() > 60 * 60)

      return currentToken
    }
    msalConfig.auth.clientSecret = config.clientSecret
    const clientApplication = new msal.ConfidentialClientApplication(msalConfig)

    const clientCredentialRequest = {
      scopes: [config.scopeBase]
    }
    currentToken = await clientApplication.acquireTokenByClientCredential(clientCredentialRequest)

    return currentToken
  }
}
}

export default { getAccessToken: getAccessToken }
