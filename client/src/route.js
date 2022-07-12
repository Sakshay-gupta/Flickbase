import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/home"
import Header from "./components/navigation/header"
import MainLayout from "./hoc/mainLayout";
import Auth from "./components/auth"
import Dashboard from "./components/dashboard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isAuth } from "./store/actions/users";
import { Loader } from "./utils/tools";
import AuthGuard from "./hoc/authGuard";
import AdminArticle from "./components/dashboard/article";
import AdminProfle from "./components/dashboard/profile";
import DashboardMain from "./components/dashboard/main"
import PreventViewArticle from "./hoc/preventViewArticle";
import AddArticle from "./components/dashboard/article/edit_add.js/add";
import EditArticle from "./components/dashboard/article/edit_add.js/edit";
import Article from "./components/articles/articles";
import AccountVerify from "./components/auth/accountVerify";
const Routers = () => {

  const users = useSelector(state => state.users)
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAuth())
  }, [])

  useEffect(() => {
    if(users.auth !== null){
      setLoading(false)
    }
  }, [users])
  return(
    <BrowserRouter>
    { loading ?
      <Loader/>
      :
      <>
        <Header/>
        <MainLayout>
          <Routes>
            <Route path='/dashboard' element={
              <AuthGuard>
                <Dashboard/>
              </AuthGuard>
            }>
              <Route index element={<DashboardMain/>} /> 
              <Route path='profile' element={<AdminProfle/>}/>
              <Route path='articles' element={
                // <PreventViewArticle>
                //   <AdminArticle/>
                // </PreventViewArticle>
                <AdminArticle/>}/>
              <Route path='articles/add' element={<AddArticle />} />
              <Route path='articles/edit/:articleId' element={<EditArticle />} />
            </Route>
            <Route path='/verification' element={<AccountVerify />} />
            <Route path='/articles/article/:id' element={<Article/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </MainLayout>
      </>
      }
    </BrowserRouter>
  )
}

export default Routers;
