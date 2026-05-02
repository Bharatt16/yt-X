import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Comment content is required"],
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    }
  },
  {
    timestamps: true,
  },
);

commentSchema.plugin(mongooseAggregatePaginate); //mongoose.plugin is used to add the pagination functionality to the videoSchema. It is used to paginate the results of the aggregate queries that are made on the video collection. It is used to improve the performance of the queries that are made on the video collection by paginating the results and returning only a subset of the results at a time.

export const Comment = mongoose.model("Comment", commentSchema);
