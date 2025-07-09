import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import Stats from "@/Components/Admin/Dashboard/Stats";
import RecentPosts from "@/Components/Admin/Dashboard/RecentPosts";
import RecentPoems from "@/Components/Admin/Dashboard/RecentPoems";
import QuickAccess from "@/Components/Admin/Dashboard/QuickAccess";

export default function Dashboard({ auth, stats, recentPosts, recentPoems }) {
  return (
    <AdminLayout user={auth.user}>
      <Head title="Admin Kontrol Paneli" />

      <div className="space-y-4">
        <Stats stats={stats} />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentPosts posts={recentPosts} />
          </div>
          <div>
            <RecentPoems poems={recentPoems} />
          </div>
        </div>

        <QuickAccess />
      </div>
    </AdminLayout>
  );
} 
