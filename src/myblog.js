import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const articlesInfo= new Schema({
    name:{
        type: String,
        required:true
    },
    upvotes:{
        type: Number,
        required: true
    },
    comments:[{
        username:{
            type:String,
            required:true
        },
        text:{
            type:String,
            required:true
        }
    }]
}
    
);

module.exports= mongoose.model('Articles',articlesInfo);