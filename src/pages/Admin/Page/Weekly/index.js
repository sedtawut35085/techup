import { useState } from 'react'
import ContentUser from './DescWeekly'
import User from './Weekly'

const HomeWeekly = ({currentPage}) =>{
    const [ContentPage,setContentPage] = useState(false)
    const [CurrentWeeklyID,setCurrentWeeklyID] = useState(null)

    return ( 
        <>
        {
            ContentPage === false ?
            <>
                <User currentpage={currentPage} setContentPage={setContentPage} setCurrentWeeklyID={setCurrentWeeklyID}/>
            </>
            :
            <>
                <ContentUser currentpage={currentPage} setContentPage={setContentPage} CurrentWeeklyID={CurrentWeeklyID}/>
            </>
        }
        </>

    )
}

export default HomeWeekly