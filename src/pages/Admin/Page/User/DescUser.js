import { TiArrowBackOutline } from 'react-icons/ti';
import { AiFillDelete } from 'react-icons/ai';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { ChangeEvent, useState , useEffect } from 'react';
import { GiFlyingFlag } from 'react-icons/gi'
import { IoCloseCircle, IoCaretUp, IoCaretDown } from 'react-icons/io5'
import { getStudent, deleteStudent } from '../../../../service/admin';
import Moment from 'moment';

const ContentUser = ({currentpage,CurrentUser,setContentPage}) =>{
    const [guModal, setGuModal] = useState(false);
    const [userData, setUserData] = useState([]);
    const [contact, setContact] = useState([])

    const handleDeleteClick = async () => {
        await deleteStudent(userData.UserEmail)
        setGuModal(false)
        setContentPage(false)
    }

    useEffect(() => {
        loadInfoOfStudent(CurrentUser);
    }, []);

    async function loadInfoOfStudent(CurrentUser) {
        const res = await getStudent(CurrentUser);
        setUserData(res[0])
        setContact(JSON.parse(res[0].Website))
        // setIsLoading(isLoading.splice(isLoading.indexOf(3), 1))
    }

    return ( 
        <div className='container-fluid'>
            <div className='row g-3 my-2'>
                <span className='pt-2 f-lg fw-600'><button type="submit" className="btnsubmit-viewdetail" onClick={() => {setContentPage(false)}} style={{ width: '60px' }}><TiArrowBackOutline className="f-lg"/></button><span className='p-2'> {currentpage}</span></span>  
                <div className="d-flex bd-highlight example-parent border border-warning bg-body rounded p-3" style={{ height: '550px' }}>  
                    <Container>
                        <Row>
                            <Col xs={6} md={4} >
                            <div className="p-2 flex-fill bd-highlight text-left">
                                <span className='f-md fw-600'>Basic Information</span>
                                <div className='pb-4 pt-4'>
                                    <div className='fw-400 f-md color-gray3'>
                                        Student - ID 
                                    </div>
                                    <div className='fw-400 f-md color-black'>
                                        {userData.StudentID}
                                    </div>
                                </div>
                                <div className='pb-4'>
                                    <div className='fw-400 f-md color-gray3'>
                                        Name
                                    </div>
                                    <div className='fw-400 f-md color-black'>
                                        {userData.FirstName + " " + userData.SurName}
                                    </div>
                                </div>
                                <div className='pb-4'>
                                    <div className='fw-400 f-md color-gray3'>
                                        Gender
                                    </div>
                                    <div className='fw-400 f-md color-black'>
                                        {userData.Gender}
                                    </div>
                                </div>
                                <span className='f-md fw-600'>Account Information</span>
                                <div className='pb-4 pt-4 '>
                                    <div className='fw-400 f-md color-gray3'>
                                        TechUp ID 
                                    </div>
                                    <div className='fw-400 f-md color-black'>
                                        {userData.TechUpID}
                                    </div>
                                </div>
                                <div className='pb-4 d-none d-md-block'>
                                    <div className='fw-400 f-md color-gray3'>
                                        Email
                                    </div>
                                    <div className='fw-400 f-md color-black'>
                                        {userData.UserEmail}
                                    </div>
                                </div>
                            </div>
                            </Col>
                            <Col xs={6} md={4}>
                            <div className="p-2 flex-fill bd-highlight text-left">
                                <div className='pb-4 pt-4 mt-4'>
                                    <div className='fw-400 f-md color-gray3'>
                                        Birthday
                                    </div>
                                    <div className='fw-400 f-md color-black'>
                                        {Moment(userData.Birthday).format('YYYY-MM-DD')}
                                    </div>
                                </div>
                                <div className='pb-4 d-none d-md-block'>
                                    <div className='fw-400 f-md color-gray3'>
                                        Location
                                    </div>
                                    <div className='fw-400 f-md color-black'>
                                    {
                                        userData.Location === undefined
                                        ?   "-"
                                        :   userData.Location
                                    } 
                                    </div>
                                </div>
                                <div className='pb-4 d-none d-md-block'>
                                    <div className='fw-400 f-md color-gray3'>
                                        Email Contact 
                                    </div>
                                    <div className='fw-400 f-md color-black'>
                                    {
                                        contact.Email === undefined
                                        ?   "-"
                                        :   contact.Email
                                    }    
                                    </div>
                                </div>
                                <span className='f-md fw-600'>Other Information</span>
                                <div className='pb-4 pt-4'>
                                    <div className='fw-400 f-md color-gray3'>
                                        Point
                                    </div>
                                    <div className='fw-400 f-md color-black'>
                                        {userData.Point}
                                    </div>
                                </div>
                                <div className='pt-4 d-block d-md-none'>
                                    <button type="submit" className="btnsubmit-delete" onClick={() => setGuModal(true)} style={{ width: '120px' }}><AiFillDelete className="f-md"/>Delete</button>
                                </div>
                            </div>
                            </Col>
                            <Col xs={6} md={4}>
                            <div className="p-2 flex-fill bd-highlight text-left d-none d-md-block">
                                <div className='pb-4 pt-4 mt-4'>
                                    <div className='fw-400 f-md color-gray3 pb-4'>
                                        Photo
                                    </div>
                                    <div className='fw-400 f-md color-black'>
                                        <img className='img-fluid rounded-circle' style={{ width: '280px' }} src="https://techup-file-upload-storage.s3.ap-southeast-1.amazonaws.com/data/2023-03-11T02%3A43%3A08.735Z.jpeg"></img>
                                    </div>
                                </div>
                                <div className='pt-4'>
                                    <button type="submit" className="btnsubmit-delete" onClick={() => setGuModal(true)} style={{ width: '120px' }}><AiFillDelete className="f-md"/>Delete</button>
                                </div>
                            </div>
                            </Col>
                        </Row>
                    </Container>  
                </div>
            </div>
            <div className="tu-modal" style={guModal ? {opacity: "1", visibility: "visible"} : {}}>
                <div className="tu-modal-card">
                    <IoCloseCircle className="close-button" onClick={() => setGuModal(false)} />
                    <div className="tu-modal-head">
                        <GiFlyingFlag className="icon" />
                        <span>
                            Are you sure you want to delete ?
                        </span>
                    </div>
                    <div className="tu-modal-body">
                        <p>If you delete this student ID : {userData.UserEmail}, The student's account will be lost and all data will be deleted.</p>
                    </div>
                    <div className="tu-modal-footer pt-2">
                        <div className="cancel-button" onClick={() => setGuModal(false)}>No, keep it.</div>
                        <div className="accept-button" onClick={handleDeleteClick}>Yes, I want to delete.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentUser