import mongoose from "mongoose"

const EventSchema = new mongoose.Schema(
    {
        title: { required: true, type: String },
        message: { required: true, type: String },
        city: { required: true, type: String },
        location: { required: true, type: String },
        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
)

EventSchema.pre("find", function () {
    this.populate("user")
})

const Event = mongoose.model("Event", EventSchema)

export default Event
