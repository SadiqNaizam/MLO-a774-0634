import React from 'react';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <div className={cn("min-h-screen bg-page-bg text-foreground")}>
      {/* Sidebar is fixed, takes w-64 (defined within SidebarNav) */}
      <SidebarNav />
      
      {/* This div contains content to the right of the sidebar */}
      {/* ml-64 for desktop, ml-0 for mobile if sidebar is hidden/overlayed */}
      <div className="sm:ml-64"> {/* Adjust ml based on sidebar width and responsiveness */} 
        {/* TopHeader is fixed, h-[70px], positioned relative to this container */}
        <TopHeader />
        
        {/* Main content area */}
        <main 
          className={cn(
            "mt-[70px]", // Margin top to account for the fixed TopHeader's height
            "p-6",       // Padding for the content area itself
            "min-w-0",   // Ensures content doesn't overflow its container due to flex/grid items
            "overflow-y-auto", // Allows main content to scroll independently
            "min-h-[calc(100vh-70px)]" // Ensures main area can fill remaining vertical space
                                     // useful if content is short and bg needs to extend
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
