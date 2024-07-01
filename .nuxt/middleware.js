const middleware = {}

middleware['isAuth'] = require('../middleware/isAuth.js')
middleware['isAuth'] = middleware['isAuth'].default || middleware['isAuth']

middleware['isCompany'] = require('../middleware/isCompany.js')
middleware['isCompany'] = middleware['isCompany'].default || middleware['isCompany']

middleware['isUser'] = require('../middleware/isUser.js')
middleware['isUser'] = middleware['isUser'].default || middleware['isUser']

middleware['logger'] = require('../middleware/logger.js')
middleware['logger'] = middleware['logger'].default || middleware['logger']

middleware['notAuth'] = require('../middleware/notAuth.js')
middleware['notAuth'] = middleware['notAuth'].default || middleware['notAuth']

middleware['redirectProfile'] = require('../middleware/redirectProfile.js')
middleware['redirectProfile'] = middleware['redirectProfile'].default || middleware['redirectProfile']

middleware['routeChange'] = require('../middleware/routeChange.js')
middleware['routeChange'] = middleware['routeChange'].default || middleware['routeChange']

export default middleware
