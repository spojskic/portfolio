import '@/lib/globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Safet Pojskic',
    description: 'Welcome to my personal portfolio!',
    applicationName: 'Safet Pojskic',
    keywords: ['Safet Pojskic', 'portfolio', 'personal', 'website', 'developer', 'designer', 'engineer', 'software', 'engineer'],
    openGraph: {
        siteName: 'Safet Pojskic',
        title: 'Safet Pojskic',
        description: 'Welcome to my personal portfolio!',
        type: 'website',
        images: [{ url: '/mainpage.png', alt: 'Safet Pojskic' }]
    },
    twitter: {
        card: 'summary_large_image',
        site: '@safetpojskic',
        title: 'Safet Pojskic',
        description: 'Welcome to my personal portfolio!',
        images: [{ url: '/mainpage.png', alt: 'Safet Pojskic' }]
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={spaceGrotesk.className}>
                <SpeedInsights />
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
