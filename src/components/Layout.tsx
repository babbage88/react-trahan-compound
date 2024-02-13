import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout(props: LayoutProps): JSX.Element {
    const { children } = props;
    return (
        <div className=''>
            <header className=''>
                <h1 className=''>Compound Interest Calculator</h1>
                <div className=''>
                    <i className=""></i>
                    <i className=""></i>
                    <i className=""></i>
                </div>
            </header>
            <p className=''>Trahan Compund</p>
            <main className=''>
                {children}
            </main>
            <footer></footer>
        </div>
    );
}
