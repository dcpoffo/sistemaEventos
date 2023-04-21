import React, { useContext }from "react";
import {Outlet, Routes, Route, Navigate} from 'react-router-dom'
import NotFound from "../pages/notFound/NotFound";
import {Home, Login, PublicPage} from "../pages";
import AuthContext from "../store/authContext";

const RequireAuth = () => {
    const auth = useContext(AuthContext);

    if (!auth.user) {
        return <Navigate to={'/login'}/>
    }

    return <Outlet/>
}

const MainRouter = () => {
    return (
        <Routes>
            <Route element={<Outlet />} errorElement={<NotFound />}>
                <Route path="/" element={<PublicPage />}/>
                <Route path="/login" element={<Login />}/>

                <Route path="/principal" element={<RequireAuth/>}>
                    <Route path="/principal/home" element={<Home/>}/>
                </Route>                

            </Route>
        </Routes>
    )
}

export default MainRouter;