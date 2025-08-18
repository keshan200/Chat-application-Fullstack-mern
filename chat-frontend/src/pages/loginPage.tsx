import React from 'react';
import { MessageCircle, Users, Zap, Shield } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          
          {/* Left Side - Login Card */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to continue to LinkUp</p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </div>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </div>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
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
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-800 hover:to-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200"
                >
                  Sign In
                </button>

                <div className="text-center">
                  <span className="text-gray-600 text-sm">Don't have an account? </span>
                  <button className="text-blue-700 hover:text-blue-600 font-medium text-sm transition-colors">
                    Sign up here
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - LinkUp Branding */}
          <div className="lg:w-1/2 bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
              <div className="absolute top-1/2 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              {/* Logo */}
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold">LinkUp</h1>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Connect with friends like never before
              </h2>

              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Experience seamless communication with our next-generation chat platform. 
                Stay connected, share moments, and build lasting relationships.
              </p>

              {/* Feature List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="text-lg">Lightning-fast messaging</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-lg">Group chats & communities</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="text-lg">End-to-end encryption</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex space-x-8 text-center">
                <div>
                  <div className="text-2xl font-bold">10M+</div>
                  <div className="text-sm text-white/80">Active Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-white/80">Countries</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-sm text-white/80">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}