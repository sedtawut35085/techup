const User = ({currentPage}) =>{
    return (
        <div className='container-fluid'>
                <div className='row g-3 my-2'>
                    <span className='pt-2 f-lg fw-600'>{currentPage}</span>        
                    <div className='table-responsive px-4'>
                        <table className="table table-striped table-hover caption-top px-6">
                            <thead>
                                <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Student ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Surname</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row" className="p-3">1</th>
                                    <td className="p-3">62090500450</td>
                                    <td className="p-3">Wittanasiri</td>
                                    <td className="p-3">Upparakkitanan</td>
                                    <td className="p-3">Wittanasiri.wc@kmutt.ac.th</td>
                                    <td className="p-3">
                                        <div className="btn-view-detail">View Detail</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="p-3" scope="row">2</th>
                                    <td className="p-3">62090500451</td>
                                    <td className="p-3">Sedtawut</td>
                                    <td className="p-3">Chalothornnarumit</td>
                                    <td className="p-3">Sedtawut.cha@kmutt.ac.th</td>
                                    <td className="p-3">
                                        <div className="btn-view-detail">View Detail</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    )
}

export default User