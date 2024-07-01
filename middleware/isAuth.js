export default ({ $auth, redirect, app }) => {
  if ($auth.loggedIn) {
    redirect(app.localePath('/'))
  }
}
