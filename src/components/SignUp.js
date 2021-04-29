import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../assets/logo.svg';


const SignUp = () => {
    const { signUpWithEmail } = useAuth();
    const history = useHistory();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    console.log(loading);

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match')
        }

        try {
            setError('');
            setLoading(true)
            await signUpWithEmail(emailRef.current.value, passwordRef.current.value)
            history.push("/");

        } catch (error) {
            setError('Failed to sign up with email')
            console.log(error);
        }

    }

    return (
        <div className="flex min-h-screen min-w-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            <div className="m-auto w-96">
                {error && <div>{error}</div>}

                <div className="m-auto py-12 px-10 bg-white shadow-2xl rounded-2xl text-center">
                <img src={Logo} alt="logo" className="m-auto mb-3 w-12"/>
                    <h1 className="font-semibold text-gray-700 text-sm mb-5">Create an account to use Noots</h1>

                    <h2 className="text-sm text-gray-700 mb-8">Already have an account? <Link to="/login" className="text-pink-500 font-bold">Log In</Link></h2>

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
                        <div className="mt-2">
                            <label htmlFor="password-confirm" className="block text-xs font-medium text-gray-700 text-left pl-1">Confirm Password</label>
                            <div className="mt-1">
                                <input ref={passwordConfirmRef} type="password" name="password-confirm" required placeholder="Password" className="w-full text-gray-700 border border-gray-300 px-3 py-2.5 rounded-md text-sm shadow-sm focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-500"/>
                            </div>
                        </div>
                        <button className="text-sm w-full mt-5 bg-gray-900 rounded-md py-3.5 text-white shadow-lg hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" type="submit">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
