import { Navigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import { PropsWithChildren } from "react";



type ProtectedRouteProps = PropsWithChildren & {
    allowedRoles?: string[]
}

export const ProtectedRoute = ({children, allowedRoles} : ProtectedRouteProps ) => {
    const {user} = useAuth();

    if(user === undefined){
        return <>Loading...</>
    }
    if(user === null || (allowedRoles && !allowedRoles.includes(user.role))){
        return <Navigate to="/"/>
    }
    return children
}