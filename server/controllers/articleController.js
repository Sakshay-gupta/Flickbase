const { ApiError } = require('../middleware/apierror')
const httpStatus = require('http-status')
const { articleService } = require('../services/index')

const articleController = {
    async createArticle(req, res, next){
        try{
            const article = await articleService.addArticle(req.body)
            res.send(article)
        } catch(error){
            next(error)
        }
    },
    async getArticleById(req, res, next){
        try{
            const _id = req.params.id;
            const article = await articleService.getArticleById(_id, req.user)
            res.send(article)
        } catch(error){
            next(error)
        }
    },
    async getUserArticleById(req, res, next){
        try{
            const _id = req.params.id;
            const article = await articleService.getUserArticleById(_id)
            res.send(article)
        } catch(error){
            next(error)
        }
    },
    async updateArticleById(req, res, next){
        try{
            const _id = req.params.id;
            const article = await articleService.updateArticleById(_id, req.body)
            res.send(article)
        } catch(error){
            next(error)
        }
    },
    async deleteArticleById(req, res, next){
        try{
            const _id = req.params.id;
            await articleService.deleteArticleById(_id)
            res.status(httpStatus.OK).json({action:'ok'})
        } catch(error){
            next(error)
        }
    },
    async getAllArticle(req, res, next){
        try{
            const articles = await articleService.getAllArticle(req)
            res.json(articles)
        } catch(error){
            next(error)
        }
    },
    async getMoreArticles(req, res, next){
        try{
            const articles = await articleService.moreArticles(req)
            res.json(articles)
        } catch(error){
            next(error)
        }
    },
    async adminPaginate(req, res, next){
        try{
            const articles = await articleService.paginateAdminArticles(req)
            res.json(articles)
        } catch(error){
            next(error)
        }
    } 
} 

module.exports = articleController