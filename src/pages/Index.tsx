import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PageHeader from '../components/Dashboard/PageHeader';
import MetricCards from '../components/Dashboard/MetricCards';
import FunnelChart from '../components/Dashboard/FunnelChart';
import PieChart from '../components/Dashboard/PieChart';
import LeadsTrackingGraph from '../components/Dashboard/LeadsTrackingGraph';
import StatCards from '../components/Dashboard/StatCards';

/**
 * LeadsDashboardPage is the main page for the Leads Dashboard.
 * It assembles various dashboard components within the MainAppLayout.
 * This page corresponds to the "Dashboard Overview" target page.
 */
const LeadsDashboardPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* 
        The main content container. 
        Layout Requirements specify: mainContent.container: "grid gap-6".
        This div applies that styling, making each direct child a grid item.
      */}
      <div className="grid gap-6">
        <PageHeader />
        <MetricCards />
        
        {/* 
          A dedicated grid section for FunnelChart and PieChart 
          to arrange them side-by-side on larger screens.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <FunnelChart className="lg:col-span-3" /> {/* FunnelChart takes 3/5 of the width */}
          <PieChart className="lg:col-span-2" />    {/* PieChart takes 2/5 of the width */}
        </div>
        
        <LeadsTrackingGraph />
        <StatCards />
      </div>
    </MainAppLayout>
  );
};

export default LeadsDashboardPage;
