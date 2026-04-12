import React from 'react';
import Sidebar from '@/Components/Layout/Admin/Sidebar';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ user, children }) {
    return (
        <div className="flex h-screen bg-sidebar text-sidebar-foreground">
            <Toaster position="top-center" reverseOrder={false} />
            <Sidebar user={user} />
            <div className="flex flex-1 flex-col pt-16 lg:pt-0">
                <main className="h-full overflow-y-auto pb-16 lg:pb-0">
                    <div className="container mx-auto grid px-6 py-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
