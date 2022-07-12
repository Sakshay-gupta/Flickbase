const mongoose = require('mongoose');
const validator = require('validator');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
require('dotenv').config();

const ArticleSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true, 'You need a Title'],
        maxLength:100
    },
    content:{
        type:String,
        required:[true, 'You need some content'],
    },
    excerpt:{
        type:String,
        required:[true, 'You need to add excerpt'],
        maxLength:500
    },
    score:{
        type:Number,
        max:100,
        min:0,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    actors:{
        type:[String],
        required:true,
        validate:{
            validator:function(array){
                return array.length >= 2;
            },
            message:"You need to add atleast 3 actors"
        }
    },
    status:{
        type:String,
        required:true,
        enum:['draft', 'public'],
        default:'draft',
        index:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

ArticleSchema.plugin(aggregatePaginate);
const Article = mongoose.model('Article', ArticleSchema);
module.exports = { Article };