const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncErrors = require("../middleware/CatchAsyncErrors");
const User = require("../models/UserModels");

// Register a User 
exports.registerUser = CatchAsyncErrors(async (req, res, next) => {

    const {name, email, password} = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id:"This is a sample id",
            url:"profilepicUrl",
        }
    })

    res.status(201).json({
        success:true,
        user,
    })
})