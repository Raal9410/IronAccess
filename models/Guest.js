const { model, Schema } = require('mongoose')

const guestSchema = new Schema(
  {
    name: String,
    email: String,
    lastName: String,
    date: {
      type: Date,
      default: Date.now(),
      required: true
    },
    code: {
      type: Number,
      unique: true,
      default: 0000
    },
    invitedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Guest', guestSchema)
