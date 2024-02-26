import { ReactNode } from 'react';
import { ModeToggle } from './ui/mode-toggle';
import { SidebarNav } from './sidebar-nav'; 
import { Separator } from './ui/separator'; 


interface LayoutProps {
    children: ReactNode;
}

const sidebarNavItems = [
    {
      title: "Profile",
      href: "/examples/forms",
    },
    {
      title: "Account",
      href: "/examples/forms/account",
    },
    {
      title: "Appearance",
      href: "/examples/forms/appearance",
    },
    {
      title: "Notifications",
      href: "/examples/forms/notifications",
    },
    {
      title: "Display",
      href: "/examples/forms/display",
    },
  ]

export default function Layout(props: LayoutProps): JSX.Element {
    const { children } = props;
    return (
        <> 
        <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Compound Interest Calculator  <ModeToggle /> </h2>
          <p className="text-muted-foreground">
          Trahan Compund
          </p>
        </div>
        <Separator className="my-6" />
        </div>
        <div className='flex flex-row'>
        <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className='overflow-y-auto w-4/5 justify-end min-h-screen gap-10 sm:gap-12 md:gap-5 bg-background'>
            <header className=''>
                
                <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center'>  </h2>
            </header>
            <p className='text-center text-xl text-muted-foreground'></p>
            <main className=''>
                {children}
            </main>
            <footer></footer>
        </div>
        </div>
        </>
        
    );
}
