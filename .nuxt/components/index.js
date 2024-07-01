export { default as CardsBank } from '../../components/Cards/Bank.vue'
export { default as CardsEmployee } from '../../components/Cards/Employee.vue'
export { default as CardsJob } from '../../components/Cards/Job.vue'
export { default as CardsJobDetails } from '../../components/Cards/JobDetails.vue'
export { default as CardsJobDetailsWatch } from '../../components/Cards/JobDetailsWatch.vue'
export { default as CardsMajor } from '../../components/Cards/Major.vue'
export { default as CardsMajorsReports } from '../../components/Cards/MajorsReports.vue'
export { default as CardsMessage } from '../../components/Cards/Message.vue'
export { default as CardsSalary } from '../../components/Cards/Salary.vue'
export { default as CardsSubscribe } from '../../components/Cards/Subscribe.vue'
export { default as CompanyRegisterForm } from '../../components/CompanyRegisterForm/index.vue'
export { default as CustomHeader } from '../../components/CustomHeader/index.vue'
export { default as FormGroup } from '../../components/FormGroup/index.vue'
export { default as GoogleMaps } from '../../components/GoogleMaps/index.vue'
export { default as ImageUpload } from '../../components/ImageUpload/index.vue'
export { default as Loader } from '../../components/Loader/index.vue'
export { default as Majors } from '../../components/Majors/index.vue'
export { default as MyJob } from '../../components/MyJob/index.vue'
export { default as NavBar } from '../../components/NavBar/index.vue'
export { default as ProfileCard } from '../../components/Profile/card.vue'
export { default as ProfileContacts } from '../../components/Profile/contacts.vue'
export { default as ProfileExperience } from '../../components/Profile/experience.vue'
export { default as ProfileJobRequired } from '../../components/Profile/job_required.vue'
export { default as ProfileMemberships } from '../../components/Profile/memberships.vue'
export { default as ProfilePersonalInformation } from '../../components/Profile/personal_information.vue'
export { default as ProfileQualifications } from '../../components/Profile/qualifications.vue'
export { default as ProfileSkills } from '../../components/Profile/skills.vue'
export { default as ProfileSubMajors } from '../../components/Profile/sub_majors.vue'
export { default as ProfileTrainingCourses } from '../../components/Profile/training_courses.vue'
export { default as Queries } from '../../components/Queries/index.vue'
export { default as RegisterForm } from '../../components/RegisterForm/index.vue'
export { default as RelatedBlogs } from '../../components/RelatedBlogs/index.vue'
export { default as RelatedNews } from '../../components/RelatedNews/index.vue'
export { default as ResetPassword } from '../../components/ResetPassword/index.vue'
export { default as SubscribeJob } from '../../components/SubscribeJob/index.vue'
export { default as FileUpload } from '../../components/fileUpload/index.vue'
export { default as NewImageUpload } from '../../components/newImageUpload/index.vue'
export { default as FiltersHomeForm } from '../../components/Filters/Home/Form.vue'
export { default as FiltersHome } from '../../components/Filters/Home/index.vue'
export { default as FiltersJob } from '../../components/Filters/Job/index.vue'
export { default as FiltersMajorslevel } from '../../components/Filters/Majorslevel/index.vue'
export { default as FiltersEmployee } from '../../components/Filters/employee/index.vue'
export { default as HomeAgents } from '../../components/Home/Agents/index.vue'
export { default as HomeCompanies } from '../../components/Home/Companies/index.vue'
export { default as HomeCompany } from '../../components/Home/Company/index.vue'
export { default as HomeEmploymentRole } from '../../components/Home/EmploymentRole/index.vue'
export { default as HomeViews } from '../../components/Home/Views/index.vue'
export { default as LayoutFooter } from '../../components/Layout/Footer/index.vue'
export { default as LayoutHeader } from '../../components/Layout/Header/index.vue'
export { default as HomeCompanyActiveJobs } from '../../components/Home/Company/ActiveJobs/index.vue'
export { default as HomeCompanyExpiredJobs } from '../../components/Home/Company/ExpiredJobs/index.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
