import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './reducers/users'
import ArticlesReducer from './reducers/articles'
import NotificationsReducer from './reducers/notification'
import SiteReducer from './reducers/site'
export const store = configureStore({
    reducer:{
        users:UserReducer,
        articles:ArticlesReducer,
        notifications:NotificationsReducer,
        site:SiteReducer
    }
})