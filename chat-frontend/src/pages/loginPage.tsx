import { MessageCircle, Users, Zap, Shield } from 'lucide-react';
import React, { use, useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { login } from '../service/authService';
import { toast } from 'react-toastify';
import axios, { isAxiosError } from 'axios';
import Cookies from 'js-cookie';




   interface FormData {
    email :string
    password :string
   }


   interface ErrorForm {
    email ? :string
    password ?: string
   }

export default function LoginPage() {
 

    const [showPassword ,setShowPassword] = useState (false)
    const [formData ,setFormData] =  useState <FormData>({
        email:"",
        password:""
    })
    const [erros ,setErrors] = useState<ErrorForm>({})
    const [isLoading ,setIsLoading] =  useState(false)
    const {login : autheunticate} =  useAuth()
    const navigate =  useNavigate()


 const validateForm =  ()=>{

    const newErrors :  ErrorForm = {}
     
    
    if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!formData.password.trim()) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
  }


  const handleSubmit  =  async ( e:React.FormEvent) => {
    e.preventDefault()

    if(validateForm()){
        setIsLoading(true)



        try{
            const user =  await login(formData)
           
            toast.success(`Welcome , ${user.full_name}`)
            setIsLoading(true)
            autheunticate(user.AccessToken)
            setIsLoading(true)
            
            navigate('/chat')
        }catch(error:any){
            
            if(axios.isAxiosError(error)){
                toast.error(error.message)
            }else{
                toast.error("somthing went worng")
            }
        
        }finally{
            setIsLoading(false)
        }
    }
  }




  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {

     const {name ,value} = e.target
     setFormData((prev) => ({
        ...prev,
        [name]:value
     }))

     if(erros[name as keyof ErrorForm]){
        setErrors((prev)=>({
            ...prev,
            [name]:undefined
        }))
     }
      
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[500px]">
          
          {/* Left Side - Login Card */}
          <div className="lg:w-1/2 p-6 lg:p-8 flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-sm">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full mb-3">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h2>
                <p className="text-gray-600 text-sm">Sign in to continue to LinkUp</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </div>
                  <input
                    id='email'
                    type="email"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </div>
                  <input
                    id='password'
                    name='password'
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-600" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </div>
                  <button className="text-sm text-blue-700 hover:text-blue-600 transition-colors">
                    Forgot password?
                  </button>
                </div>

                <button
                  type='submit'
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white py-2.5 px-4 rounded-lg font-medium hover:from-blue-800 hover:to-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200"
                >
                  Sign In
                </button>

                <div className="text-center">
                  <span className="text-gray-600 text-sm">Don't have an account? </span>
                  <button className="text-blue-700 hover:text-blue-600 font-medium text-sm transition-colors">
                    Sign up here
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* Right Side - LinkUp Branding */}
          <div className="lg:w-1/2 bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 p-6 lg:p-8 flex flex-col justify-center text-white relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-24 h-24 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-20 right-10 w-20 h-20 border-2 border-white rounded-full"></div>
              <div className="absolute top-1/2 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              {/* Logo */}
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold">LinkUp</h1>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl lg:text-3xl font-bold leading-tight mb-4">
                Connect with friends like never before
              </h2>

              <p className="text-base text-white/90 mb-6 leading-relaxed">
                Experience seamless communication with our next-generation chat platform. 
                Stay connected, share moments, and build lasting relationships.
              </p>

              {/* Feature List */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm">Lightning-fast messaging</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm">Group chats & communities</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm">End-to-end encryption</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex space-x-6 text-center">
                <div>
                  <div className="text-xl font-bold">10M+</div>
                  <div className="text-xs text-white/80">Active Users</div>
                </div>
                <div>
                  <div className="text-xl font-bold">50+</div>
                  <div className="text-xs text-white/80">Countries</div>
                </div>
                <div>
                  <div className="text-xl font-bold">99.9%</div>
                  <div className="text-xs text-white/80">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}