import { TiArrowBackOutline } from 'react-icons/ti';
import { FiArrowUpRight } from 'react-icons/fi';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { ChangeEvent, useState , useEffect } from 'react';
import { GiFlyingFlag } from 'react-icons/gi'
import { IoCloseCircle, IoCaretUp, IoCaretDown } from 'react-icons/io5'
import { getAdminWeeklyfromquestionid } from '../../../../service/admin';
import Moment from 'moment';

const ContentUser = ({currentpage,CurrentWeeklyID,setContentPage}) =>{
    const [guModal, setGuModal] = useState(false);
    const [data, setData] = useState([]);

    const handleDeleteClick = async () => {
        setGuModal(false)
        setContentPage(false)
    }

    useEffect(() => {
        loadInfoOfWeekly(CurrentWeeklyID);
    }, []);

    async function loadInfoOfWeekly(CurrentWeeklyID) {
        const res = await getAdminWeeklyfromquestionid(CurrentWeeklyID);
        setData(res[0])
        // setIsLoading(isLoading.splice(isLoading.indexOf(3), 1))
    }

    return ( 
        <div className='container-fluid'>
            <div className='row g-3 my-2'>
                <span className='pt-2 f-lg fw-600'><button type="submit" className="btnsubmit-viewdetail" onClick={() => {setContentPage(false)}} style={{ width: '60px' }}><TiArrowBackOutline className="f-lg"/></button><span className='p-2'> {currentpage}</span></span>  
                <div className="d-flex bd-highlight example-parent border border-warning bg-body rounded p-3" style={{ height: '600px' }}>  
                    <Container>
                        <Row>
                            <Col xs={12} md={12} >
                            <div className="p-2 flex-fill bd-highlight text-left">
                                <div className='pb-4 pt-4'>
                                    <div className='fw-400 f-md color-gray3'>
                                        Name Question
                                    </div>
                                    <div className='fw-400 f-md color-black'>
                                        {data.QuestionName}
                                    </div>
                                </div>
                                <div className='pb-4'>
                                    <div className='fw-400 f-md color-gray3'>
                                        Description Question
                                    </div>
                                    <div className='fw-400 f-md color-black'>
                                        {data.QuestionDescription}
                                    </div>
                                </div>
                                <div className='pb-4'>
                                    <div className='fw-400 f-md color-gray3'>
                                        Difficulty
                                    </div>
                                    <div className='fw-400 f-md color-black'>
                                        {data.Difficulty}
                                    </div>
                                </div>
                                <div className='pb-4'>
                                    <div className='fw-400 f-md color-gray3'>
                                        Point
                                    </div>
                                    <div className='fw-400 f-md color-black'>
                                        {data.Point}
                                    </div>
                                </div>
                                <div className='pb-4 d-none d-md-block'>
                                    <div className='fw-400 f-md color-gray3'>
                                        Hint
                                    </div>
                                    <div className='fw-400 f-md color-black'>
                                        {data.Hint}
                                    </div>
                                </div>
                                <div className='pb-4 d-none d-md-block'>
                                    <div className='fw-400 f-md color-gray3'>
                                        Status
                                    </div>
                                    <div className='fw-400 f-md color-black'>
                                        {data.Status}
                                    </div>
                                </div>
                                <div className='pt-4 text-end'>
                                    <button type="submit" className="btnsubmit-accept" onClick={() => setGuModal(true)} style={{ width: '120px' }}><FiArrowUpRight className="f-md"/>Accept</button>
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
                            Are you sure you want to accept ?
                        </span>
                    </div>
                    <div className="tu-modal-body">
                        <p>If you accept this question ID : {data.QuestionID}, The Students can complete this question on a weekly topic and will complete it until the due date.</p>
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