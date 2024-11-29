"use client";
import React, { useLayoutEffect } from 'react'
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


const Dashboard = () => {
    const { data: session, status } = useSession();
    useLayoutEffect(() => {
        if (status === "loading") {
            return;
        }

        // Redirect if not authenticated
        if (status === "authenticated") {
            return;
        } else {
            redirect("/");
        }
    }, [status]); // Dependency array to trigger effect when the session status changes



    return (
        <div className='flex justify-center items-center h-screen flex-col gap-8'>
            {/* user details     */}
            <div className='flex flex-col gap-4'>
                <h1 className='text-3xl font-bold text-center'>Welcome to Dashboard</h1>
                <div className='flex gap-4 items-center'>
                    <img src={session?.user?.image} alt="" className='w-20 h-20 rounded-full' />
                    <section>
                        <p className='text-2xl '><strong>Name: </strong>{session?.user?.name}</p>
                        <p className='text-2xl '><strong>Email: </strong>{session?.user?.email}</p>
                    </section>
                </div>

            </div>
            <button onClick={() => signOut()} className='bg-black py-2 px-4 rounded-lg text-white'>
                Logout
            </button>
        </div>
    )
}

export default Dashboard;