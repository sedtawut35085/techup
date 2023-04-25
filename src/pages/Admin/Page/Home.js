const HomeDashboard = ({currentPage}) =>{
    return (
        <div className='container-fluid'>
                <div className='row g-3 my-2'>
                    <span className='pt-2 f-lg fw-600'>{currentPage}</span>
                    <div className='col-md-6'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items'>
                            <div>
                                <h3 className='fs-2'>
                                    230
                                </h3>
                                <p className='fs-2'>
                                    Product
                                </p>
                            </div>
                        </div> 
                    </div>
                    <div className='col-md-6'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items'>
                            <div>
                                <h3 className='fs-2'>
                                    230
                                </h3>
                                <p className='fs-2'>
                                    Product
                                </p>
                            </div>
                        </div> 
                    </div>
                    <div className='table-responsive px-4'>
                        <table className="table caption-top px-6">
                            <caption>Recent Order</caption>
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    )
}

export default HomeDashboard