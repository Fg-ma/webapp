import React, { useState } from "react";

export default function LoginScreen({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
          
            const data = await response.json();
          
            if (response.ok) {
                // Save the token in local storage or state for future requests
                localStorage.setItem('token', data.token);
            } else {
                // Handle login failure
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        };
    };

    return (
        <div className="w-screen h-screen flex py-24 px-60">
            <div className="w-7/12 h-full flex items-center justify-start">
                <div className="h-full aspect-square bg-fg-white-75"></div>
            </div>
            <div className="pl-20 w-5/12 h-full flex flex-col space-y-4">
                <div className="flex flex-col items-center justify-center border border-fg-white-65 rounded h-3/4 p-12 w-full">
                    <p className="text-5xl mb-16">Webapp</p>
                    <input className="text-xl font-K2D h-14 w-full rounded bg-fg-white-95 mb-4 pl-4" placeholder="Username, email, or phone number" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input className="text-xl font-K2D h-14 w-full rounded bg-fg-white-95 mb-4 pl-4" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="w-full flex justify-center items-center mb-4">
                        <div className="w-5/12 h-0.5 bg-fg-white-65"></div>
                        <p className="w-1/6 text-xl text-center pb-1">or</p>
                        <div className="w-5/12 h-0.5 bg-fg-white-65"></div>
                    </div>
                    <div className="w-full px-10">
                        <div className="text-2xl font-K2D h-14 w-full rounded-full bg-fg-black-25 text-white p-1 mb-6" onClick={handleLoginClick}>
                            <div className="bg-white rounded-full w-full h-full p-0.5">
                                <div className="bg-fg-black-25 rounded-full w-full h-full text-center pt-1">
                                    Sign in with Google
                                </div>
                            </div>
                        </div>
                        <div className="text-2xl font-K2D h-14 w-full rounded-full bg-fg-primary text-white p-1 mb-6" onClick={handleLoginClick}>
                            <div className="bg-white rounded-full w-full h-full p-0.5">
                                <div className="bg-fg-primary rounded-full w-full h-full text-center pt-1">
                                    Sign in
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center border border-fg-white-65 rounded h-1/4 px-12 pt-3 pb-4">
                    <div className="flex flex-col w-full items-start justify-center">
                        <p className="text-2xl mb-1">No account?</p>
                        <p className="text-base mb-4">All it takes is a username and password!</p>
                    </div>
                    <div className="w-full px-10">
                        <button className="border-2 border-fg-primary rounded-full h-14 w-full text-2xl font-K2D">Create an account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
