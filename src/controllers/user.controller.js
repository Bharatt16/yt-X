import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary} from '../utils/cloudinary.js'

const registerUser = asyncHandler(async (req, res) => {

  // get user details from frontend
  const { fullname, email, username, password } = req.body;

  console.log(`fullname: ${fullname}`);

  // validation
  if (
    [fullname, email, username, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "all fields are required");
  }



  // check if user already exists in db


  const existedUSer = User.findOne({
    $or: [{username}, {email}]
  })

  if(existedUSer){
   throw new ApiError(409, "User with email already exists")
  }

  // check for images and avatar

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  
  console.log("Req.files : " ,req.files)

  if(!avatarLocalPath){
   throw new ApiError(400 , "Avtar files is required")
  }
  
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)
  
  if(!avatar){
   throw new ApiError(400 , "Avtar files is required")
  }

  const user = await User.create({
   fullname,
   avatar : avatar.url,
   coverImage : coverImage.url || "",
   email , 
   password,
   username : username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
   "-password -refreshToken"
  )

  if(!createdUser){
   throw new ApiError(500  , "Something went wrong while registering user")
  }

  return res.status(201).json(
   new ApiResponse(200, createdUser , "User registered successfully")
  )

  // upload them in cloudinary , avatar

  // create user object - create entry in db

  // remove password and refresh token from response

  // check for user creation

  // return response
  return res.status(201).json({
    message: "User registered successfully",
  });

});

export { registerUser };