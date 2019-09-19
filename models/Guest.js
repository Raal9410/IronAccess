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
      type: String,
      unique: true
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
