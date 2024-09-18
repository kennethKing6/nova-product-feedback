import { BASEURL } from "../BASEURL"
import * as Endpoints from './endpoint';

export const createFeedback = async (title, description, category) => {

    const response = await fetch(BASEURL + Endpoints.CREATE_FEEDBACK, {
        method: 'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            title: title,
            description: description,
            category: category
        })
    })
    return await response.json()
}

export const getFeedback = async () => {

    const response = await fetch(BASEURL + Endpoints.LIST_FEEDBACK, {
        headers: {
            method: 'GET'
        }

    })
    const json = await response.json()
    console.log(',,,,,,,,,,,,KKKKKKK', json)
    return json
}

export const deleteFeedback = async (id) => {

    const response = await fetch(BASEURL + Endpoints.DELETE_FEEDBACK, {
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({
            id: id,
        })
    })
    return await response.json()
}
export const updateFeedback = async (feedbackId,title, description, category,status) => {

    const response = await fetch(BASEURL + Endpoints.UPDATE_FEEDBACK, {
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({
            feedbackId:feedbackId,
            title:title,
            description:description,
            category:parseInt(category),
            status:status
        })
    })
    return await response.json()
}


export const getFeedbackByStatus = async () => {

    const response = await fetch(BASEURL + Endpoints.FEEDBACK_BY_STATUS, {
        headers: {
            method: 'GET'
        },

    })
    const json = await response.json()
    const { FeedbacksModelByStatus } = json;
    return FeedbacksModelByStatus
}

export const listByCategory = async (categoryID) => {

    const response = await fetch(BASEURL + Endpoints.FEEDBACK_BY_CATEGORY, {
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({
            categoryID:categoryID,
           
        })
    })
    return await response.json()
}

export const getFeedbackByMostUpvotes = async () => {

    const response = await fetch(BASEURL + Endpoints.FEEDACK_BY_MOST_UPVOTES, {
        method: 'GET',
        headers: {
            'content-type':'application/json'
        },
       
    })
    return await response.json()
}

export const getFeedbackByLeastUpvotes = async () => {

    const response = await fetch(BASEURL + Endpoints.FEEDACK_BY_LEAST_UPVOTES, {
        method: 'GET',
        headers: {
            'content-type':'application/json'
        },
       
    })
    return await response.json()
}

export const getFeebackByMostComments = async () => {

    const response = await fetch(BASEURL + Endpoints.FEEDACK_BY_MOST_COMMENTS, {
        method: 'GET',
        headers: {
            'content-type':'application/json'
        },
       
    })
    return await response.json()
}

export const getFeebackByLeastComments = async () => {

    const response = await fetch(BASEURL + Endpoints.FEEDACK_BY_LEAST_COMMENTS, {
        method: 'GET',
        headers: {
            'content-type':'application/json'
        },
       
    })
    return await response.json()
}