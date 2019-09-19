const { model, Schema } = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    name: String,
    lastName: String,
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['STAFF', 'CHECKER', 'BOSS', 'STUDENT'],
      default: 'STUDENT'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.plugin(PLM, { usernameField: 'email' })
module.exports = model('User', userSchema)
