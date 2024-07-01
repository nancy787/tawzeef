export default () => {
  if (process.client) {
    AppleID.auth.init({
      clientId: 'KT8F6G39NX.com.a5dr.app',
      scope: '[email,name]',
      redirectURI: 'https://dev.a5dr.com/usage-agreement',
      usePopup: true, //or false defaults to false
    })
  }
}
