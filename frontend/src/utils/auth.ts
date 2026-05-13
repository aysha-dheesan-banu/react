/**
 * PKCE helper functions for OAuth2 Authorization Code flow
 */

export async function createPKCE() {
  // Generate a random verifier
  const arr = new Uint8Array(48);
  crypto.getRandomValues(arr);
  const verifier = Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');

  // Generate the challenge from the verifier
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  const challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return { verifier, challenge };
}

export const SSO_CONFIG = {
  clientId: 'client_LjqLvYUDaV826QJNejwxnQ',
  redirectUri: 'https://react.dhilip.in/callback',
  authorizeUrl: 'https://api.wytnet.com/oauth/authorize',
  scope: 'openid profile email',
};

export async function initiateSSOLogin() {
  const { verifier, challenge } = await createPKCE();
  const state = crypto.randomUUID();

  // Store PKCE verifier and state in sessionStorage
  sessionStorage.setItem('pkce_verifier', verifier);
  sessionStorage.setItem('oauth_state', state);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: SSO_CONFIG.clientId,
    redirect_uri: SSO_CONFIG.redirectUri,
    scope: SSO_CONFIG.scope,
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  });

  window.location.href = `${SSO_CONFIG.authorizeUrl}?${params.toString()}`;
}
