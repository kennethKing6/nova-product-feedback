import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from './index.module.css'
import AddFeedbackButton from '../../components/AddFeedbackButton'
import { displayCategoryName } from '../../utils/feedbackConstants'
import * as FeedbackConstants from '../../utils/feedbackConstants'
import { deleteFeedback, updateFeedback } from '../../apis/feedback'

export default function index() {
    const router = useRouter()
    const { title, category, status, description,_id } = router.query
    const [newStatus,setNewStatus] = useState(status)
    const [newCategory,setNewCategory] = useState(parseInt(category))
    const [newTitle,setNewTitle] = useState(title)
    const [newDescription,setNewDescription] = useState(description)



    return (
        <form className='container  mt-5' style={{ backgroundColor: '#F2F4FF', width: '50%' }}>
            <p onClick={() => router.back()} style={{ width: 'fit-content', cursor: 'pointer' }}><span className={`d-inline-block ${styles.back_icon}`}></span>Go back</p>
            <div className='d-flex justify-content-center align-items-center flex-column w-100 ps-5' style={{ backgroundColor: 'white' }}>
                <h3 className='text-start  w-100 pt-3'>Editing a dark theme option</h3>
                <div className='text-start  w-100 mt-5'>
                    <h5 >Feedback Title</h5>
                    <p style={{ color: '#647196' }}>Add a short, descriptive headline</p>
                    <input type={'text'} className='p-3 w-75' style={{ backgroundColor: '#F7F8FD', color: '#3A4374', borderStyle: 'none', borderRadius: 5 }} 
                        value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}/>
                </div>
                <div className='text-start  w-100 mt-5'>
                    <h5>Category</h5>
                    <p style={{ color: '#647196' }}>Choose a category for your feedback</p>
                    <div class="dropdown">
                        <input className="form-control p-3 w-75 " 
                            data-bs-toggle="dropdown" aria-expanded="false"
                            value={displayCategoryName(newCategory)}
                            type="button"
                            
                            style={{ backgroundColor: '#F7F8FD', color: '#3A4374', borderStyle: 'none', borderRadius: 5,textAlign:'start' }}  />
                        <ul class="dropdown-menu w-75">
                            <li><a class="dropdown-item " onClick={()=>setNewCategory(FeedbackConstants.FEATURE)} style={{ backgroundColor: 'white' }}>Feature</a></li>
                            <li><a class="dropdown-item" onClick={()=>setNewCategory(FeedbackConstants.UI)}>UI</a></li>
                            <li><a class="dropdown-item" onClick={()=>setNewCategory(FeedbackConstants.UX)}>UX</a></li>
                            <li><a class="dropdown-item" onClick={()=>setNewCategory(FeedbackConstants.ENHANCEMENT)}>Enhancement</a></li>
                            <li><a class="dropdown-item" onClick={()=>setNewCategory(FeedbackConstants.BUG)}>Bug</a></li>
                        </ul>
                    </div>
                </div>
                <div className='text-start  w-100 mt-5'>
                    <h5>Update Status</h5>
                    <p style={{ color: '#647196' }}>Choose a category for your feedback</p>
                    <div class="dropdown">
                        <input className="form-control p-3 w-75  dropdown-toggle" list="datalistOptions" id="exampleDataList" placeholder="Planned"
                            data-bs-toggle="dropdown" aria-expanded="false"
                            type={"button"}
                            style={{ backgroundColor: '#F7F8FD',textTransform:'capitalize', color: '#3A4374', borderStyle: 'none', borderRadius: 5,textAlign:'start' }} value={newStatus} />
                        <ul class="dropdown-menu w-75">
                            <li><a class="dropdown-item " style={{ backgroundColor: 'white' }} onClick={()=>setNewStatus('planned')}>Planned</a></li>
                            <li><a class="dropdown-item" onClick={()=>setNewStatus('in-progress')}>In-Progress</a></li>
                            <li><a class="dropdown-item" onClick={()=>setNewStatus('live')}>Live</a></li>
                        </ul>
                    </div>
                </div>
                <div className='text-start  w-100 mt-5'>
                    <h5>Feedback Detail</h5>
                    <p style={{ color: '#647196' }}>Include any specific comments on what should be improved, added, etc.</p>
                    <textarea className="form-control  w-75 mb-5" id="exampleFormControlTextarea1" rows="7"
                        value={newDescription}
                         onChange={(e)=>setNewDescription(e.target.value)}
                        style={{ backgroundColor: '#F7F8FD', color: '#3A4374', borderStyle: 'none', borderRadius: 5 }}></textarea>
                </div>
                <div className='row' style={{ width: '100%', }}>
                    <button onClick={async () => {
                        try{
                            await deleteFeedback(_id)
                            router.push('/')
                        }catch(err){
                            alert('Failed to delete feedback')
                        }
                    }} type="button" className=" col-2 btn btn-primary btn-lg align-self-start " style={{ width: '100%', color: '#F2F4FE', height: '3rem', fontSize: '1rem', maxWidth: '10rem', backgroundColor: '#D73737', borderStyle: 'none' }}>Delete</button>

                    <div className='col-10 d-flex flex-row w-75 mb-5 justify-content-end'>
                        <button onClick={() => router.back()} type="button" className="btn btn-primary btn-lg   ms-2" style={{ width: '100%', height: '3rem', fontSize: '1rem', maxWidth: '10rem', backgroundColor: '#656EA3', borderStyle: 'none' }}>Cancel</button>
                        <AddFeedbackButton className=" btn btn-primary btn-lg  ms-2 me-5"
                         style={{ width: '100%', height: '3rem', fontSize: '1rem', maxWidth: '10rem', backgroundColor: '#AD1FEA', borderStyle: 'none' }} 
                         onClick={async ()=>{
                            try{
                                await updateFeedback(_id,newTitle,newDescription,newCategory,newStatus)
                                router.push('/')
                            }catch(err){
                                alert('Failed to update feedback')
                            }
                         }}/>
                    </div>
                </div>
            </div>
        </form>
    )
}


