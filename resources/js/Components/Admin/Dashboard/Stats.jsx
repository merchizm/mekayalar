import React from 'react';

const UpTrendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg>
);

const DbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 6m-8 0a8 3 0 1 0 16 0a8 3 0 1 0 -16 0" /><path d="M4 6v6a8 3 0 0 0 16 0v-6" /><path d="M4 12v6a8 3 0 0 0 16 0v-6" /></svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
);

const colorVariants = {
  primary: {
    text: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-500',
  },
  blue: {
    text: 'text-sky-500 dark:text-sky-400',
    bg: 'bg-sky-500',
  },
  yellow: {
    text: 'text-yellow-500 dark:text-yellow-400',
    bg: 'bg-yellow-500',
  },
  red: {
    text: 'text-red-500 dark:text-red-400',
    bg: 'bg-red-500',
  },
};

const StatCard = ({ title, value, changeValue, changeLabel, icon, color }) => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
    <div className="p-5">
      <div className="flex items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">{title}</div>
      </div>
      <div className="mt-2 mb-3 text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="flex mb-2">
        <div className="text-sm text-gray-500 dark:text-gray-400">{changeLabel}</div>
        <div className="ml-auto">
          <span className={`${colorVariants[color]?.text || ''} inline-flex items-center leading-tight`}>
            {changeValue} {icon}
          </span>
        </div>
      </div>
      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
        <div className={`${colorVariants[color]?.bg || ''} h-1.5 rounded-full`} style={{ width: '100%' }}>
          <span className="sr-only">100% Complete</span>
        </div>
      </div>
    </div>
  </div>
);

export default function Stats({ stats }) {
  const statItems = [
    { title: 'Toplam Gönderi', value: stats.posts.total, changeValue: stats.posts.recent, changeLabel: 'Son 7 günde', icon: <UpTrendIcon />, color: 'primary' },
    { title: 'Toplam Şiir', value: stats.poems.total, changeValue: stats.poems.recent, changeLabel: 'Son 7 günde', icon: <UpTrendIcon />, color: 'blue' },
    { title: 'Medya Dosyaları', value: stats.media.total, changeValue: null, changeLabel: 'Depolama', icon: <DbIcon />, color: 'yellow' },
    { title: 'Kullanıcılar', value: stats.users.total, changeValue: null, changeLabel: 'Yönetici', icon: <UserIcon />, color: 'red' }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item, index) => (
        <div key={index}>
          <StatCard
            title={item.title}
            value={item.value}
            changeValue={item.changeValue}
            changeLabel={item.changeLabel}
            icon={item.icon}
            color={item.color}
          />
        </div>
      ))}
    </div>
  );
} 
