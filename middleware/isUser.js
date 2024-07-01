export default ({ $auth, redirect, app }) => {
  if ($auth.user.type === 'USER') {
    redirect(app.localePath('/'))
  }
}
