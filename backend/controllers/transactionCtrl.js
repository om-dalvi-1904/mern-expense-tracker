let asyncHandler = require("express-async-handler")
const Transaction = require("../model/Transaction")

let transactionController = {
    //! add
    create: asyncHandler(async(req,res)=>{
        let {type, category, amount, date, description} = req.body
        if(!type || !amount || !date){
            throw new Error("All fields are required.")
        }
        //* create the transaction
        let result = await Transaction.create(
            {user:req.user, type:type, category:category, amount: amount, date:date, description:description}
        )
        //* send the response
        res.status(201).json({
            message:"Transaction created successfully."
        })
    }),
    //! list
    lists: asyncHandler(async(req,res)=>{
        let {type, category} = req.query
        //* perfom a db query
        let filters = {user:req.user}
        if(type){
            filters.type = type
        }
        if(category){
            if(category === "all"){
                //* return all transactions no filter
            }else if(category === "uncategorised"){
                //* all transactions with no category
                filters.category = "uncategorised"
            }else{
                filters.category = category
            }
        }
        let result = await Transaction.find(filters).sort({date: -1})
        //* send the response
        res.status(201).json(result)
    }),
    //! update
    update: asyncHandler(async(req,res)=>{
        let {newType, newCategory, newAmount} = req.body
        let transaction = await Transaction.findById(req.params.id)
        //* update the transaction in db
        if(transaction && transaction.user.toString() === req.user.toString()){
            await Transaction.findByIdAndUpdate(req.params.id,
                {type:newType, category:newCategory, amount:newAmount},{new:true}
            ),
            res.json({
                message:"Transaction updated successfully."
            })
        }
    }),
    //! delete
    delete: asyncHandler(async(req,res)=>{
        let transaction = await Transaction.findById(req.params.id)
        if(transaction && transaction.user.toString() === req.user.toString()){
            await Transaction.findByIdAndDelete(req.params.id)
            res.json({
                message:"Transaction deleted successfully."
            })
        }
    })
}
module.exports = transactionController