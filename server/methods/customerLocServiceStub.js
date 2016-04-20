export default async function (ctx, next) {
  function getLocationIDFromDB (customerID) {
    return Promise.resolve('LONDON')
  }
  const customerID = ctx.cookies.get('customerID')
  if (customerID !== undefined) {
    try {
      const locationID = await getLocationIDFromDB(locationID)
      ctx.status = 200
      ctx.body = {
        data: {
          locationID
        }
      }
    } catch (err) {
      ctx.status = 500
      ctx.body = {
        error: 'There was a problem retrieving the customer information'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      error: 'customerID is undefined'
    }
  }
}
