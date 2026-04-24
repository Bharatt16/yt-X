import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt" //bcrypt vs bryptjs : bcrypt is a native module and it is faster than bcryptjs but it is not compatible with all the platforms. bcryptjs is a pure javascript implementation of bcrypt and it is compatible with all the platforms but it is slower than bcrypt. In this project we are using bcryptjs because it is compatible with all the platforms and it is easier to install than bcrypt.
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // it is used to create an index on the username field to improve the performance of the queries that are made on the username field
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudnary url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshTokens: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);



userSchema.pre("save",async function (next) {
  if(!this.isModified("password")) return next()
         this.password = await bcrypt.hash(this.password,10)
})

//.methods is used to add the instance methods to the userSchema. It is used to add the methods that can be called on the instances of the user model. It is used to add the methods that can be called on the user objects that are created from the user model. It is used to add the methods that can be called on the user objects that are returned from the database queries. It is used to add the methods that can be called on the user objects that are returned from the API responses.
userSchema.methods.isPasswordCorrect = async function (password){
  return await bcrypt.compare(password, this.password)  
}

userSchema.methods.genreateAccessToken = function(){
  return jwt.sign(
    {
    _id : this._id,
    email : this.email,
    username : this.username,
    fullname : this.fullname
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn : process.env.ACCESS_TOKEN_EXPIRY
  }
)
}

userSchema.methods.genreateRefreshToken = function(){
  return jwt.sign(
    {
    _id : this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn : process.env.REFRESH_TOKEN_EXPIRY
  }
)
}

export const User = mongoose.model("User", userSchema);
