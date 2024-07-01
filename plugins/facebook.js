export default () => {
  if (process.client) {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: 583838882795069,
        cookie: true,
        xfbml: true,
        version: 'v11.0',
      })
      window.FB.AppEvents.logPageView()
    }
    ;(function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      const js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  }
}
