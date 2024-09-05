let asyncHandler = require("express-async-handler")
const User = require("../model/User")
let bcrypt = require("bcryptjs")
let jwt = require("jsonwebtoken")
const Category = require("../model/Category")
const Transaction = require("../model/Transaction")

let categoryController = {
    //! add
    create: asyncHandler(async(req,res)=>{
        //* get data from the user
        let {type, name} = req.body
        if(!type || !name){
            throw new Error("Enter the required fields.")
        }
        //* convert the name to lower case
        let lowerName = name.toLowerCase()
        //* check if the type is valid or not
        let validType = ['income','expense']
        if(!validType.includes(type.toLowerCase())){
            throw new Error("Invalid category.")
        }
        //* check if the category already exists
        let categoryExists = await Category.findOne({name:lowerName, user:req.use})
        if(categoryExists){
            throw new Error(`${categoryExists.name} already exists in your database.`)
        }
        //* create the category
        await Category.create(
            {user:req.user,name:lowerName,type:type}
        )
        //* send the response
        res.status(201).json({
            message:"Category created successfully."
        })
    }),
    //! lists
    lists: asyncHandler(async(req,res)=>{
        let result = await Category.find({user:req.user})
        res.status(200).json(result)
    }),
    //! update
    update: asyncHandler(async(req,res)=>{
        let categoryId = req.params.id
        let {newType, newName} = req.body
        let lowerName = newName.toLowerCase()
        //* find the category to be updated
        let category = await Category.findById(categoryId)
        if(!category && category.user.toString() !== req.user.toString()){
            throw new Error("Category not found or user is not authorized.")
        }
        let oldName = category.name
        //* update in the category
        let result = await Category.findByIdAndUpdate(categoryId,
            {name:newName, type:newType}
        )
        //* update in the transaction
        if(oldName !== result.name){
            await Transaction.updateMany(
                {user:req.user, category:oldName}, // which data to update
                {$set:{category:result.name}} // data to be updated
            )
        }
        //* send the response
        res.json({
            message:"Category updated successfully."
        })
    }),
    //! delete
    delete: asyncHandler(async(req,res)=>{
        //* find the category to be updated
        let category = await Category.findById(req.params.id)
        if(category && category.user.toString() === req.user.toString()){
            //* update the transactions which have this category
            let defaultCategory = "uncategorized"
            await Transaction.updateMany(
                {user:req.user},
                {$set:{category:defaultCategory}}
            )
            //* delete the category
            await Category.findByIdAndDelete(req.params.id)
            //* send the response
            res.json({
                message:"Category deleted successfully."
            })
        }else{
            res.json({
                message:"Category not found or user is not authorized."
            })
        }
    }),
}

module.exports = categoryController