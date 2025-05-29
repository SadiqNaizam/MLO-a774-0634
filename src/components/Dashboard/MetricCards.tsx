import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, Clock, BarChartHorizontalBig } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IndividualMetricCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ElementType;
  iconColor?: string;
  change?: string;
  changeType?: 'positive' | 'negative';
}

const IndividualMetricCard: React.FC<IndividualMetricCardProps> = ({ title, value, description, icon: Icon, iconColor, change, changeType }) => {
  return (
    <Card className="shadow-sm bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-5 w-5", iconColor || 'text-muted-foreground')} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground pt-1">{description}</p>
        )}
        {change && (
          <p className={cn(
            "text-xs mt-1",
            changeType === 'positive' ? 'text-accent-green' : 'text-destructive'
          )}>
            {changeType === 'positive' ? '+' : ''}{change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};


interface MetricCardsProps {
  className?: string;
}

const MetricCards: React.FC<MetricCardsProps> = ({ className }) => {
  const metricsData: IndividualMetricCardProps[] = [
    {
      title: 'New Leads (Today)',
      value: '73',
      icon: Users,
      iconColor: 'text-primary',
      change: '15.3%',
      changeType: 'positive' as const,
    },
    {
      title: 'Overall Conversion Rate',
      value: '27.5%',
      icon: TrendingUp,
      iconColor: 'text-accent-green',
      description: 'Last 30 days',
    },
    {
      title: 'Avg. Response Time',
      value: '2.1h',
      icon: Clock,
      iconColor: 'text-accent-orange',
      change: '5.2%',
      changeType: 'negative' as const, // Negative change is good for response time
    },
     {
      title: 'Active Campaigns',
      value: '12',
      icon: BarChartHorizontalBig, 
      iconColor: 'text-purple-500',
      description: 'Across all platforms',
    }
  ];

  return (
    <div className={cn("grid gap-6 md:grid-cols-2 xl:grid-cols-4", className)}>
      {metricsData.map((metric, index) => (
        <IndividualMetricCard
          key={index} // Using index as key because metric id is not part of props definition
          title={metric.title}
          value={metric.value}
          description={metric.description}
          icon={metric.icon}
          iconColor={metric.iconColor}
          change={metric.change}
          changeType={metric.changeType}
        />
      ))}
    </div>
  );
};

export default MetricCards;