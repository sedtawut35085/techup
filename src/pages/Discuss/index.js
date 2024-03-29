import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

import { defaultProfileImg } from '../../assets/js/helper'
import { getEachDiscuss , getDiscussInTrend ,getDiscussNewest ,getDiscussMostVote, getComment } from '../../service/discuss.js';

import { TbMessage2 } from 'react-icons/tb'
import { IoCaretUp, IoCloseCircle } from 'react-icons/io5'
import { HiFire, HiOutlinePencilAlt, HiOutlineEye } from 'react-icons/hi';
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

import BackgroundIcon from '../../components/background/bgIcons.js';

function Discuss() {

    const [isLoading, setIsLoading] = useState(true)
    const [discusses, setDiscusses] = useState([])
    const [discussesSearch, setDiscussesSearch] = useState([])
    const [allTags, setAllTags] = useState()

    const [sortBy , setSortBy] = useState("trend")
    const [searchDiscuss, setSearchDiscuss] = useState("")
    const [searchTags, setSearchTags] = useState("")

    async function loadInTrendDiscuss() {
        const res = await getDiscussInTrend();     

        for (let discuss of res) {
            let resComment = await getComment(discuss.DiscussID)
            discuss.Comment = resComment.length
        }

        res.sort((a, b) => (a.Comment < b.Comment) ? 1 : -1)

        setDiscusses(res);
        setDiscussesSearch(res);

        let tags = [];
        for(let i=0; i < res.length; i++) {
            let tag = JSON.parse(res[i].Tags)
            tags = tags.concat(tag);
        }

        let object = {}
        tags.forEach(tag => {
            object[tag] = (object[tag] || 0) + 1;
        })

        setAllTags(object)
        setIsLoading(false)
    }

    function sortDiscuss(type) {
        setSortBy(type)
        if (type === "newest") {
            setDiscussesSearch(discussesSearch.sort((a, b) => (Moment(b.Date).diff(Moment(a.Date)))))
        }
        if (type === "oldest") {
            setDiscussesSearch(discussesSearch.sort((a, b) => (Moment(a.Date).diff(Moment(b.Date)))))
        }
        if (type === "trend") {
            setDiscussesSearch(discussesSearch.sort((a, b) => (a.Comment < b.Comment) ? 1 : -1))
        }
    }

    function searchTitleDiscuss(text) {
        setSearchDiscuss(text)
        const res = discusses.filter((discuss) => (discuss.Title.toLowerCase()).includes(text.toLowerCase()))
        setDiscussesSearch(res);
    }

    function searchTagDiscuss(text) {
        setSearchTags(text);
        const res = discusses.filter((discuss) => (discuss.Tags.toLowerCase()).includes(text.toLowerCase()))
        setDiscussesSearch(res);
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
                            <div data-aos="fade-up" data-aos-duration="1000" className="top-section">
                                <div className="sorting">
                                    <span className={`sort-select ${sortBy === 'trend' ? 'active' : ''}`} onClick={() => sortDiscuss('trend')}><HiFire size={24} /> In trend</span>
                                    <span className={`sort-select ${sortBy === 'newest' ? 'active' : ''}`} onClick={() => sortDiscuss('newest')}>Newest</span>
                                    <span className={`sort-select ${sortBy === 'oldest' ? 'active' : ''}`} onClick={() => sortDiscuss('oldest')}>Oldest</span>
                                    {/* <span className={`sort-select ${sortBy === 'vote' ? 'active' : ''}`} onClick={() => setSortBy('vote')}>Most Votes</span> */}
                                </div>
                                <div className="right-side">
                                    <div className="search-box">
                                        <FiSearch size={24} className="me-1" />
                                        <input 
                                            value={searchDiscuss}
                                            placeholder="Search discuss title..."
                                            onChange={(e) => searchTitleDiscuss(e.target.value)}
                                        />
                                    </div>
                                    <Link to="add" className='btn-2-edit'>
                                        <span>New</span>
                                        <HiOutlinePencilAlt size={20} className="ms-1"/>
                                    </Link>
                                </div>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                                <div className="discuss-card-wrap">
                                    {
                                        (discussesSearch.length < 1) &&
                                        <div className="d-flex jc-center py-4 color-gray2 f-lg">No result.</div>
                                    }
                                    {
                                        discussesSearch.map((discuss, key) => (
                                            <Link className="discuss-card" key={key} to={`/discuss/${discuss.DiscussID}`}>
                                                <div className="left-side">
                                                {/* <div className="left-side col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12"> */}
                                                    <div className='image-frame'>
                                                        <img alt="Avatar" onError={defaultProfileImg} className="author-image" src={discuss.UserImage}></img>
                                                    </div>
                                                    <div className="discuss-info">
                                                        <p className="f-md m-0 thai fw-500">{discuss.Title}</p>
                                                        <div className="tags">
                                                        {
                                                            JSON.parse(discuss.Tags).map((tag, key) => 
                                                                <span className="" key={key}>#{tag}</span>
                                                            )
                                                        }
                                                        </div>
                                                        <p className="f-xs color-gray2 m-0">{discuss.Name} created at: {Moment(discuss.Date).format('MMM DD, YYYY - H:mm')}</p>
                                                    </div>
                                                </div>
                                                <div className="right-side">
                                                {/* <div className="right-side col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 justify-content-xl-end justify-content-lg-end justify-content-md-center justify-content-sm-center justify-content-center"> */}
                                                    <span className="d-flex ai-center color-gray2"><IoCaretUp className="me-1" size={24} />{discuss.AmountLike}</span>
                                                    <span className="d-flex ai-center color-gray2"><TbMessage2 className="me-1" size={24} />{discuss.Comment}</span>
                                                    {/* <span className="d-flex ai-center color-gray2"><HiOutlineEye className="me-1" size={24} />{discuss.View}</span> */}
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                                {/* <div className="pagination1">         
                                    <div className="display-per-page">
                                        <span>Display per page</span>
                                        <select defaultValue="5" className="page">
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                        </select>
                                    </div>           
                                    <div className="pagination-number">
                                        <button className="arrow disable"><FiChevronsLeft /></button>
                                        <button className="arrow disable"><FiChevronLeft /></button>
                                        <button className="number active">1</button>
                                        <button className="number">2</button>
                                        <button className="number">3</button>
                                        <button className="number">4</button>
                                        <button className="number">5</button>
                                        <button className="arrow"><FiChevronRight /></button>
                                        <button className="arrow"><FiChevronsRight /></button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="tags-search">
                            <span className="f-md">Tags</span>
                            <div className="search-box my-3">
                                <FiSearch size={24} className="me-1" />
                                <input 
                                    value={searchTags}
                                    placeholder="#intern, #fullstack"
                                    onChange={(e) => searchTagDiscuss(e.target.value)}
                                />
                                <IoCloseCircle size={24} className="color-5" onClick={() => searchTagDiscuss("")} />
                            </div>
                            <div className="all-tags">
                                {
                                    Object.entries(allTags).sort(([,a],[,b]) => b-a).map(([key, value], index) => (
                                        <div key={index} className="tag thai" onClick={() => searchTagDiscuss(`${key}`)}>
                                            <span>#{key}</span>
                                            <span>{value}</span>
                                        </div>
                                    ))
                                }                             
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