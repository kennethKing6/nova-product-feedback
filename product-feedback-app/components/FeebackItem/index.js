import React from 'react';
import router from 'next/router'
import { displayCategoryName } from '../../utils/feedbackConstants';
import styles from './index.module.css'

export default function index({onClick,upvotes,comments,title,description,category}) {

    return (
        <div onClick={onClick} className={`container-fluid card mt-4 pb-2 pt-2`} style={{ cursor: 'pointer' }}>
            <div className='row'>
                <div className='col-1 d-none d-md-block'>
                    <span className='h-50 d-inline-block text-center p-2' style={{ backgroundColor: '#F2F4FE', color: '#3A4374', borderRadius: 5, width: '3rem' }}>{upvotes}</span>
                </div>
                <div className='col-11'>
                    <h3 style={{ fontSize: '1.2rem', color: '#3A4374' }}>{title}</h3>
                    <div className='row'>
                        <p className='col-11' style={{ color: '#647196' }}>{description}</p>
                        <p className={`col-1 d-none d-md-block`}><span className={`d-inline-block position-relative ${styles.comments_icon}`} /><span className='ms-1 pb-4 text-center'> {comments ? comments.length : 0}</span></p>
                    </div>
                    <span className='p-2 d-inline-block' style={{ backgroundColor: '#F2F4FF', color: '#4661E6', borderRadius: 5, fontWeight: 'bold', textTransform: 'capitalize' }}>{displayCategoryName(parseInt(category))}</span>
                    <div className='d-flex d-block d-md-none'>
                        <div className='flex-grow-1'><span className=' mt-3 d-inline-block text-center p-2' style={{ backgroundColor: '#F2F4FE', color: '#3A4374', borderRadius: 5, width: '3rem' }}>{upvotes}</span></div>
                        <div className='flex-grow-2 '><span className={`d-inline-block position-relative ${styles.comments_icon} top-50`} /><span className='ms-1 pb-4 text-center position-relative top-50'> {comments ? comments.length : 0}</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
