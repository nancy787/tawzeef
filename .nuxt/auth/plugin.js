import Auth from './auth'

import './middleware'

// Active schemes
import scheme_003d9a64 from './schemes/local.js'
import scheme_23514a38 from './schemes/oauth2.js'

export default function (ctx, inject) {
  // Options
  const options = {"resetOnError":false,"scopeKey":"scope","rewriteRedirects":true,"fullPathRedirect":false,"watchLoggedIn":true,"redirect":{"login":"/login","logout":"/","home":"/","callback":"/login"},"vuex":{"namespace":"auth"},"cookie":{"prefix":"auth.","options":{"path":"/"}},"localStorage":{"prefix":"auth."},"token":{"prefix":"_token."},"refresh_token":{"prefix":"_refresh_token."},"defaultStrategy":"local"}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // local
  $auth.registerStrategy('local', new scheme_003d9a64($auth, {"endpoints":{"login":{"url":"/auth/login","method":"post","propertyName":"data.access_token.token"},"logout":{"url":"/auth/logout","method":"post"},"user":{"url":"/user/simple-profile","method":"get","propertyName":"data"}},"token":{"property":"access_token"},"redirect":false,"_name":"local"}))

  // google
  $auth.registerStrategy('google', new scheme_23514a38($auth, {"authorization_endpoint":"https://accounts.google.com/o/oauth2/auth","userinfo_endpoint":"https://www.googleapis.com/oauth2/v3/userinfo","scope":["openid","profile","email"],"response_type":"token","token_type":"Bearer","redirect_uri":"http://localhost:3000","token_key":"access_token","state":"UNIQUE_AND_NON_GUESSABLE","client_id":"249336598015-2668kq8fbih065umt0fv7v7loqh0jep2.apps.googleusercontent.com","_name":"google"}))

  // facebook
  $auth.registerStrategy('facebook', new scheme_23514a38($auth, {"endpoints":{"userInfo":"https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}"},"clientId":"583838882795069","scope":["public_profile","email"],"_name":"facebook","authorization_endpoint":"https://facebook.com/v2.12/dialog/oauth","userinfo_endpoint":"https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email"}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      console.error('[ERROR] [AUTH]', error)
    }
  })
}
