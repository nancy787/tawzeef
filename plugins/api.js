export default ({ app: { $axios } }, inject) => {
    // singleton class
    class HttpMethods {
        static instance
        constructor() {
            if (HttpMethods.instance instanceof HttpMethods) {
                return HttpMethods.instance
            }
            HttpMethods.instance = Object.freeze(this)
        }
        get({ resource, query }) {
            return $axios({
                method: 'get',
                url: `/api/admin/${resource}`,
                params: { ...query },
            })
        }
        post({ resource, data, query }) {
            return $axios({
                method: 'post',
                url: `/api/admin/${resource}`,
                data,
                params: { ...query },
            })
        }
    }
    inject('http', new HttpMethods())
}
