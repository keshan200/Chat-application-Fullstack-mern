import apiClient, { BASE_URL } from "./apiClient"

const AUTH_URL = `${BASE_URL}/auth`



export interface SignUpResponse{
    name:string
    coverImg : string
    email : string
    _id : string
}


export interface LoginResponse {
    _id:string
    img?:string
    full_name :string
    bio?:string 
    email: string
    password:string
    AccessToken:string
    status:"active" | "inactivate"
}

export interface LogoutResponse{
    message:string
}




export const login = async (loginData: { email: string; password: string }): Promise<LoginResponse> => {
    const response = await apiClient.post(`${AUTH_URL}/login`,loginData)
    console.log("Backend Response: ", response.data)
    return response.data
}

export const logout =  async () : Promise<LoginResponse> => {
    const response = await apiClient.post(`${AUTH_URL}/logout`)
    return response.data
}