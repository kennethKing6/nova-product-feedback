import { BASEURL } from "../BASEURL"
import * as Endpoints from './endpoint';

export const getUsersProjects = async (authToken,email) => {

    const response = await fetch(BASEURL + Endpoints.LIST_PROJECTS, {
        method: 'GET',
        headers:{
            "Content-Type":"application/json",
            "token":authToken,
            "email":email
        },
       
    })
    const {projects} = await response.json()
    return projects
}

export const createNewProject = async (authToken,email,projectName,contributors) => {

    const response = await fetch(BASEURL + Endpoints.CREATE_PROJECT, {
        method: 'POST',
        headers:{
            "Content-Type":"application/json",
            "token":authToken
        },
        body:JSON.stringify({
            email,
            projectName,
            contributors
        })
       
    })
    const {projects} = await response.json()
    return projects
}


