export default ({ $auth, redirect, app }) => {
  redirect(app.localePath('/profile/info'))
}
