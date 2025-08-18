export interface User{
    _id:string
    img?:string
    full_name :string
    bio?:string 
    email: string
    password:string
    status:"active" | "inactivate"
}




export type UserFormData={
 _id:string
    img?:string
    full_name :string
    bio?:string 
    email: string
    password:string
}