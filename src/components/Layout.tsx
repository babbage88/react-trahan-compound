import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout(props: LayoutProps): JSX.Element {
    const { children } = props;
    return (
        <div className='min-h-screen gap-10 sm:gap-12 md:gap-5 bg-slate-200'>
            <header className=''>
                <h1 className='text-4xl sm:text-5xl md:text-4xl font-semibold text-center'> Compound Interest Calculator </h1>
                <div className=''>
                    <i className=""></i>
                    <i className=""></i>
                    <i className=""></i>
                </div>
            </header>
            <p className='text-center text-cyan-950 text-sm md:text-base'>Trahan Compund</p>
            <main className=''>
                {children}
            </main>
            <footer></footer>
        </div>

        
    );
}
