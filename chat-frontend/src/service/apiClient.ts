import axios, { AxiosError } from "axios"

export const BASE_URL =  "http://localhost:3000/api"

export const apiClient =  axios .create({
    baseURL : BASE_URL,
    headers : {
        "Content-Type":"application/json"
    },

    withCredentials:true
})


export const setHeader =  (accessToken:string) => {

    if(accessToken != ""){
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
    }else{
        delete apiClient.defaults.headers.common["Authorization"]
    }
} 


apiClient.interceptors.response.use(
    (response) => response,
    
    async ( error) => {
        const originalRequest = error.config //original rq
        if(error.response.status === 403 && !originalRequest._retry){
            originalRequest._retry = true

            try{
                const result =  await apiClient.post(`${BASE_URL}/auth/refresh-token`)
                const newAccessToekn =  result.data.accessToken

                setHeader(newAccessToekn)
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToekn}`
                return apiClient(originalRequest)
            }catch(error){
               if(error instanceof AxiosError) 
                if(error.response?.status === 401){
                    window.location.href = "/login"
                }
            }
        }
    }
)




export default apiClient