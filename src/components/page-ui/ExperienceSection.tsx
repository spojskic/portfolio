'use client';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { TracingBeam } from '@/components/ui/tracing-beams';

export function ExperienceSection() {
    return (
        <>
            <h1 id="experience" className="mx-auto max-w-5xl px-8 pb-8 pt-20 text-2xl font-bold dark:text-white md:pt-32 md:text-7xl">
                Experience
            </h1>
            <TracingBeam className="px-6">
                <div className="relative mx-auto max-w-2xl pb-32 pt-4 text-white antialiased">
                    {experience.map((item, index) => (
                        <div key={`content-${index}`} className="mb-10 mt-4 md:mt-0">
                            <h2 className={twMerge('text-xl text-black dark:text-white')}>{item.title}</h2>
                            <span className="w-fit rounded-full py-1 text-sm italic text-neutral-800 dark:text-neutral-200">{item.badge}</span>
                            <div className="prose prose-sm dark:prose-invert mt-2 text-sm text-black dark:text-white">{item.description}</div>
                        </div>
                    ))}
                </div>
            </TracingBeam>
        </>
    );
}

const experience = [
    {
        title: 'Pickleball.com',
        description: (
            <ul className="list-disc">
                <li>Developed a full-stack enterprise applications using React and Nextjs.</li>
                <li>
                    Lead the frontend development team, focusing on creating, improving, and fine-tuning web applications to make them fast and
                    reliable. My job includes planning our technical approaches, guiding the team, and actively coding and reviewing code.
                </li>
            </ul>
        ),
        badge: 'Software Engineer/Jan 2024 - Present'
    },
    {
        title: 'Bosnia and Herzegovina Futures Foundation',
        description: (
            <ul className="list-disc">
                <li>
                    Actively engaged in personal development, focusing on enhancing my soft skills and public speaking abilities under the guidance of
                    experienced mentors.
                </li>
                <li>
                    Transitioned into a mentorship role, where I guided high school students in developing their soft skills and provided guidance in
                    career planning and decision-making.
                </li>
                <li>Volunteered in web development team creating fls.ba info website</li>
            </ul>
        ),
        badge: 'Junior -> Senior -> Alumni/Sep 2021 – Present'
    },
    {
        title: 'Atlantbh',
        description: (
            <ul className="list-disc">
                <li>Developed a full-stack enterprise applications using React, PostgreSQL and Docker.</li>
                <li>Conducted code reviews, contributing to maintaining high standards of code quality and team collaboration.</li>
                <li>Provided mentorship to two IT college students, enhancing their practical software engineering skills.</li>
            </ul>
        ),
        badge: 'Junior Software Engineer/Jun 2022 - Jan 2024'
    },
    {
        title: 'Atlantbh (Intenship)',
        description: (
            <ul className="list-disc">
                <li>Developed full-stack applications with React.js and Spring Boot.</li>
                <li>
                    Implemented essential software development practices such as GitHub for version control, Maven for project management, JUnit for
                    testing, and applied design patterns and MVC architecture.
                </li>
            </ul>
        ),
        badge: 'Full Stack Developer/Feb 2022 - May 2022'
    }
];
