import { ReactNode } from 'react';
import { ModeToggle } from './ui/mode-toggle';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout(props: LayoutProps): JSX.Element {
    const { children } = props;
    return (
        <div className='min-h-screen gap-10 sm:gap-12 md:gap-5 bg-background'>
            <header className=''>
                <ModeToggle />
                <h1 className='text-4xl sm:text-5xl md:text-4xl font-semibold text-center'>Compound Interest Calculator </h1>
            </header>
            <p className='text-center text-sm md:text-base'>Trahan Compund</p>
            <main className=''>
                {children}
            </main>
            <footer></footer>
        </div>

        
    );
}
