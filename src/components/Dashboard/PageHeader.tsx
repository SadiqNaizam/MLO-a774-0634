import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6", className)}>
      <h1 className="text-3xl font-semibold text-foreground mb-4 sm:mb-0">Dashboard</h1>
      <Tabs defaultValue="leads" className="w-full sm:w-auto">
        <TabsList className="grid w-full grid-cols-2 sm:w-auto bg-muted p-1 rounded-md">
          <TabsTrigger 
            value="sales" 
            className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm px-4 py-1.5 text-sm font-medium text-muted-foreground data-[state=inactive]:hover:bg-background/50"
          >
            Sales
          </TabsTrigger>
          <TabsTrigger 
            value="leads" 
            className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm px-4 py-1.5 text-sm font-medium text-muted-foreground data-[state=inactive]:hover:bg-background/50"
          >
            Leads
          </TabsTrigger>
        </TabsList>
        {/* TabsContent would typically go here if content changes directly below tabs */}
      </Tabs>
    </div>
  );
};

export default PageHeader;