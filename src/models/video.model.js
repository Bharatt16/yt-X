import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videofile: {
      type: String,
      requied: true,
    },
    thumbnail: {
      type: String,
      requied: true,
    },
    title: {
      type: String,
      requied: true,
    },
    description: {
      type: Number,
      requied: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timmestamps: true,
  }
);

videoSchema.plugin(mongooseAggregatePaginate) //mongoose.plugin is used to add the pagination functionality to the videoSchema. It is used to paginate the results of the aggregate queries that are made on the video collection. It is used to improve the performance of the queries that are made on the video collection by paginating the results and returning only a subset of the results at a time.
//pagination is the process of dividing the results of a query into smaller chunks and returning only a subset of the results at a time. It is used to improve the performance of the queries that are made on the video collection by paginating the results and returning only a subset of the results at a time. It is also used to improve the user experience by allowing the users to navigate through the results in a more efficient way.

export const Video = mongoose.model("video", videoSchema);
