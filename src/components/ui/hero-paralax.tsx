'use client';
import { motion, MotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const HeroParallax = ({
    products
}: {
    products: {
        title: string;
        link: string;
        thumbnail: string;
    }[];
}) => {
    const firstRow = products.slice(0, 3);
    const secondRow = products.slice(3, 6);
    const thirdRow = products.slice(6, 9);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start']
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 600]), springConfig);
    const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -600]), springConfig);
    const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
    const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
    const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);
    return (
        <div
            id="projects"
            ref={ref}
            className="relative flex h-[270vh]  flex-col self-auto overflow-hidden pb-10 pt-40 antialiased [perspective:1000px] [transform-style:preserve-3d]"
        >
            <Header />
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity
                }}
                className=""
            >
                <motion.div className="mb-20 flex flex-row-reverse space-x-20 space-x-reverse">
                    {firstRow.map((product) => (
                        <ProductCard product={product} translate={translateX} key={product.title} />
                    ))}
                </motion.div>
                <motion.div className="mb-20 flex  flex-row space-x-20 ">
                    {secondRow.map((product) => (
                        <ProductCard product={product} translate={translateXReverse} key={product.title} />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-20 space-x-reverse">
                    {thirdRow.map((product) => (
                        <ProductCard product={product} translate={translateX} key={product.title} />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export const Header = () => {
    return (
        <div className="relative left-0 top-0 mx-auto w-full max-w-5xl px-4  py-20 md:py-40">
            <h1 className="text-2xl font-bold dark:text-white md:text-7xl">Projects</h1>
        </div>
    );
};

export const ProductCard = ({
    product,
    translate
}: {
    product: {
        title: string;
        link: string;
        thumbnail: string;
    };
    translate: MotionValue<number>;
}) => {
    return (
        <motion.div
            style={{
                x: translate
            }}
            whileHover={{
                y: -20
            }}
            key={product.title}
            className="group/product relative h-96 w-[40rem] shrink-0"
        >
            <Link href={product.link} className="block group-hover/product:shadow-2xl ">
                <Image
                    src={product.thumbnail}
                    height="600"
                    width="600"
                    className="absolute inset-0 size-full object-cover object-center"
                    alt={product.title}
                />
            </Link>
            <div className="pointer-events-none absolute inset-0 size-full bg-black opacity-0 group-hover/product:opacity-80"></div>
            <h2 className="absolute bottom-4 left-4 text-white opacity-0 group-hover/product:opacity-100">{product.title}</h2>
        </motion.div>
    );
};
