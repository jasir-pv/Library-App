import axios from "axios";



const BASE_URL = process.env.REACT_APP_BASE_URL
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjIyOWEyMTc0Njg0ZTcyYjE2MzY5MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczMDM2NTkwNCwiZXhwIjoxNzMwNjI1MTA0fQ.F_eRhBlPEtuZHHEa9Vt5nj5xg0ANosn0UDTN3IX7YKo"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
    
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token:`Bearer ${TOKEN}`},
})