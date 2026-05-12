import { Suspense } from 'react';

import { type MediaItem, type Stats, type TraktData, TraktSection } from './TraktSection';

// ─── Config (server-only — never reaches the browser) ────────────────────────

const TRAKT_CLIENT_ID = process.env.TRAKT_CLIENT_ID!;
const TMDB_TOKEN = process.env.TMDB_TOKEN!;
const USERNAME = process.env.NEXT_PUBLIC_TRAKT_USERNAME!;
const TMDB_IMG = process.env.NEXT_PUBLIC_TMDB_IMG!;

const TRAKT_BASE = 'https://api.trakt.tv';
const TMDB_BASE = 'https://api.themoviedb.org/3';

const traktHeaders = {
    'Content-Type': 'application/json',
    'trakt-api-version': '2',
    'trakt-api-key': TRAKT_CLIENT_ID,
    'User-Agent': 'safetpojskic-portfolio/1.0 (https://safetpojskic.com; contact: you@safetpojskic.com)'
};

const tmdbHeaders = {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    accept: 'application/json'
};

async function fetchPoster(tmdbId: number, type: 'movie' | 'tv'): Promise<string | null> {
    try {
        const res = await fetch(`${TMDB_BASE}/${type}/${tmdbId}?language=en-US`, {
            headers: tmdbHeaders,
            // Cache poster lookups for 24 h to avoid hammering TMDB
            next: { revalidate: 86400 }
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.poster_path ? `${TMDB_IMG}${data.poster_path}` : null;
    } catch {
        return null;
    }
}

async function fetchTraktData(): Promise<TraktData> {
    const fetchOpts = { headers: traktHeaders, next: { revalidate: 3600 } } as const;

    const [statsRes, moviesRes, showsRes] = await Promise.all([
        fetch(`${TRAKT_BASE}/users/${USERNAME}/stats`, fetchOpts),
        fetch(`${TRAKT_BASE}/users/${USERNAME}/watched/movies`, fetchOpts),
        fetch(`${TRAKT_BASE}/users/${USERNAME}/watched/shows`, fetchOpts)
    ]);

    if (!statsRes.ok) throw new Error(`Trakt stats fetch failed: ${statsRes.status}`);
    if (!moviesRes.ok) throw new Error(`Trakt movies fetch failed: ${moviesRes.status}`);
    if (!showsRes.ok) throw new Error(`Trakt shows fetch failed: ${showsRes.status}`);

    const [statsData, moviesData, showsData]: [Stats, any[], any[]] = await Promise.all([statsRes.json(), moviesRes.json(), showsRes.json()]);

    const sortedMovies = [...moviesData].sort((a, b) => new Date(b.last_watched_at).getTime() - new Date(a.last_watched_at).getTime()).slice(0, 5);

    const sortedShows = [...showsData].sort((a, b) => new Date(b.last_watched_at).getTime() - new Date(a.last_watched_at).getTime()).slice(0, 5);

    const [movies, shows]: [MediaItem[], MediaItem[]] = await Promise.all([
        Promise.all(
            sortedMovies.map(
                async (item): Promise<MediaItem> => ({
                    title: item.movie.title,
                    year: item.movie.year,
                    tmdbId: item.movie.ids.tmdb,
                    lastWatched: item.last_watched_at,
                    plays: item.plays,
                    poster: await fetchPoster(item.movie.ids.tmdb, 'movie'),
                    type: 'movie'
                })
            )
        ),
        Promise.all(
            sortedShows.map(
                async (item): Promise<MediaItem> => ({
                    title: item.show.title,
                    year: item.show.year,
                    tmdbId: item.show.ids.tmdb,
                    lastWatched: item.last_watched_at,
                    plays: item.plays,
                    poster: await fetchPoster(item.show.ids.tmdb, 'tv'),
                    type: 'show'
                })
            )
        )
    ]);

    return { stats: statsData, movies, shows };
}

// ─── Inner async server component (the one that actually suspends) ────────────

async function TraktContent() {
    const data = await fetchTraktData();
    return <TraktSection data={data} />;
}

// ─── Skeleton shown while streaming ──────────────────────────────────────────

function TraktSkeleton() {
    return (
        <div className="mx-auto max-w-5xl px-8 py-20 md:py-32">
            {/* Heading */}
            <div className="mb-3 h-10 w-64 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
            <div className="mb-10 h-4 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

            {/* Stat cards */}
            <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-20 animate-pulse rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
                    />
                ))}
            </div>

            {/* Media cards */}
            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-[6.5rem] animate-pulse rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
                    />
                ))}
            </div>
        </div>
    );
}

// ─── Public export — wrap in Suspense so the page streams ─────────────────────

export function TraktHistory() {
    return (
        <Suspense fallback={<TraktSkeleton />}>
            <TraktContent />
        </Suspense>
    );
}
