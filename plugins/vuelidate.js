import Vue from 'vue'
import Vuelidate from 'vuelidate'

import vuelidateErrorExtractor, { templates } from 'vuelidate-error-extractor'

import FormGroup from '@/components/FormGroup'

Vue.use(Vuelidate)

const messages = {
    en: require('@/locales/en.json'),
    ar: require('@/locales/ar.json'),
}

Vue.use(vuelidateErrorExtractor, {
    messages,
    i18n: 'validation',
})

Vue.component('form-group', FormGroup)
Vue.component('form-wrapper', templates.FormWrapper)
