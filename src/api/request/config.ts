// process.env.NODE_ENV

let BASE_URL = ""
const TIME_OUT = 10000

if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api"
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http:coderwhy.org/prod"
} else {
  BASE_URL = "http:coderwhy.org/test"
}

export { TIME_OUT, BASE_URL }
