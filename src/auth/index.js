import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Auth from '../configuration/configuration-aws'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentEmailUser, setCurrentEmailUser] = useState(null);
    const navigate = useNavigate()

    
    useEffect( () => {
        async function checkAuthen() {
            await Auth.currentAuthenticatedUser()
            .then(async(response) => {
                setCurrentEmailUser(response.attributes.email);
            })
            .catch(() => {
                navigate('/');
            })
        }
        checkAuthen();
    }, [])

    return (
        <AuthContext.Provider value={{currentEmailUser}}>
            {children}
        </AuthContext.Provider>
    )
}