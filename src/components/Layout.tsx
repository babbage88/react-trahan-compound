import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout(props: LayoutProps): JSX.Element {
    const { children } = props;
    return (
        <div className=''>
            <header className=''>
                <h1 className='text-4xl sm:text-5xl md:text-4xl font-semibold text-center'> Compound Interest Calculator </h1>
                <div className=''>
                    <i className=""></i>
                    <i className=""></i>
                    <i className=""></i>
                </div>
            </header>
            <p className='text-center text-slate-200 text-sm md:text-base'>Trahan Compund</p>
            <main className=''>
                {children}
            </main>
            <footer></footer>
        </div>

        
    );
}
