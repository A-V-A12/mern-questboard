import mongoose from "mongoose";

const questSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    content:{
        type:String,
        required: true
    },

}, {timestamps: true});

const Quest = mongoose.model("Quest", questSchema)

export default Quest