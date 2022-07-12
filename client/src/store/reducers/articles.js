import { createSlice } from "@reduxjs/toolkit";
import { addArticles, getPaginateArticle, changeStatusArticle, homeLoadMore, getArticle } from "../actions/articles";

export const articlesSlice = createSlice({
    name:'articles',
    initialState:{
        homeSort:{
            sortby:"_id",
            order:"asc",
            limit:2,
            skip:0
        },
        loading:false,
        articles:[],
        current:null
    },
    reducers:{
        removeCurrent:(state) => {
            state.current = null
        }

    },
    extraReducers:(builder) => {
        builder
        .addCase(addArticles.pending, (state) => {state.loading = true})
        .addCase(addArticles.fulfilled, (state, action) => {
            state.loading = false
            state.lastAdded = action.payload
        })
        .addCase(addArticles.rejected, (state) => {state.loading = false})
        // getPaginateArticle
        .addCase(getPaginateArticle.pending, (state) => {state.loading = true})
        .addCase(getPaginateArticle.fulfilled, (state, action) => {
            state.loading = false
            state.adminArticles = action.payload
        })
        .addCase(getPaginateArticle.rejected, (state) => {state.loading = false})

        .addCase(changeStatusArticle.fulfilled, (state, action) => {
            state.adminArticles.docs = action.payload
        })

        .addCase(homeLoadMore.fulfilled, (state, action) => {
            state.homeSort.skip = action.payload.sort.skip 
            state.articles = action.payload.newState
        })

        .addCase(getArticle.pending, (state) => {state.loading = true})
        .addCase(getArticle.fulfilled, (state, action) => {
            state.loading = false
            state.current = action.payload
        })
        .addCase(getArticle.rejected, (state) => {state.loading = false})
    }
})

export const { removeCurrent } = articlesSlice.actions;
export default articlesSlice.reducer