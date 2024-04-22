import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import React, { lazy } from 'react';

const Login = lazy(() => import('../pages/login/index.jsx'));
const Redirect = lazy(() => import('../pages/template/redirect/index.jsx'));
const Tabbar = lazy(() => import('../pages/tabbar/index.jsx'));
const Home = lazy(() => import('../pages/tabbar/home/index.jsx'))
const User = lazy(() => import('../pages/tabbar/user/index.jsx'))
const List = lazy(() => import('../pages/tabbar/list/index.jsx'))



const GetRoutes = () => {
    const routes = useRoutes([
        {
            path: "/",
            element: <Redirect />
        },
        {
            path: "/login",
            element: <Login />
        },
        // {
        //     path: "/home",
        //     element: <Home />
        // },
        {
            path: "/tabbar",
            element: <Tabbar />,
            children:
                [
                    {
                        path: "home",
                        element: <Home />
                    },
                    {
                        path: "list",
                        element: <List />
                    },
                    {
                        path: "user",
                        element: <User />
                    }
                ]
        }
    ]);
    return routes;
}

const SetRoutes = () => {
    return (
        <Router>
            <GetRoutes />
        </Router>
    )
}

export default SetRoutes;
