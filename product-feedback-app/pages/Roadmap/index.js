import React, { useState, createContext, useContext, } from 'react'
import styles from './index.module.css'
import FeedbackStatus from '../../components/FeedbackStatus';
import { useRouter } from 'next/router';
import AddFeedbackButton from '../../components/AddFeedbackButton'
import { getFeedbackByStatus } from '../../apis/feedback';
import { useQuery } from 'react-query'
import { displayCategoryName } from '../../utils/feedbackConstants';

const RoadmapContext = createContext()
export default function index() {
    const { status, data = {} } = useQuery('roadmap', () => getFeedbackByStatus())

    const { planned = [], inProgress = [], live = [] } = data

  
    const context = {
        planned:planned,
        inProgress:inProgress,
        live:live
    }
    return (
        <RoadmapContext.Provider value={context}>
            <div className='container-fluid pt-5 pb-5'>
                <TopBar />
                <StatusBarNav />
                <div className='container-fluid'><StatusList /></div>
            </div>
        </RoadmapContext.Provider>
    )
}

function TopBar() {
    const router = useRouter()
    return (

        <div className='card mb-2 ms-3' style={{ color: 'white', backgroundColor: '#373F68', height: '5rem' }}>
            <div className='container-fluid'>
                <div className='row '>
                    <div className='col-5' style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                        <span style={{ marginTop: '5px', display: 'flex', flexDirection: 'column' }}>
                            <div onClick={() => router.back()} style={{ cursor: 'pointer' }}>
                                <svg style={{ marginTop: '5%' }} width="10" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L2 5l4-4" stroke="white" stroke-width="2" fill="none" fillRule="evenodd" /></svg>
                                <span style={{ fontSize: '16px', marginTop: '5px' }}> Go Back</span>
                            </div>
                            <h5>Roadmap</h5>
                        </span>
                    </div>
                    <div className='col-7 text-end postion-relative pt-2'><AddFeedbackButton onClick={() => router.push('/NewFeedBack')} /></div>
                </div>
            </div>
        </div>
    )
}

function StatusBarNav() {
    const [selectedIndex, setSelectedIndex] = useState()

    const PLANNED_STATE = 0;
    const IN_PROGRESS_STATE = 1;
    const LIVE_STATE = 2;
    const {planned = [],inProgress = [],live = []} = useContext(RoadmapContext)

    return (
        <nav id="navbar-example2 " className="navbar navbar-light container-fluid">
            <ul className="nav nav-pills d-flex flex-row w-100 text-start">
                <li onClick={() => setSelectedIndex(PLANNED_STATE)}
                    className={`nav-item flex-fill ${selectedIndex === PLANNED_STATE ? styles.active : ''} ${selectedIndex === PLANNED_STATE ? styles.active_planned : ''}`}
                    href="#scrollspyHeading1"
                >
                    <a className="nav-link " href="#scrollspyHeading1">
                        <h5 className={`${styles.status_headers}`}>Planned ({planned.length})</h5>
                        <p className={`${styles.status_description} d-none d-md-block`}>Ideas prioritized for research</p>
                    </a>

                </li>
                <li onClick={() => setSelectedIndex(IN_PROGRESS_STATE)}
                    className={`nav-item flex-fill ${selectedIndex === IN_PROGRESS_STATE ? styles.active : ''} ${selectedIndex === IN_PROGRESS_STATE ? styles.active_progress : ''}`} >
                    <a className="nav-link" href="#scrollspyHeading2">
                        <h5 className={`${styles.status_headers} `}>In-Progress ({inProgress.length})</h5>
                        <p className={`${styles.status_description} d-none d-md-block`}>Currently being developed</p>
                    </a>
                </li>
                <li onClick={() => setSelectedIndex(LIVE_STATE)}
                    className={`nav-item flex-fill ${selectedIndex === LIVE_STATE ? styles.active : ''} ${selectedIndex === LIVE_STATE ? styles.active_live : ''}`}>
                    <a className="nav-link" href="#scrollspyHeading3">
                        <h5 className={`${styles.status_headers} `}>Live ({live.length})</h5>
                        <p className={`${styles.status_description} d-none d-md-block`}>Released features</p>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

function StatusList() {
    const {planned,inProgress,live} = useContext(RoadmapContext)
    return (
        <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" className="scrollspy-example row overflow-scroll position-relative d-flex flex-row flex-nowrap" tabindex="0">
            <div className={`${styles.listStatusStyles}`} id="scrollspyHeading1" >
                {
                    planned.map((feedback, i) => {
                        const { title, description, category, upvotes, comments } = feedback
                        return (
                            <div className='card mt-2 p-3' style={{ borderTopStyle: 'solid', borderTopColor: '#F49F85', borderTopWidth: 8 }}>
                                <div><FeedbackStatus status={'planned'} /></div>
                                <h5 className='mt-3'>{title}</h5>
                                <p>{description}</p>
                                <Category category={category} />
                                <UpvotesComments upvotes={upvotes} comments={comments} />

                            </div>
                        )
                    })
                }
            </div>
            <div className={`${styles.listStatusStyles}`} id="scrollspyHeading2" >
                {
                    inProgress.map((feedback, i) => {
                        const { title, description, category, upvotes, comments } = feedback

                        return (
                            <div className='card mt-2 p-3' style={{ borderTopStyle: 'solid', borderTopColor: '#AD1FEA', borderTopWidth: 8 }}>
                                <div><FeedbackStatus status={'in-progress'} /></div>
                                <h5 className='mt-3'>{title}</h5>
                                <p>{description}</p>
                                <Category category={category} />
                                <UpvotesComments upvotes={upvotes} comments={comments} />
                            </div>
                        )
                    })
                }
            </div>
            <div className={`${styles.listStatusStyles}`} id="scrollspyHeading3" >
                {
                    live.map((feedback, i) => {
                        const { title, description, category, upvotes, comments } = feedback

                        return (
                            <div className='card mt-2 p-3' style={{ borderTopStyle: 'solid', borderTopColor: '#62BCFA', borderTopWidth: 8 }}>
                                <div> <FeedbackStatus status={'live'} /></div>
                                <h5 className='mt-3'>{title}</h5>
                                <p>{description}</p>
                                <Category category={category} />
                                <UpvotesComments upvotes={upvotes} comments={comments} />

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

function UpvotesComments({ upvotes, comments }) {
    return (
        <div className='d-flex '>
            <div className='flex-grow-1'><span className=' mt-3 d-inline-block text-center p-2' style={{ backgroundColor: '#F2F4FE', color: '#3A4374', borderRadius: 5, width: '3rem' }}>{upvotes}</span></div>
            <div className='flex-grow-2 '><span className={`d-inline-block position-relative ${styles.comments_icon} top-50`} /><span className='ms-1 pb-4 text-center position-relative top-50'>{comments.length}</span></div>
        </div>
    )
}

function Category({ category }) {
    return <span className={`p-2 ${styles.category_style}`} style={{ backgroundColor: '#F2F4FF', color: '#4661E6', borderRadius: 5, fontWeight: 'bold', textTransform: 'capitalize' }}>{displayCategoryName(category)}</span>

}