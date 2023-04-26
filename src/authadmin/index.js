import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAccountAdmin } from '../service/admin'
import Auth from '../configuration/configuration-aws'

export const AuthContext = React.createContext();

export const AuthProviderAdmin = ({ children }) => {
    const [currentEmailUser, setCurrentEmailUser] = useState(null);
    const navigate = useNavigate()

    useEffect( () => {
        async function checkAuthen() {
            await Auth.currentAuthenticatedUser()
            .then(async(response) => {
                setCurrentEmailUser(response.attributes.email);
                let res = await getAccountAdmin(response.attributes.email)
                if(res[0] === undefined){
                    navigate('/Admin');
                }
            })
            .catch(() => {
                navigate('/Admin');
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