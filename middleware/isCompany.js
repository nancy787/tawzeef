export default ({ $auth, redirect, app }) => {
  if ($auth.loggedIn && $auth.user.type === 'COMPANY') {
    redirect(app.localePath('/'))
  }
}
