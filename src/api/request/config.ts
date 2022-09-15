// process.env.NODE_ENV

let BASE_URL = ''
let BASE_NAME = ''

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http:-----开发环境-----'
  BASE_NAME = 'development'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http:-----生产环境-----'
  BASE_NAME = 'production'
} else {
  BASE_URL = 'http:-----测试环境-----'
  BASE_NAME = 'test'
}

export { BASE_NAME, BASE_URL }
