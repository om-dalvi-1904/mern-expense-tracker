let express = require("express")
const isAuthenticated = require("../middlewares/isAuth")
const categoryController = require("../controllers/categoryCtrl")
let categoryRouter = express.Router()

//! add
categoryRouter.post("/api/v1/category/add", isAuthenticated, categoryController.create)

//! view all categories
categoryRouter.get("/api/v1/category/lists", isAuthenticated, categoryController.lists)

//! update
categoryRouter.put("/api/v1/category/update/:id", isAuthenticated, categoryController.update)

//! delete
categoryRouter.delete("/api/v1/category/delete/:id", isAuthenticated, categoryController.delete)

module.exports = categoryRouter