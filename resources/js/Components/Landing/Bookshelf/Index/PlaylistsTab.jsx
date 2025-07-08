import React from 'react';

const PlaylistsTab = ({ playlists }) => (
  <div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {playlists && playlists.items && playlists.items.length > 0 ? (
        playlists.items.map(playlist => (
          playlist.public && (
            <a key={playlist.id} href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="block group">
              <div className="overflow-hidden rounded-xl border shadow-md transition-all duration-300 transform bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark hover:shadow-xl hover:-translate-y-1">
                <div className="overflow-hidden w-full h-48">
                  <img src={playlist.images[0].url} alt={playlist.name} className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-text dark:text-text-dark line-clamp-1">{playlist.name}</h3>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-light-text dark:text-light-text-dark">{playlist.tracks.total} Şarkı</span>
                    <span className="inline-flex items-center text-sm font-semibold text-menu-active dark:text-menu-active-dark">
                      Dinle
                      <svg className="ml-1.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path></svg>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          )
        ))
      ) : (
        <div className="col-span-full py-24 my-5 text-center rounded-2xl border-2 border-dashed bg-background dark:bg-repository-card-bg-dark border-divider dark:border-divider-dark">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6 w-20 h-20 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          <h2 className="mb-3 text-3xl font-bold text-text dark:text-text-dark">Playlist Bulunamadı</h2>
          <p className="text-xl text-light-text dark:text-light-text-dark">Henüz herkese açık bir Spotify playlist'im bulunmuyor.</p>
        </div>
      )}
    </div>
  </div>
);

export default PlaylistsTab; 
