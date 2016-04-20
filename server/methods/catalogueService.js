import Channel from '../models/channels'

export default async function (ctx, next) {
  const { locationID } = ctx.query
  try {
    const channels = await Channel.find({}).where('locationID').in([locationID, null]).select('-_id category product')
    ctx.body = {
      data: {
        channels
      }
    }
    ctx.status = 200
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      error: 'There was a problem retrieving the locationID'
    }
  }
}
