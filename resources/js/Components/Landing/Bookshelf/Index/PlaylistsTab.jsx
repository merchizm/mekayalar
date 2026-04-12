import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { createPortal } from 'react-dom';

const PlaylistsTab = ({ playlists, pagination }) => {
    const [previewId, setPreviewId] = useState(null);
    const [previewLoading, setPreviewLoading] = useState({});
    const [previewData, setPreviewData] = useState({});

    const togglePreview = async (event, playlist) => {
        event.preventDefault();
        event.stopPropagation();

        if (previewId === playlist.id) {
            setPreviewId(null);
            return;
        }

        setPreviewId(playlist.id);

        if (previewData[playlist.id]) {
            return;
        }

        setPreviewLoading((prev) => ({ ...prev, [playlist.id]: true }));
        try {
            const response = await axios.get(`/api/spotify/playlists/${playlist.id}/preview`);
            setPreviewData((prev) => ({ ...prev, [playlist.id]: response.data }));
        } catch {
            setPreviewData((prev) => ({ ...prev, [playlist.id]: { tracks: [] } }));
        } finally {
            setPreviewLoading((prev) => ({ ...prev, [playlist.id]: false }));
        }
    };

    const activePlaylist = playlists?.items?.find((item) => item.id === previewId);
    const activeTracks = previewId ? previewData[previewId]?.tracks || [] : [];
    const isLoading = previewId ? previewLoading[previewId] : false;
    const previewModal =
        previewId && activePlaylist && typeof document !== 'undefined'
            ? createPortal(
                  <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
                      <button
                          type="button"
                          className="bg-background/72 absolute inset-0 backdrop-blur-md"
                          onClick={() => setPreviewId(null)}
                          aria-label={__('Kapat')}
                      />
                      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-background p-5 shadow-2xl dark:border-border dark:bg-card">
                          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(29,185,84,0.22),transparent_68%)] dark:bg-[radial-gradient(circle_at_top,rgba(29,185,84,0.18),transparent_72%)]"></div>
                          <div className="relative flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                  <img
                                      src={activePlaylist.images?.[0]?.url}
                                      alt={activePlaylist.name}
                                      className="h-14 w-14 rounded-2xl object-cover shadow-sm"
                                  />
                                  <div className="min-w-0">
                                      <p className="truncate text-base font-semibold text-foreground dark:text-foreground">
                                          {activePlaylist.name}
                                      </p>
                                      <p className="text-xs text-muted-foreground dark:text-muted-foreground">
                                          {__(':count Şarkı', { count: activePlaylist.tracks.total })}
                                      </p>
                                  </div>
                              </div>
                              <button
                                  type="button"
                                  onClick={() => setPreviewId(null)}
                                  className="interactive-pill rounded-full border border-border bg-background p-2 text-xs text-foreground shadow-sm transition hover:bg-accent dark:border-border dark:bg-card dark:text-foreground dark:hover:bg-accent"
                              >
                                  ✕
                              </button>
                          </div>
                          <div className="mt-4 min-h-[220px] space-y-2">
                              {isLoading && (
                                  <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 text-center">
                                      <div className="relative h-14 w-14">
                                          <span className="absolute inset-0 rounded-full border-2 border-border dark:border-border"></span>
                                          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-r-primary/70 border-t-primary"></span>
                                          <span className="absolute inset-[8px] rounded-full bg-primary/10 dark:bg-primary/10"></span>
                                      </div>
                                      <div>
                                          <p className="text-sm font-semibold text-foreground dark:text-foreground">
                                              {__('Playlist yükleniyor')}
                                          </p>
                                          <p className="mt-1 text-xs text-muted-foreground dark:text-muted-foreground">
                                              {__('Şarkı önizlemeleri hazırlanıyor...')}
                                          </p>
                                      </div>
                                  </div>
                              )}
                              {!isLoading && activeTracks.length === 0 && (
                                  <div className="flex min-h-[220px] items-center justify-center text-center text-xs text-muted-foreground dark:text-muted-foreground">
                                      {__('Önizleme bulunamadı.')}
                                  </div>
                              )}
                              {!isLoading &&
                                  activeTracks.map((track) => (
                                      <div
                                          key={track.id ?? track.name}
                                          className="surface-lift flex items-center gap-3 rounded-2xl border border-border bg-background p-2 shadow-sm dark:border-border dark:bg-card"
                                      >
                                          {track.image ? (
                                              <img
                                                  src={track.image}
                                                  alt={track.name}
                                                  className="h-12 w-12 rounded-xl object-cover"
                                              />
                                          ) : (
                                              <div className="h-12 w-12 rounded-xl bg-border dark:bg-border" />
                                          )}
                                          <div className="min-w-0">
                                              <p className="truncate text-sm font-semibold text-foreground dark:text-foreground">
                                                  {track.name}
                                              </p>
                                              <p className="truncate text-xs text-muted-foreground dark:text-muted-foreground">
                                                  {track.artists}
                                              </p>
                                          </div>
                                      </div>
                                  ))}
                          </div>
                          <div className="mt-4 flex justify-end">
                              <a
                                  href={activePlaylist.external_urls.spotify}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="interactive-pill inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 dark:border dark:border-border dark:bg-secondary dark:text-foreground dark:hover:bg-accent"
                              >
                                  {__('Spotify’da Aç')}
                              </a>
                          </div>
                      </div>
                  </div>,
                  document.body
              )
            : null;

    return (
        <div>
            {previewModal}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {playlists && playlists.items && playlists.items.length > 0 ? (
                    playlists.items.map(
                        (playlist) =>
                            playlist.public && (
                                <div key={playlist.id} className="group relative">
                                    <button
                                        type="button"
                                        onClick={(event) => togglePreview(event, playlist)}
                                        className="block w-full text-left"
                                    >
                                        <div className="transform overflow-hidden rounded-xl border border-border bg-background shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-border dark:bg-card">
                                            <div className="h-48 w-full overflow-hidden">
                                                <img
                                                    src={playlist.images[0].url}
                                                    alt={playlist.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="p-5">
                                                <h3 className="line-clamp-1 text-lg font-bold text-foreground dark:text-foreground">
                                                    {playlist.name}
                                                </h3>
                                                <div className="mt-3 flex items-center justify-between">
                                                    <span className="text-sm text-muted-foreground dark:text-muted-foreground">
                                                        {__(':count Şarkı', { count: playlist.tracks.total })}
                                                    </span>
                                                    <span className="text-xs font-semibold text-muted-foreground dark:text-muted-foreground">
                                                        {__('Önizleme')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            )
                    )
                ) : (
                    <div className="col-span-full my-5 rounded-2xl border-2 border-dashed border-border bg-background py-24 text-center dark:border-border dark:bg-card">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mx-auto mb-6 h-20 w-20 text-muted-foreground dark:text-muted-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                            />
                        </svg>
                        <h2 className="mb-3 text-3xl font-bold text-foreground dark:text-foreground">
                            {__('Playlist Bulunamadı')}
                        </h2>
                        <p className="text-xl text-muted-foreground dark:text-muted-foreground">
                            {__("Henüz herkese açık bir Spotify playlist'im bulunmuyor.")}
                        </p>
                    </div>
                )}
            </div>
            {pagination && (pagination.hasPrev || pagination.hasNext) && (
                <div className="mt-8 flex items-center justify-center gap-3">
                    {pagination.hasPrev && (
                        <Link
                            href={route('bookshelf.index', { page: pagination.page - 1 })}
                            className="rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent dark:border-border dark:bg-card dark:text-foreground dark:hover:bg-accent"
                        >
                            {__('Önceki')}
                        </Link>
                    )}
                    {pagination.hasNext && (
                        <Link
                            href={route('bookshelf.index', { page: pagination.page + 1 })}
                            className="rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent dark:border-border dark:bg-card dark:text-foreground dark:hover:bg-accent"
                        >
                            {__('Sonraki')}
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default PlaylistsTab;
