import React from 'react';
import Sidebar from '@/Components/Layout/Admin/Sidebar';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ user, children }) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      <Toaster position="top-center" reverseOrder={false} />
      <Sidebar user={user} />
      <div className="flex flex-col flex-1">
        <main className="h-full pb-16 overflow-y-auto">
          <div className="container grid px-6 py-6 mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 
