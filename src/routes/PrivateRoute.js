import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import SyncLoader from "react-spinners/SyncLoader";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser, isAuthenticating } = useAuth();

    if (!isAuthenticating) {
        return (
            <Route {...rest} render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/login" />
            }}>  
            </Route>
        );
    }

    else {
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
                <SyncLoader color={'#fffff'} />
                <h1 className="text-sm mt-5 font-semibold text-white-600">Loading</h1>
            </div>
        )
    }

}

export default PrivateRoute;
