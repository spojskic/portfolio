'use client';

import Image from 'next/image';
import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Stats = {
    movies: { plays: number; watched: number; minutes: number };
    shows: { watched: number };
    episodes: { plays: number; minutes: number };
};

export type MediaItem = {
    title: string;
    year: number;
    tmdbId: number;
    lastWatched: string;
    plays: number;
    poster: string | null;
    type: 'movie' | 'show';
};

export type TraktData = {
    stats: Stats;
    movies: MediaItem[];
    shows: MediaItem[];
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatMinutes(minutes: number): string {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
}

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MediaCard({ item }: { item: MediaItem }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="group relative flex gap-4 overflow-hidden rounded-xl border border-neutral-200 bg-white p-3 transition-all duration-300 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600">
            {/* Poster */}
            <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800">
                {item.poster && !imgError ? (
                    <Image
                        src={item.poster}
                        alt={item.title}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => setImgError(true)}
                        width={100}
                        height={200}
                    />
                ) : (
                    <div className="flex size-full items-center justify-center text-neutral-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                            />
                        </svg>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col justify-between py-1">
                <div>
                    <p className="font-semibold leading-tight text-black dark:text-white">{item.title}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">{item.year}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                        {item.type === 'show' ? `${item.plays} eps` : item.plays > 1 ? `${item.plays}x watched` : 'Watched'}
                    </span>
                </div>
            </div>

            {/* Time badge */}
            <div className="flex shrink-0 items-start pt-1">
                <span className="text-xs text-neutral-400">{timeAgo(item.lastWatched)}</span>
            </div>
        </div>
    );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-2xl font-bold text-black dark:text-white">{value}</p>
            <p className="mt-1 text-xs text-neutral-500">{label}</p>
        </div>
    );
}

// ─── Main client component ────────────────────────────────────────────────────

export function TraktSection({ data }: { data: TraktData }) {
    const { stats, movies, shows } = data;
    const username = process.env.NEXT_PUBLIC_TRAKT_USERNAME;

    return (
        <div id="trakt" className="mx-auto max-w-5xl px-8 py-20 md:py-32">
            <h1 className="pb-2 text-2xl font-bold dark:text-white md:text-7xl">What I&apos;m Watching</h1>
            <p className="mb-10 text-sm text-neutral-500 dark:text-neutral-400">
                via{' '}
                <a
                    href={`https://trakt.tv/users/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline transition-colors hover:text-neutral-300"
                >
                    Trakt.tv
                </a>
            </p>

            <div className="space-y-10">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <StatCard label="Movies Watched" value={stats.movies.watched} />
                    <StatCard label="Episodes Watched" value={stats.episodes.plays} />
                    <StatCard label="Time on Movies" value={formatMinutes(stats.movies.minutes)} />
                    <StatCard label="Time on Shows" value={formatMinutes(stats.episodes.minutes)} />
                </div>

                {/* Shows */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">Recently Watched Shows</h2>
                    <div className="space-y-3">
                        {shows.map((item) => (
                            <MediaCard key={`show-${item.tmdbId}`} item={item} />
                        ))}
                    </div>
                </div>

                {/* Movies */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">Recently Watched Movies</h2>
                    <div className="space-y-3">
                        {movies.map((item) => (
                            <MediaCard key={`movie-${item.tmdbId}`} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
