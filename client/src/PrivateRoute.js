import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const status = useSelector((state) => state.user.isLoggedIn)
    const isLoggedIn = (status); 
    
 
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : ( 
                    <Redirect to={{ pathname: '/login', state: { from: props.match.params } }} />
                )
            }
        />
    )
}

export default PrivateRoute