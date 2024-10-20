"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react'; // Import signIn from next-auth

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error || "Login failed");
      } else {
        // Redirect to home page after successful login
        router.push("/");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div>
      <Image
        src="/background.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={75}
        priority
      />
      <div className='formContainer'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <form onSubmit={loginHandler} className='formSection'>
              <h1>Login</h1>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <h3>Email</h3>
              <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} />
              <h3>Password</h3>
              <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} />
              <br /><br />
              <button type='submit'>Login</button>
              <Link href="/register" className='authLink'>
                If not registered? Register
              </Link>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UserLogin;
