import { ReactNode } from 'react';
import { ModeToggle } from './ui/mode-toggle';
import { SidebarNav } from './sidebar-nav'; 
import { Separator } from './ui/separator'; 
import { Toaster } from './ui/toaster';

interface LayoutProps {
    children: ReactNode;
}

const sidebarNavItems = [
    {
      title: "Basic Compound Calc",
      href: "/",
    },
    {
      title: "Asset Allocation",
      href: "/assets",
    },
    {
        title: "Time Travel",
        href: "/date",
    },
  ]

export default function Layout(props: LayoutProps): JSX.Element {
    const { children } = props;

    return (
        <> 
        <div className="w-screen h-screen space-y-6 p-10 pb-16 md:block mx-auto lg:mx-0">
          <Toaster/>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Compound Interest Calculator</h2>
          <div className='flex flex-row justify-between'>
            <p className="text-muted-foreground">Trahan Compund</p>
            <div className='flex'>
            <ModeToggle />
            </div>
          </div>
          
        </div>
        <Separator className="my-6 w-screen lg:w-auto"/>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5 w-screen">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-4xl">{children}</div>
        </div>
      </div>
      <div className="flex flex-col fixed bottom-0 left-0 w-screen h-12 pr-4 justify-between">
      <ModeToggle/>
      <footer className="mt-auto p-4 lg:text-right sm:text-center lg:fixed lg:bottom-0 lg:left-0 lg:w-screen">
                <a href='https://github.com/babbage88/react-trahan-compound'>GitHub</a>
            </footer>
      </div>
        </>
        
    );
}
