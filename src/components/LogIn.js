import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import Logo from '../assets/logo.svg';

const LogIn = () => {
    const { signInWithGoogle, signInWithEmail } = useAuth();
    const history = useHistory();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        console.log(loading);

        try {
            setError('');
            setLoading(true)
            await signInWithEmail(emailRef.current.value, passwordRef.current.value)
            history.push("/");

        } catch (error) {
            setError('Failed to sign in with email')
            console.log(error);
        }

    }

    const handleGoogleSignIn = async () => {
        try {
            setError('')
            setLoading(true)
            await signInWithGoogle()
            history.push("/")
        } catch (error) {
            setError("Failed to sign in")
            console.log(error);
        }
    }

    return (
        <div className="flex min-h-screen min-w-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            <div className="m-auto w-96">
                <div className="m-auto py-12 px-10 bg-white shadow-2xl rounded-2xl text-center">
                    <img src={Logo} alt="logo" className="m-auto mb-3 w-12"/>
                    <h1 className="font-semibold text-gray-700 text-sm mb-5">Log in to Noots to continue</h1>

                    <form onSubmit={handleFormSubmit} className="mb-4">
                        <div>
                            <label htmlFor="email" className="block text-xs font-medium text-gray-700 text-left pl-1">Email Address</label>
                            <div className="mt-1">
                                <input ref={emailRef} type="email" name="email" placeholder="E.g john@example.com" required className="w-full text-gray-700 border border-gray-300 px-3 py-2.5 text-sm rounded-md shadow-sm focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-500" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="password" className="block text-xs font-medium text-gray-700 text-left pl-1">Password</label>
                            <div className="mt-1">
                                <input ref={passwordRef} type="password" name="password" required placeholder="Password" className="w-full text-gray-700 border border-gray-300 px-3 py-2.5 rounded-md text-sm shadow-sm focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-500"/>
                            </div>
                        </div>

                        {
                        error && 
                            <div className="mt-3">
                                <p className=" text-red-500 text-sm font-bold"><span className="mr-2">⚠️</span>{error}</p>
                            </div>
                        }

                        <button className="text-sm w-full mt-5 bg-gray-900 rounded-md py-3.5 text-white shadow-lg hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" type="submit">Continue</button>
                    </form>
                    <h2 className="text-sm text-left text-gray-500">Don't have an account? <Link to="/signup" className="text-pink-500 font-bold">Sign Up</Link></h2>
                    <div className="min-w-100 flex justify-center">
                        <button className="text-sm w-full relative mt-7 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-md py-3.5 text-white shadow-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" onClick={handleGoogleSignIn}>
                            <div className="bg-white absolute top-1 left-1 bottom-1 w-8 flex justify-center items-center rounded-sm">
                                <FcGoogle size={22} />
                            </div>
                            Continue using Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
