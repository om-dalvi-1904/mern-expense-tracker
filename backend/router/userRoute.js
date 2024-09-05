let express = require("express")
const userController = require("../controllers/userCtrl")
const isAuthenticated = require("../middlewares/isAuth")
let userRouter = express.Router()

//! register
userRouter.post("/api/v1/users/register", userController.register)

//! login
userRouter.post("/api/v1/users/login", userController.login)

//! profile
userRouter.get("/api/v1/users/profile", isAuthenticated, userController.profile)

//! update profile
userRouter.put("/api/v1/users/update-profile", isAuthenticated, userController.updateProfile)

//! update password
userRouter.put("/api/v1/users/update-password", isAuthenticated, userController.updatePassword)

module.exports = userRouter