const { Article } = require('../models/article')
const httpStatus = require('http-status')
const { ApiError } = require('../middleware/apierror') 
const jwt = require('jsonwebtoken')
const { options } = require('../routes')
require('dotenv').config()


const addArticle = async(body) => {
    try{
        const article = new Article({
            ...body,
            score:parseInt(body.score)
        })
        await article.save();
        return article
    } catch(error){
        throw error;
    }
}

const getArticleById = async(_id, user) => {
    try{
        const article = await Article.findById(_id);
        if(!article){
            throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, no article found')
        }
        if(user.role === 'user'&& article.status === 'draft'){
            throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, you are not authorized')
        }
        return article
    } catch(error){
        throw error
    }
}

const getUserArticleById = async(_id) => {
    try{
        const article = await Article.findById(_id);
        if(!article){
            throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, no article found')
        }
        if(article.status === 'draft'){
            throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, you are not authorized')
        }
        return article
    } catch(error){
        throw error
    }
}

const updateArticleById = async(_id, body) => {
    try{
        const article = await Article.findByIdAndUpdate(
            {_id:_id},
            {
                '$set': body
            },
            {new:true}
        );
        if(!article){
            throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, no article found')
        }
        return article
    } catch(error){
        throw error
    }
}

const deleteArticleById = async(_id) => {
    try{
        const article = await Article.findByIdAndDelete(_id);
        if(!article){
            throw new ApiError(httpStatus.NOT_FOUND, 'Sorry, no article found')
        }
        return article
    } catch(error){
        throw error
    }
}

const getAllArticle = async(req) => {
    try{
        const sortby = req.query.sortby || "_id"
        const order = req.query.order || "desc"
        const limit = req.query.limit || 2
        const articles = await Article
        .find({status:'public'})
        .sort([
            [sortby, order]
        ])
        .limit(parseInt(limit));
        return articles;
    } catch(error){
        throw error
    }
}

const moreArticles = async(req) => {
    try{
        const sortby = req.body.sortby || "_id"
        const order = req.body.order || "desc"
        const limit = req.body.limit || 2
        const skip = req.body.skip || 0;
        const articles = await Article
        .find({status:'public'})
        .sort([[sortby, order]])
        .skip(skip)
        .limit(parseInt(limit));
        return articles;
    } catch(error){
        throw error
    }
}

const paginateAdminArticles = async(req) => {
    try{
        let aggQuery = Article.aggregate()
        if(req.body.keywords && req.body.keywords != ''){
            const re = new RegExp(`${req.body.keywords}`,'gi')
            aggQuery = Article.aggregate([
                {$match: {title:{$regex:re}}}
            ]);
        } else {
            aggQuery = Article.aggregate()
        }
        const limit = req.body.limit ?  req.body.limit : 5;
        const options = {
            page:req.body.page,
            limit,
            sort:{_id:'desc'}
        }
        const articles = await Article.aggregatePaginate(aggQuery, options);
        return articles;
    } catch(error){
        throw error
    }
}
module.exports = {
    addArticle,
    getArticleById,
    getUserArticleById,
    updateArticleById,
    deleteArticleById,
    getAllArticle,
    moreArticles,
    paginateAdminArticles
}