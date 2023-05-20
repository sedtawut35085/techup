import { useEffect,useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { getAdminCountWeekly, getAdminWeekly } from '../../../../service/admin';

const User = ({currentpage,setContentPage,setCurrentWeeklyID}) =>{
    const [isLoading1, setIsLoading1] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const handleOnClick = async (e, userID) => {
        setContentPage(true)
        setCurrentWeeklyID(userID)
    } 

    const [alldata, setAllData] = useState([])
    const [currentPage,setCurrentPage] = useState(1);
    const [numberPage, setNumberPage] = useState([])
    const [pageSize,setPageSize] = useState(10);
    let pageStart = 0;
    let pageNumber

    useEffect(() => {
        loadCountOfData(pageSize);
        loadData(pageStart,pageSize);
    }, []);

    async function loadData(pageStart,pageSize) {
        const res = await getAdminWeekly(pageStart,pageSize);
        setAllData(res); 
        setIsLoading1(false)
        // setIsLoading(isLoading.splice(isLoading.indexOf(3), 1))
    }

    async function loadCountOfData(pageSize) {
        const res = await getAdminCountWeekly()
        const PageNumberList = []
        pageNumber = Math.ceil(res[0]["count(*)"] / pageSize);
        for(let i=1;i<=pageNumber;i++){
            PageNumberList.push(i)
        }
        setNumberPage(PageNumberList)
        setIsLoading(false)
        // setIsLoading(isLoading.splice(isLoading.indexOf(4), 1))
    }  

    async function changePage(event) {
        let temp = event.target.value
        setCurrentPage(Number(temp))
        pageStart = pageSize*(event.target.value - 1)
        await loadData(pageStart,pageSize)
    }
    async function goToFirstPage(event) {
        setCurrentPage(1)
        pageStart = pageSize*(1 - 1)
        await loadData(pageStart,pageSize)
    }
    async function goToLastPage(event) {
        setCurrentPage(numberPage.length)
        pageStart = pageSize*(numberPage.length - 1)
        await loadData(pageStart,pageSize)
    }
    async function goToPreviousPage(event) {
        event.preventDefault();
        setCurrentPage(currentPage-1)
        pageStart = pageSize*(currentPage - 2)
        await loadData(pageStart,pageSize)
    }
    async function goToNextPage(event) {
        setCurrentPage(currentPage+1)
        pageStart = pageSize*(currentPage)
        await loadData(pageStart,pageSize)
    }
    async function changePageSize(pageSize) {
        setPageSize(Number(pageSize))
        setCurrentPage(1)
        pageStart = pageSize*(1 - 1)
        await loadCountOfData(Number(pageSize))
        await loadData(pageStart,Number(pageSize))
    }

    const listdata = alldata.map((data, i) =>   
    <tr key={i} >
        <td className="title thai">{i}</td>
        <td className="topic thai">{data.QuestionID}</td>
        <td className="name thai">{data.QuestionName.substring(0, 40) + "..."}</td>
        <td className="difficulty thai">{data.Difficulty}</td>
        <td className="point thai">{data.Point}</td>
        {
            data.Status === "ongoing"
            ?   <td className="thai status"><span className='color-3'>{data.Status}</span></td>
            :   <td className="thai status"><span className='color-1'>{data.Status}</span></td>
        } 
        <td className="point-table">
            <div className="col-12">
                <button type="submit" onClick={(e) => handleOnClick(e, data.QuestionID)} className="btnsubmit-viewdetail">View Detail</button>
            </div>
        </td>
    </tr>
    )

    return ( 
        <div className='container-fluid'>
            {
            (isLoading === true) && (isLoading1 === true) &&
            <div className="loader2">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
            </div>
            }
            { (isLoading === false) && (isLoading1 === false) &&
            <div className='row g-3 my-2'> 
                <span className='pt-2 f-lg fw-600'>{currentpage}</span>  
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="no">No. </th>
                                    <th className="id">Weekly ID</th>
                                    <th className="name">Name </th>
                                    <th className="difficulty">Difficulty </th>
                                    <th className="point">Point </th>
                                    <th className="status">Status </th>
                                    <th className="action">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listdata}
                            </tbody>
                        </table>
                        <div className="pagination1">
                            <div className="display-per-page">
                                <span>Display per page</span>
                                <select onChange={(event) => {changePageSize(event.target.value)}} className="page">
                                    <option default>10</option>
                                    <option>15</option>
                                    <option>25</option>
                                </select>
                            </div>
                            <div className="pagination-number">
                                <button onClick={goToFirstPage} className={
                                    currentPage !== 1 
                                    ? "arrow"
                                    : "arrow disable"
                                    }><FiChevronsLeft /></button>
                                <button onClick={goToPreviousPage} className={
                                    currentPage !== 1 
                                    ? "arrow"
                                    : "arrow disable"
                                    }><FiChevronLeft /></button>
                                {numberPage.map((key, i) => (
                                    <button key={i} name={key} value={key} className={
                                        currentPage === key
                                        ? "number active"
                                        : "number"
                                    } onClick={changePage}>{key}</button>
                                ))}
                                <button onClick={goToNextPage} className={
                                    currentPage < numberPage.length
                                    ? "arrow"
                                    : "arrow disable"
                                    }><FiChevronRight /></button>
                                <button onClick={goToLastPage} className={
                                    currentPage < numberPage.length
                                    ? "arrow"
                                    : "arrow disable"
                                    }><FiChevronsRight /></button>
                            </div>
                        </div>                                                     
                </div>
            </div>
        }
        </div>
    )
}

export default User