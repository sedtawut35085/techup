import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

import { getTopicfromProfessor } from '../../service/topic.js';
import { getAllSubmissionWithoutPagination } from '../../service/submission.js';

import { FaChevronLeft} from 'react-icons/fa';
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'

import SelectPicker2 from '../../components/picker_select/selectPicker2.js'
import BackgroundIcon from '../../components/background/bgIcons.js';

function SubmitProf() {

    const [isLoading, setIsLoading] = useState(true);
    const [isLoading1, setIsLoading1] = useState(true);
    
    const statusAll = [
        {label: "Checked", data: "Checked"},
        {label: "UnChecked", data: "UnChecked"}
    ]
    const [status, setStatus] = useState({label: "", data: ""});

    const [allTopic, setAllTopic] = useState();
    const [topic, setTopic] = useState({label: "", data: ""});
    const [allSubmission, setAllSubmission] = useState([]);
    const [allSubmissionSearch, setAllSubmissionSearch] = useState([]);
    const [search, setSearch] = useState("");

    async function getTopics() {
        let res = await getTopicfromProfessor();

        let arrayFilterTopic = []
        res.forEach(topic => {
            let object = {label: topic.ShortName.toUpperCase(), data: topic.ShortName.toUpperCase()}
            arrayFilterTopic.push(object);
        });

        setAllTopic(arrayFilterTopic);
        setIsLoading(false)
    }

    async function loadAllSubmissionFromProfessorID() {
        let res = await getAllSubmissionWithoutPagination();
        setAllSubmission(res);
        setAllSubmissionSearch(res);
        setIsLoading1(false)
    }

    function filterTopic(filter) {
        setTopic(filter);
        resultData(filter, status, search)

    }

    function filterStatus(filter) {
        setStatus(filter);
        resultData(topic, filter, search)
    }

    function filterSearch(text) {
        setSearch(text)
        resultData(topic, status, text)
    }

    function resultData(topicFilter, statusFilter, textSearch) {
        let array = [...allSubmission];
        if (topicFilter.data !== "") {
            array = array.filter(submission => submission.ShortName.toUpperCase() === topicFilter.data.toUpperCase())
        }
        if (statusFilter.data !== "") {
            array = array.filter(submission => submission.Status.toUpperCase() === statusFilter.data.toUpperCase())
        }
        if (textSearch !== "") {
            array = array.filter(submission => (
                (submission.FirstName + " " + submission.SurName).toLowerCase().includes(textSearch) ||
                submission.QuestionName_Submissions.toLowerCase().includes(textSearch) ||
                submission.TopicName.toLowerCase().includes(textSearch)
            ))
        }

        setAllSubmissionSearch(array)
    }

    useEffect( () => {
        getTopics()
        loadAllSubmissionFromProfessorID()
    }, []);

    return (
        <div className="all-submission-page">
            <div className="cover-container">
                {
                    (isLoading || isLoading1) && 
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }
                {
                    !(isLoading || isLoading1) && 
                    <>
                    <Link className="btn-back" to="/professor" data-aos="fade-right" data-aos-duration="1000">
                        <FaChevronLeft />
                    </Link>
                    <div className="body" data-aos="fade-up" data-aos-duration="1000">         
                        <span className="f-xl fw-700">All Submissions</span>
                        <div className="filter">
                            <SelectPicker2
                                id='status'
                                placeholder="Status"
                                data={statusAll}
                                defaultValue={status}
                                setValue={filterStatus}
                            />
                            <SelectPicker2
                                id='topic'
                                placeholder="Topic"
                                data={allTopic}
                                defaultValue={topic}
                                setValue={filterTopic}
                            />
                            <div className="search-box">
                                <FiSearch size={24} className="me-1" />
                                <input 
                                    placeholder="Username, Question name..."
                                    onChange={(e) => filterSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="all-submission-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="title">Username</th>
                                        <th className="topic-question">Topic - Question</th>
                                        <th className="status">Status</th>
                                        <th className="due-date">Due Date</th>
                                        <th className="date-submission">Date Submission</th>
                                        <th className="action">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allSubmissionSearch.map((submission, key) => (
                                        <tr key={key}>
                                            <td className="title">{submission.FirstName} {submission.SurName}</td>
                                            <td className="topic-question thai">{submission.ShortName.toUpperCase()} - {submission.QuestionName_Submissions}</td>
                                            {
                                                submission.Status === "Checked"
                                                ? <td className="status color-3">{submission.Status}</td>
                                                : <td className="status color-1">{submission.Status}</td>
                                            }                                        
                                            <td className="due-date">{Moment(submission.DueDate_Submissions).format("DD-MM-YYYY")}</td>
                                            <td className="date-submission">{Moment(submission.DateSubmit).format("DD-MM-YYYY")}</td>
                                            <td className="action">
                                                <Link to={`/professor/${submission.TopicID}/question/${submission.QuestionID_Submissions}/submission/${submission.SubmissionID}`} className="btn-view-detail">
                                                    View Detail
                                                </Link>
                                            </td>
                                        </tr>
                                        ))
                                    }
                                </tbody>
                            </table>                                                     
                        </div>
                        {/* <div className="pagination1">
                            <div className="display-per-page">
                                <span>Display per page</span>
                                <select className="page">
                                    <option default>5</option>
                                    <option>10</option>
                                    <option>25</option>
                                </select>
                            </div>
                            <div className="pagination-number">
                                <span className="arrow disable"><FiChevronsLeft /></span>
                                <span className="arrow disable"><FiChevronLeft /></span>
                                <span className="number active">1</span>
                                <span className="number">2</span>
                                <span className="number">3</span>
                                <span className="number">4</span>
                                <span className="number">5</span>
                                <span className="arrow"><FiChevronRight /></span>
                                <span className="arrow"><FiChevronsRight /></span>
                            </div>
                        </div>                 */}
                    </div>
                    </>
                }                
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default SubmitProf;