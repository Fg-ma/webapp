import React, { useState } from "react";

export default function LoginScreen({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginClick = () => {
        onLogin();
    };

    return (
        <div className="w-screen h-screen relative">
            <div className="flex flex-col items-center justify-center bg-fg-white-95 rounded w-min h-min absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-6">
                <p className="text-xl mb-2">Login</p>
                <label className="text-base font-K2D">
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label className="text-base font-K2D">
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button onClick={handleLoginClick}>Login</button>
            </div>
        </div>
    );
};
