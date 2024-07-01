export default function({ app, $vuetify, route }) {
    app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
        $vuetify.rtl = true
    }
}
