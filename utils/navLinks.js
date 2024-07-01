export default (vm) => {
  return [
    { title: vm.$t('home'), to: '/' },
    {
      title: vm.$t('search_on_employee'),
      to: `/search-on-employee`,
    },
    { title: vm.$t('Post_a_job'), to: '/post-job' },
    { title: vm.$t('contact_us'), to: '/contact-us' },
    { title: vm.$t('salaries'), to: '/categories' },
    { title: vm.$t('sources'), to: '/categories' },
    { title: vm.$t('Business platform'), to: '/categories' },
  ]
}
