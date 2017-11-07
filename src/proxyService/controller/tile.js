const request = require('axios')
module.exports = async (ctx, next) => {
  try {
    await request.get('http://buddebej.de/planobliqueeurope' + ctx.request.url).then(function (response) {
      console.log(response)
      if (response.data) {
        ctx.status = 200
        ctx.body = response.data
      } else {
        ctx.status = 200
        ctx.body = null
      }
    }).catch(function (error) {
      ctx.status = 500
      ctx.body = error
    })
  } finally {
  }
}
