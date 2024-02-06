import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import config from "@config";
import { setPageState, setLoggedIn } from "./redux/pageState/pageStateActions";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
    ? config.development.serverUrl
    : config.production.serverUrl;

export default function CreateAccountScreen() {
    const dispatch = useDispatch();

    const [newUserUsername, setNewUserUsername] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserConfirmPassword, setNewUserConfirmPassword] = useState("");
    const [passwordMatchingError, setPasswordMatchingError] = useState(false);

    const handleSignIn = () => {
        dispatch(setPageState("login", "login"));
    };

    const handleCreateAccount = async () => {
        setPasswordMatchingError(false);

        if (newUserPassword != newUserConfirmPassword) {
            setPasswordMatchingError(true);
            return;
        }

        try {
            const response = await Axios.post(`${serverUrl}/auth/register`, {
                newUserUsername: newUserUsername,
                newUserPassword: newUserPassword,
            });

            const data = response.data;

            if (data.success) {
                localStorage.setItem("token", data.token);

                Axios.defaults.headers.common["Authorization"] =
                    `Bearer ${data.token}`;

                dispatch(setLoggedIn(true));
            }
        } catch (error) {
            return;
        }
    };

    return (
        <div className='relative'>
            <div
                className='my-24 flex flex-col space-y-4 absolute left-1/2 -translate-x-1/2'
                style={{ height: `calc(100vh - 12rem)`, width: "27%" }}
            >
                <div className='flex flex-col items-center justify-center border border-fg-white-65 rounded h-4/5 py-10 px-12 w-full'>
                    <p className='text-5xl mb-12'>Webapp</p>
                    <input
                        className='text-xl font-K2D h-12 w-full rounded bg-fg-white-95 mb-4 pl-4'
                        placeholder='Username'
                        type='text'
                        value={newUserUsername}
                        onChange={(e) => setNewUserUsername(e.target.value)}
                    />
                    <input
                        className='text-xl font-K2D h-12 w-full rounded bg-fg-white-95 mb-4 pl-4'
                        placeholder='Password'
                        type='password'
                        value={newUserPassword}
                        onChange={(e) => setNewUserPassword(e.target.value)}
                    />
                    <input
                        className={`text-xl font-K2D h-12 w-full rounded bg-fg-white-95 pl-4 ${
                            passwordMatchingError ? "mb-0" : "mb-5"
                        }`}
                        placeholder='Confirm Password'
                        type='password'
                        value={newUserConfirmPassword}
                        onChange={(e) =>
                            setNewUserConfirmPassword(e.target.value)
                        }
                    />
                    <div className='w-full items-start justify-center'>
                        {passwordMatchingError && (
                            <p className='text-sm font-K2D text-red-400'>
                                Passwords don't match
                            </p>
                        )}
                    </div>
                    <div className='w-full flex justify-center items-center mb-4'>
                        <div className='w-5/12 h-0.5 bg-fg-white-65'></div>
                        <p className='w-1/6 text-xl text-center pb-1'>or</p>
                        <div className='w-5/12 h-0.5 bg-fg-white-65'></div>
                    </div>
                    <div className='w-full px-10 grow flex flex-col'>
                        <div className='text-2xl font-K2D h-14 w-full rounded-full bg-fg-black-25 text-white p-1 mb-3 cursor-pointer'>
                            <div className='bg-white rounded-full w-full h-full p-0.5'>
                                <div className='bg-fg-black-25 rounded-full w-full h-full text-center pt-1'>
                                    Sign up with Google
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col grow items-center justify-end'>
                            <div
                                className='text-2xl font-K2D h-14 w-full rounded-full bg-fg-primary text-white p-1 cursor-pointer'
                                onClick={handleCreateAccount}
                            >
                                <div className='bg-white rounded-full w-full h-full p-0.5'>
                                    <div className='bg-fg-primary rounded-full w-full h-full text-center pt-1'>
                                        Create Account
                                    </div>
                                </div>
                            </div>
                            <a
                                href='https://www.example.com'
                                className='text-lg italic mt-1'
                            >
                                Readable terms and policies
                            </a>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center border border-fg-white-65 rounded h-1/5 px-12 pt-2 pb-4'>
                    <div className='flex flex-col w-full items-start justify-center'>
                        <p className='text-2xl mb-3'>
                            Already have an account?
                        </p>
                    </div>
                    <div className='w-full px-10'>
                        <button
                            className='border-2 border-fg-primary rounded-full h-14 w-full text-2xl font-K2D cursor-pointer'
                            onClick={handleSignIn}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
