import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BackgroundIcon from '../../components/background/bgIcons.js';

import { FaChevronLeft } from 'react-icons/fa';
import { TbMessageCircle, TbSend } from 'react-icons/tb'
import { IoClose } from 'react-icons/io5'

function AddDiscuss() {

    const [errors, setErrors] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([]);

    function addTag(event) {
        console.log('addtag')
        let newTag = event.target.value.trim()

        if ( event.keyCode === 13 || event.keyCode == 32 ) {

            if (newTag[0] !== '#') {
                newTag = '#' + newTag

                if ((newTag.length !== 1) && (tags.indexOf(newTag) === -1)){
                    let array = [...tags]
                    array.push(newTag)
                    setTags(array) 
                } else {
                    setTag('')
                }
            }       
            setTag('')
        } else if ( (event.keyCode === 8) && (newTag.length === 0) ) {
            removeTag(tags.length - 1)
        }
    }

    function removeTag(tagIndex) {
        console.log('remove tag ', tagIndex)
        let array = [...tags];
        array.splice(tagIndex, 1);
        setTags(array)
    }


    function handleSubmit(event) {

        event.preventDefault();

    }

    return (
        <div className="add-discuss-page">
            <div className="cover-container">
                <Link data-aos="fade-right" data-aos-duration="1000" className="btn-back" to="/discuss">
                    <FaChevronLeft />
                </Link>
                <h1 className="f-xl fw-700 d-flex ai-center">Ask a Public Question<TbMessageCircle className="color-1 ms-2" size={48} /></h1>
                <form className="add-discuss-form mt-4" onSubmit={handleSubmit}>
                    <div className="col-12 pt-4">
                        <label className="f-lg pb-2" htmlFor="title">Title<span className="color-5">*</span></label>
                        <input
                            type="text" 
                            name="title" 
                            id="title" 
                            className="input-box thai"
                            placeholder="What is Full stack, Front-end, Back-end Develper?"
                            maxLength="100"
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        {errors.includes("title") && (<label className="f-xs color-5 pt-2" htmlFor="techup-id">Please enter title of discuss</label>)}
                    </div>
                    <div className="col-12 pt-4">
                        <label className="f-lg pb-2" htmlFor="description">Description<span className="color-5">*</span></label>
                            <textarea
                                name="description" 
                                id="description"
                                className="input-textareabox" 
                                placeholder="Detail about title discuss..." 
                                onChange={(e) => setDescription(e.target.value)} 
                            />
                        {errors.includes("title") && (<label className="f-xs color-5 pt-2" htmlFor="techup-id">Please enter your Techup ID</label>)}
                    </div>
                    <div className="col-12 pt-4">
                        <label className="f-lg pb-2" htmlFor="tags">Tags</label>
                        <div className="input-tags"> 
                            {
                                tags?.map((tag, key) => (
                                    <span className="tag" key={key}>{tag}<IoClose className="close" onClick={() => removeTag(key)}/></span>
                                ))
                            }
                            <input 
                                id="tags"
                                name="tags"
                                onKeyUp={(event) => addTag(event)}
                                onChange={(event) => setTag(event.target.value)}
                                value={tag}
                            />
                        </div>
                    </div>
                    <div className="divider my-5"></div>
                    <div className="col-12 d-flex jc-center">
                        <Link className='btn-02' to='/discuss'>
                            <span>Cancel</span>
                        </Link>
                        <button type="submit" className="btn-01">Post<TbSend className="ms-2" size={22} /></button>
                    </div>
                </form>
            </div>
            <div className="background-container"></div>
            <BackgroundIcon />
        </div>
    )
}

export default AddDiscuss