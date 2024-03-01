'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const transition = {
    type: 'spring',
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001
};

export const MenuItem = ({
    setActive,
    active,
    item,
    children
}: {
    setActive: (item: string) => void;
    active: string | null;
    item: string;
    children?: React.ReactNode;
}) => {
    return (
        <div onMouseEnter={() => setActive(item)} className="relative ">
            <motion.p transition={{ duration: 0.3 }} className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white">
                {item}
            </motion.p>
            {active !== null && (
                <motion.div initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={transition}>
                    {active === item && (
                        <div className="absolute left-1/2 top-[calc(100%_+_1rem)] -translate-x-1/2">
                            <motion.div
                                transition={transition}
                                layoutId="active" // layoutId ensures smooth animation
                                className="overflow-hidden rounded-2xl border border-black/[0.2] bg-white shadow-xl  dark:border-white/[0.2] dark:bg-black"
                            >
                                <motion.div
                                    layout // layout ensures smooth animation
                                    className="h-full w-max p-4"
                                >
                                    {children}
                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export const Menu = ({ setActive, children }: { setActive: (item: string | null) => void; children: React.ReactNode }) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)} // resets the state
            className="boder relative flex items-center justify-center space-x-4 rounded-full border border-black/[0.2] bg-white px-8 py-3 shadow-input dark:border-white/[0.2] dark:bg-black "
        >
            {children}
        </nav>
    );
};

export const ProductItem = ({ title, description, href, src }: { title: string; description: string; href: string; src: string }) => {
    return (
        <Link href={href} className="flex space-x-2">
            <Image src={src} width={140} height={70} alt={title} className="shrink-0 rounded-md shadow-2xl" />
            <div>
                <h4 className="mb-1 text-xl font-bold text-black dark:text-white">{title}</h4>
                <p className="max-w-[10rem] text-sm text-neutral-700 dark:text-neutral-300">{description}</p>
            </div>
        </Link>
    );
};

export const HoveredLink = ({ children, ...rest }: any) => {
    return (
        <Link {...rest} className="flex items-center text-neutral-700 hover:text-neutral-400 dark:text-neutral-200">
            {children}
        </Link>
    );
};
