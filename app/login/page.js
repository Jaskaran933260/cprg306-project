'use client';

import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => router.push('/'))
            .catch((err) => alert(err.message));
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => router.push('/'))
            .catch((err) => alert(err.message));
    };

    return (
        <div className="max-w-sm mx-auto mt-12 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Login / Sign Up</h2>
            <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 mb-3 text-sm rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full border p-2 mb-4 text-sm rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-between gap-2">
                <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded w-full">
                    Log In
                </button>
                <button onClick={handleSignup} className="text-blue-500 text-sm underline w-full">
                    Sign Up
                </button>
            </div>
        </div>
    );
}
