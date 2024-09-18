import { BASEURL } from "../BASEURL"
import * as CommentsEndpoints from './endpoints'

const user = {
    image:"",
    name:"",
    username:""
}

export const getComments = async (commentsID) => {
    const response = await fetch(BASEURL + CommentsEndpoints.LIST_COMMENTS, {
        method: 'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            feedbackId: commentsID
        })
    })

    return await response.json()
}

export const postComments = async (feedbackID, content) => {
    const response = await fetch(BASEURL + CommentsEndpoints.POST_COMMENT, {
        method: 'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify({
            id: feedbackID,
            user: user,
            content: content
        })
    })

    return await response.json()
}

export const postLevelOneComments = async (commentsID, content, replyingTo) => {
    const response = await fetch(BASEURL + CommentsEndpoints.POST_COMMENTS_REPLY, {
        method: 'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify({
            feedbackCommentId: commentsID,
            user: user,
            content: content,
            replyingTo: replyingTo
        })
    })

    return await response.json()
}

export const postLevelTwoComments = async (commentsID, content, replyingTo) => {
    const response = await fetch(BASEURL + CommentsEndpoints.POST_COMMENTS_TWO_REPLY, {
        method: 'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify({
            levelOneReplyID: commentsID,
            user: user,
            content: content,
            replyingTo: replyingTo
        })
    })

    return await response.json()
}