import { FaChevronLeft} from 'react-icons/fa';
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'

const Store = ({currentPage}) =>{
    return ( 
        <div className='container-fluid'>
        <div className='row g-3 my-2'>
            <span className='pt-2 f-lg fw-600'>{currentPage}</span>        
            <span className='pt-2 f-xl fw-800'>Up coming</span>  
        </div>
        </div>
    )
}

export default Store