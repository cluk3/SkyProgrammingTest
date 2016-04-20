import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ChannelSchema = new Schema({
  category: { type: String, required: true },
  product: { type: String, required: true, unique: true },
  locationID: { type: String }
})

// Model creation
export default mongoose.model('Channel', ChannelSchema)
