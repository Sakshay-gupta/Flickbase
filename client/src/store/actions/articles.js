import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {errGlobal, successGlobal} from '../reducers/notification'
import { getAuthHeader } from '../../utils/tools'
axios.defaults.headers.post['Content-Type'] = 'application/json'


export const addArticles = createAsyncThunk(
    'articles/addArticles',
    async (article, { dispatch }) => {
        try{
            const request = await axios.post(`/api/articles/`, article, getAuthHeader())
            dispatch(successGlobal('Post Created!!'))
            return request.data
        } catch(error){
            dispatch(errGlobal(error.response.data.message))
            throw error
        }
    }
)

export const getAdminArticle = createAsyncThunk(
    'articles/getAdminArticle',
    async (_id, { dispatch }) => {
        try{
            const request = await axios.get(`/api/articles/article/${_id}`, getAuthHeader())
            return request.data
        } catch(error){
            dispatch(errGlobal(error.response.data.message))
            throw error
        }
    }
)

export const updateArticle = createAsyncThunk(
    'articles/updateArticle',
    async ({values, articleId}, {dispatch}) => {
        try{
            await axios.patch(`/api/articles/article/${articleId}`, values, getAuthHeader())
            dispatch(successGlobal('Article Updated!!'))
            return true
        } catch(error){
            dispatch(errGlobal(error.response.data.message))
            throw error
        }
    }
)

export const getPaginateArticle = createAsyncThunk(
    'articles/getPaginateArticle',
    async ({page=1, limit=5, keywords=""}, { dispatch }) => {
        try{
            const request = await axios.post(`/api/articles/admin/paginate`,{
                page,
                limit,
                keywords
            }, getAuthHeader())
            return request.data
        } catch(error){
            dispatch(errGlobal(error.response.data.message))
            throw error
        }
    }
)
export const changeStatusArticle = createAsyncThunk(
    'articles/changeStatusArticle',
    async({newStatus,_id},{ dispatch,getState })=>{
        try{
            const request = await axios.patch(`/api/articles/article/${_id}`,{
                status:newStatus
            },getAuthHeader());

            let article = request.data;
            /// previous state
            let state = getState().articles.adminArticles.docs;
            ///  find the position
            let position = state.findIndex( article => article._id === _id);
            // we cannot mutate 'let state', we create copy
            const newState = [...state];
            newState[position] = article;

            dispatch(successGlobal('Status changed !!'))
            return newState;
        } catch(error){
            dispatch(errGlobal(error.response.data.message))
            throw error
        }
    }
)

export const deleteArticle = createAsyncThunk(
    'articles/deleteArticle',
    async (_id, {dispatch, getState}) => {
        try{
            await axios.delete(`/api/articles/article/${_id}`, getAuthHeader())

            const page = getState().articles.adminArticles.page
            dispatch(getPaginateArticle({page}))
            dispatch(successGlobal('Article Removed!!'))
            return true
        } catch(error){
            dispatch(errGlobal(error.response.data.message))
            throw error
        }
    }
)

export const homeLoadMore = createAsyncThunk(
    'articles/homeLoadMore',
    async (sort, {dispatch, getState}) => {
        try{
            const articles = await axios.post(`/api/articles/all`, sort)
            const state = getState().articles.articles;
            const prevState = [...state]
            const newState = [...prevState, ...articles.data]
            return { newState, sort}
        } catch(error){
            dispatch(errGlobal(error.response.data.message))
            throw error
        }
    }
)

export const getArticle = createAsyncThunk(
    'articles/getArticle',
    async (id, {dispatch}) => {
        try{
            const articles = await axios.get(`/api/articles/user/article/${id}`)
            return articles.data
        } catch(error){
            dispatch(errGlobal(error.response.data.message))
            throw error
        }
    }
)