"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react';

const ClientLayout = ({ children }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default ClientLayout;