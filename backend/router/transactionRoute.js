let express = require("express")
const isAuthenticated = require("../middlewares/isAuth")
const transactionController = require("../controllers/transactionCtrl")
let transactionRouter = express.Router()

//! create
transactionRouter.post("/api/v1/transaction/create", isAuthenticated, transactionController.create)

//! view all
transactionRouter.get("/api/v1/transaction/lists", isAuthenticated, transactionController.lists)

//! update
transactionRouter.put("/api/v1/transaction/update/:id", isAuthenticated, transactionController.update)

//! delete
transactionRouter.delete("/api/v1/transaction/delete/:id", isAuthenticated, transactionController.delete)

module.exports = transactionRouter