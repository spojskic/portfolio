import React from 'react';

import { HeroParallax } from '@/components/ui/hero-paralax';

export function ProjectsSection() {
    return <HeroParallax products={products} />;
}

const products = [
    {
        title: 'Mern Memories',
        link: 'https://github.com/spojskic/mern-memories',
        thumbnail: '/projects/mern-memories.png'
    },
    {
        title: 'Next Event',
        link: 'https://github.com/spojskic/next-dj-events-frontend',
        thumbnail: '/projects/next-event.png'
    },
    {
        title: 'Devspace',
        link: 'https://github.com/spojskic/next-devspace-blog',
        thumbnail: '/projects/devspace.png'
    },

    {
        title: 'Google Clone',
        link: 'https://github.com/MagicPojska/gulululgl-search-clone',
        thumbnail: '/projects/google-clone.png'
    },
    {
        title: 'Portfolio V1',
        link: 'https://safetpojskic.netlify.app/',
        thumbnail: '/projects/old-portfolio.png'
    },
    {
        title: 'Dresscode',
        link: '',
        thumbnail: '/projects/dresscode.png'
    },

    {
        title: 'Portfolio V2',
        link: 'https://safetpojskic.com',
        thumbnail: '/projects/portfoliov2.png'
    },
    {
        title: 'Music App',
        link: 'https://github.com/spojskic/my-music-app',
        thumbnail: '/projects/music-app.png'
    },
    {
        title: 'Artemis',
        link: '',
        thumbnail: '/projects/artemis.png'
    }
];
