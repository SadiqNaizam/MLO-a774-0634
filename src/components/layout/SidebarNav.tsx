import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  UserCircle,
  FileText,
  Receipt,
  Package,
  Mail as MailIcon,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings as SettingsIcon,
  Layers, // For logo
  ChevronDown, 
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface NavItemProps {
  label: string;
  icon: React.ElementType;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
  subItems?: NavItemProps[];
  isSubItem?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon: Icon, href = '#', isActive, onClick, subItems, isSubItem }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const itemContent = (
    <>
      <Icon className={cn("h-5 w-5", isSubItem ? "ml-4 mr-2" : "mr-3")} />
      <span className="flex-1">{label}</span>
      {subItems && (
        isSubMenuOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
      )}
    </>
  );

  if (subItems) {
    return (
      <Collapsible open={isSubMenuOpen} onOpenChange={setIsSubMenuOpen}>
        <CollapsibleTrigger 
          asChild
          onClick={onClick} 
          className={cn(
            "flex items-center w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
            isActive && !isSubMenuOpen ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isSubItem && "pl-8"
          )}
        >
          <button type="button">{itemContent}</button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-1 space-y-1">
          {subItems.map(subItem => (
            <NavItem key={subItem.label} {...subItem} isSubItem={true} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
        isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isSubItem && "pl-8"
      )}
    >
      {itemContent}
    </a>
  );
};

const SidebarNav: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('Dashboard');

  const handleNavItemClick = (label: string) => {
    setActiveItem(label);
  };

  const navigationItems: NavItemProps[] = [
    { label: 'Dashboard', icon: LayoutGrid },
    { label: 'Leads', icon: Users },
    { label: 'Customers', icon: UserCircle },
    { label: 'Proposals', icon: FileText, subItems: [
      { label: 'All Proposals', icon: FileText },
      { label: 'Templates', icon: FileText },
    ]},
    { label: 'Invoices', icon: Receipt },
    { label: 'Items', icon: Package },
    { label: 'Mail', icon: MailIcon },
    { label: 'Shoebox', icon: Archive },
    { label: 'Calendar', icon: CalendarDays },
  ];

  const bottomNavigationItems: NavItemProps[] = [
    { label: 'Help', icon: HelpCircle },
    { label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border z-20">
      <div className="px-4 py-5 flex items-center border-b border-sidebar-border">
        <Layers className="h-8 w-8 mr-2 text-sidebar-primary" />
        <span className="text-xl font-semibold text-sidebar-foreground">Leads Dashboard</span>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {navigationItems.map((item) => (
          <NavItem 
            key={item.label} 
            {...item} 
            isActive={activeItem === item.label || (item.subItems?.some(sub => activeItem === sub.label) && !item.subItems.find(si => si.label === activeItem))}
            onClick={() => handleNavItemClick(item.label)}
            subItems={item.subItems?.map(sub => ({
              ...sub,
              isActive: activeItem === sub.label,
              onClick: () => handleNavItemClick(sub.label)
            }))}
          />
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-border space-y-1.5">
        {bottomNavigationItems.map((item) => (
          <NavItem 
            key={item.label} 
            {...item} 
            isActive={activeItem === item.label} 
            onClick={() => handleNavItemClick(item.label)} 
          />
        ))}
      </div>
    </aside>
  );
};

export default SidebarNav;
