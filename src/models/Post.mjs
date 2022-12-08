import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    message: { required: true, type: String },
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

PostSchema.pre('find', function () {
  this.populate('user')
})


PostSchema.pre('save', function () {
  this.populate('user')
})


const Post = mongoose.model('Post', PostSchema)

export default Post
