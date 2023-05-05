import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

import { IoCaretUp } from 'react-icons/io5'
import { HiFire, HiOutlinePencilAlt, HiOutlineEye } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';

import { getEachDiscuss , getDiscussInTrend ,getDiscussNewest ,getDiscussMostVote } from '../../service/discuss.js';

import BackgroundIcon from '../../components/background/bgIcons.js';

function Discuss() {

    const [isLoading, setIsLoading] = useState(true)
    const [discusses , setDiscusses] = useState([])

    const [sortBy , setSortBy] = useState("trend")
    const [searchDiscuss, setSearchDiscuss] = useState("")
    const [searchTags, setSearchTags] = useState("")

    async function loadInTrendDiscuss() {
        const res = await getDiscussInTrend();
        setDiscusses(res);
        console.log('All discuss :', res)
        setIsLoading(false)
    }

    useEffect(() => {
        loadInTrendDiscuss();
    }, []);

    return (
        <div className="all-discuss-page">
            <div className="cover-container">
                {
                    isLoading &&
                    <div className="loader2">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }  
                {
                    !isLoading &&
                    <div className="body">
                        <div className="all-discuss">
                            <div className="d-flex jc-btw ai-center">
                                <div className="col-6">
                                    <div className=" sorting">
                                        <span className={`sort-select ${sortBy === 'trend' ? 'active' : ''}`} onClick={() => setSortBy('trend')}><HiFire size={24} /> In trend</span>
                                        <span className={`sort-select ${sortBy === 'newest' ? 'active' : ''}`} onClick={() => setSortBy('newest')}>Newest</span>
                                        <span className={`sort-select ${sortBy === 'vote' ? 'active' : ''}`} onClick={() => setSortBy('vote')}>Most Votes</span>
                                    </div>
                                </div>
                                <div className="col-6 d-flex jc-end ai-center">
                                    <div className="me-3">
                                        <div className="search-box">
                                            <FiSearch size={24} className="me-1" />
                                            <input 
                                                value={searchDiscuss}
                                                placeholder="Search discuss title..."
                                                onChange={(e) => setSearchDiscuss(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <Link to="add" className='btn-2-edit'>
                                        <span>New</span>
                                        <HiOutlinePencilAlt size={20} className="ms-1"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="discuss-card-wrap">
                                {
                                    discusses.map((discuss, key) => (
                                        <Link className="discuss-card" key={key} to={`/discuss/${discuss.DiscussID}`}>
                                            <div className="left-side">
                                                <img className="author-image" src={discuss.UserImage}></img>
                                                <div className="discuss-info">
                                                    <p className="f-md m-0 thai fw-500">{discuss.Title}</p>
                                                    <div className="tags">
                                                    {
                                                        JSON.parse(discuss.Tags).map((tag, key) => 
                                                            <span key={key}>#{tag}</span>
                                                        )
                                                    }
                                                    </div>
                                                    <p className="f-xs color-gray2 m-0">{discuss.AuthorName} created at: {Moment(discuss.Date).format('MMMM DD, YYYY - H:mm')}</p>
                                                </div>
                                            </div>
                                            <div className="right-side">
                                                <span className="d-flex ai-center color-gray2"><IoCaretUp className="me-1" size={24} />{discuss.AmountLike}</span>
                                                <span className="d-flex ai-center color-gray2"><HiOutlineEye className="me-1" size={24} />{discuss.View}</span>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="tags-search">
                            <span className="f-md">Tags</span>
                            <div className="search-box my-3">
                                <FiSearch size={24} className="me-1" />
                                <input 
                                    value={searchTags}
                                    placeholder="#intern, #fullstack"
                                    onChange={(e) => setSearchTags(e.target.value)}
                                />
                            </div>
                            <div className="all-tags">
                                <div className="tag" onClick={() => setSearchTags("#interview")}>
                                    <span>#interview</span>
                                    <span>20</span>
                                </div>
                                <div className="tag" onClick={() => setSearchTags("#Coding")}>
                                    <span>#Coding</span>
                                    <span>18</span>
                                </div>
                                <div className="tag" onClick={() => setSearchTags("#TECHUP")}>
                                    <span>#TECHUP</span>
                                    <span>17</span>
                                </div>
                                <div className="tag" onClick={() => setSearchTags("#FullStack")}>
                                    <span>#FullStack</span>
                                    <span>17</span>
                                </div>
                                <div className="tag" onClick={() => setSearchTags("#Internship")}>
                                    <span>#Internship</span>
                                    <span>16</span>
                                </div>                                
                            </div>
                        </div>
                    </div>
                }                 
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    );
}

export default Discuss;