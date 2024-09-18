import React, { useContext, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import styles from './index.module.css'
import IconBurger from '../../assets/shared/mobile/icon-hamburger.svg'
import IconClose from '../../assets/shared/mobile/icon-close.svg'
import { useRouter } from 'next/router'
import FeedbackStatus from '../FeedbackStatus';
import { useQuery } from 'react-query'
import { getFeedbackByStatus } from '../../apis/feedback'
import { FeedbackFiltersConstants, FeedbackFiltersPageContext } from '../../context/FeedbackFiltersContext'

export default function Index({ position }) {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const isTabletOrLaptopOrDesktop = useMediaQuery({ query: '(min-width: 768px)' })

    return (
        <>
            {isTabletOrLaptopOrDesktop ? <TabletOrLaptopOrDesktopNavigation position={position} /> : <MobileNavigation />}
        </>

    )
}
function TabletOrLaptopOrDesktopNavigation({ position }) {
    return (
        <div className={`${styles.parent} ${position} d-flex flex-lg-column flex-row `}>
            <div className={`card p-3 pt-5 ${styles.card_style} ${styles.header_card}`}>
                <h2 className={`${styles.header_card_text}`}>Nova Feedback</h2>
                <p className={`${styles.header_card_text}`}>Feedback Board</p>
            </div>
            <CardList />
        </div>
    )
}
function MobileNavigation() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className={`navbar w-100 ${styles.mobile_nav_parent}`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#" style={{ color: 'white' }}>
                    <h3>Nova Feedback</h3>
                    <p>Feedback Board</p>
                </a>
                {
                    isOpen ? <button style={{ backgroundColor: 'inherit', borderStyle: 'none' }} onClick={() => setIsOpen(!isOpen)} className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                        <svg width="18" height="17" xmlns="http://www.w3.org/2000/svg"><path d="M15.01.368l2.122 2.122-6.01 6.01 6.01 6.01-2.122 2.122L9 10.622l-6.01 6.01L.868 14.51 6.88 8.5.87 2.49 2.988.368 9 6.38 15.01.37z" fill="#FFF" fillRule="evenodd" /></svg>
                    </button> : <button style={{ backgroundColor: 'inherit', borderStyle: 'none' }} onClick={() => setIsOpen(!isOpen)} className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                        <svg width="20" height="17" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fillRule="evenodd"><path d="M0 0h20v3H0zM0 7h20v3H0zM0 14h20v3H0z" /></g></svg></button >
                }


                <div style={{ marginTop: 110, height: '90%' }} className="offcanvas offcanvas-start" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                    <div className="offcanvas-body"><CardList /></div>
                </div>


            </div>
        </nav>
    )
}

function CardList() {
    const router = useRouter()
    const { status, data = {} } = useQuery('roadmap', () => getFeedbackByStatus())
    const {filter, setFilter} = useContext(FeedbackFiltersPageContext)

    const { planned = [], inProgress = [], live = [] } = data

    function Filters() {
        const selection = [
            FeedbackFiltersConstants.All,
            FeedbackFiltersConstants.UI,
            FeedbackFiltersConstants.UX,
            FeedbackFiltersConstants.Enhancement,
            FeedbackFiltersConstants.Bug,
            FeedbackFiltersConstants.Feature
        ]
        return (
            <div className={`card pt-3 pb-3 ps-3 pe-3  d-flex flex-row flex-wrap ${styles.card_style} p-3`}>
                {
                    selection.map((v, i) => {
                        return (
                            <a key={i} onClick={() => {
                                setFilter(v)
                            }} className={` ${styles.button_sizing} ${filter === v? styles.active_button : styles.button}`}>{v}</a>

                        )
                    })
                }
            </div>
        )
    }
    return (
        <div style={{ color: 'black' }} className='d-flex flex-column flex-md-row flex-lg-column'>
            <Filters />
            <div className={`card flex-md-grow-1 ${styles.card_style} pt-3 pb-3 ps-2 pe-2`}>
                <div className='container-fluid'>
                    <div className='row'>
                        <h5 className='col-8'>Roadmap</h5>
                        <a className='col-4' style={{ cursor: 'pointer' }} onClick={() => router.push({
                            pathname: 'Roadmap',
                        })}>View</a>
                    </div>
                    <div className='row'>
                        <p className='col-9 '>
                            <FeedbackStatus status={'Planned'} />

                        </p>
                        <h6 className='col-3'>{planned.length}</h6>
                    </div>
                    <div className='row'>
                        <p className='col-9'>
                            <FeedbackStatus status={'In-Progress'} />
                        </p>
                        <h6 className='col-3 '>{inProgress.length}</h6>
                    </div>
                    <div className='row'>
                        <p className='col-9'>
                            <FeedbackStatus status={'Live'} />
                        </p>
                        <h6 className='col-3'>{live.length}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}
