import { useState } from 'react'
import ContentUser from './DescUser'
import User from './User'

const HomeUser = ({currentPage}) =>{
    const [ContentPage,setContentPage] = useState(false)
    const [CurrentUser,setCurrentUser] = useState(null)

    return ( 
        <>
        {
            ContentPage === false ?
            <>
                <User currentpage={currentPage} setContentPage={setContentPage} setCurrentUser={setCurrentUser}/>
            </>
            :
            <>
                <ContentUser currentpage={currentPage} setContentPage={setContentPage} CurrentUser={CurrentUser}/>
            </>
        }
        </>

    )
}

export default HomeUser