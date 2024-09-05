let mongoose = require("mongoose")

let transactionSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        type:{
            type:String,
            required:true,
            enum:["income","expense"]
        },
        category:{
            type:String,
            required:true,
            default:"uncategorized"
        },
        amount:{
            type:Number,
            required:true
        },
        date:{
            type:Date,
            default: Date.now
        },
        description:{
            type:String,
            required:false
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Transaction",transactionSchema)