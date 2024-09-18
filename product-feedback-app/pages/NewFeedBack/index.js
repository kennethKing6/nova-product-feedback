import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from './index.module.css'
import AddFeedbackButton from '../../components/AddFeedbackButton'
import * as feedbackConstants from '../../utils/feedbackConstants'
import {displayCategoryName} from '../../utils/feedbackConstants'

import { createFeedback } from '../../apis/feedback'
export default function index() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState(feedbackConstants.FEATURE)
    const router = useRouter()


    return (
        <div className='container  mt-5' style={{ backgroundColor: '#F2F4FF', width: '50%' }}>
            <p onClick={() => router.back()} style={{ width: 'fit-content', cursor: 'pointer' }}><span className={`d-inline-block ${styles.back_icon}`}></span>Go back</p>
            <div className='d-flex justify-content-center align-items-center flex-column w-100 ps-5' style={{ backgroundColor: 'white' }}>
                <h3 className='text-start  w-100 pt-3'>Create New Feedback</h3>
                <div className='text-start  w-100 mt-5'>
                    <h5 >Feedback Title</h5>
                    <p style={{ color: '#647196' }}>Add a short, descriptive headline</p>
                    <input type={'text'} className='p-3 w-75' style={{ backgroundColor: '#F7F8FD', color: '#3A4374', borderStyle: 'none', borderRadius: 5 }}
                        value={`${title}`}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='text-start  w-100 mt-5'>
                    <h5>Category</h5>
                    <p style={{ color: '#647196' }}>Choose a category for your feedback</p>
                    <div class="dropdown">
                        <input className="form-control p-3 w-75  dropdown-toggle" list="datalistOptions" id="exampleDataList" placeholder="Feature"
                            data-bs-toggle="dropdown" aria-expanded="false"
                            value={`${displayCategoryName(category)}`}
                            type='button'
                            style={{ backgroundColor: '#F7F8FD', color: '#3A4374', borderStyle: 'none', borderRadius: 5,textAlign:'start' }} />
                        <ul class="dropdown-menu w-75">
                            <li ><a class="dropdown-item " style={{ backgroundColor: 'white' }} onClick={() => setCategory(feedbackConstants.FEATURE)}>Feature</a></li>
                            <li><a class="dropdown-item" onClick={() => setCategory(feedbackConstants.UI)}>UI</a></li>
                            <li ><a class="dropdown-item" onClick={() => setCategory(feedbackConstants.UX)}>UX</a></li>
                            <li onClick={() => setCategory(feedbackConstants.ENHANCEMENT)}><a class="dropdown-item" >Enhancement</a></li>
                            <li onClick={() => setCategory(feedbackConstants.BUG)}><a class="dropdown-item">Bug</a></li>
                        </ul>
                    </div>
                </div>
                <div className='text-start  w-100 mt-5'>
                    <h5>Feedback Detail</h5>
                    <p style={{ color: '#647196' }}>Include any specific comments on what should be improved, added, etc.</p>
                    <textarea className="form-control  w-75 mb-5" id="exampleFormControlTextarea1" rows="7"
                        value={`${description}`}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ backgroundColor: '#F7F8FD', color: '#3A4374', borderStyle: 'none', borderRadius: 5 }}></textarea>
                </div>
                <div className='d-flex flex-row w-75 align-self-end mb-5'>
                    <button onClick={() => router.back()} type="button" className=" btn btn-primary btn-lg align-self-end " style={{ width: '100%', height: '3rem', fontSize: '1rem', maxWidth: '30rem', backgroundColor: '#656EA3', borderStyle: 'none' }}>Cancel</button>

                    <AddFeedbackButton onClick={async () => {
                        const result = await createFeedback(title, description, category);
                        const { status } = result;
                        if (status === 200) {
                            setTitle('')
                            setDescription('')
                            setCategory(feedbackConstants.FEATURE)
                            alert('New feedback successfully added')
                        }else{
                            alert('Feedback failed to be added')
                        }
                    }} />
                </div>
            </div>
        </div>
    )
}

