import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout(props: LayoutProps): JSX.Element {
    const { children } = props;
    return (
        <div className='min-h-screen gap-10 sm:gap-12 md:gap-5 bg-slate-50'>
            <header className=''>
                <h1 className='text-4xl sm:text-5xl md:text-4xl font-semibold text-center text-slate-800'> Compound Interest Calculator </h1>
                
            </header>
            <p className='text-center text-slate-950 text-sm md:text-base'>Trahan Compund</p>
            <main className=''>
                {children}
            </main>
            <footer></footer>
        </div>

        
    );
}
