import React from 'react';

import routes from "../../../routes"

import { useLocation } from 'react-router';
import {Breadcrumbs} from "@material-ui/core"
import Crumb from "./Crumb/Crumb"

const routesByRoute = Object.fromEntries(
    Object.entries(routes).map(([key, {path, text}]) => (
        [path, text]
)))

const RouterBreadcrumbs = (props) => {
    const location = useLocation()
    const pathnames = location.pathname.split("/").filter((x) => x)
    const last = pathnames.length - 1
    const crumbs = pathnames
    .map((val, index, arr) => {
        const route = `/${arr.slice(0, index + 1).join("/")}`
        return <Crumb 
        to={route} 
        key={index}
        tail={index === last ? 1 : 0}
        >
            {routesByRoute[route]}
        </Crumb>
    }
    
    )
    return (
        <Breadcrumbs>
            <Crumb to={routes.home.path} tail={crumbs.length === 0 ? 1 : 0}>{routes.home.text}</Crumb>
            {crumbs}
        </Breadcrumbs>
    );
};
export default RouterBreadcrumbs;