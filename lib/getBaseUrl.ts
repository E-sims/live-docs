const getBaseUrl = () =>
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : `https://www.doxxy.cloud`

export default getBaseUrl
