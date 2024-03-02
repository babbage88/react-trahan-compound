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
        <div className="space-y-6 p-10 pb-16 md:block">
          <Toaster/>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Compound Interest Calculator  <ModeToggle /> </h2>
          <p className="text-muted-foreground">
          Trahan Compund 
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-4xl">{children}</div>
        </div>
      </div>
      <div className="flex flex-col fixed bottom-0 left-0 w-screen h-12">
      <footer className="flex text-muted-foreground align-bottom justify-end">
        <a href='https://github.com/babbage88/react-trahan-compound'>
          GitHub
        </a>
      </footer>
      </div>
        </>
        
    );
}
