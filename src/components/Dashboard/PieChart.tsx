import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip as RechartsTooltip } from 'recharts';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface ChartSourceDisplayData {
  name: string;
  value: number; // Percentage value for chart segment size
  color: string;
  displayValue: string; // e.g., "$3000"
  displayPercentage: string; // e.g., "50%"
}

const chartDisplayData: ChartSourceDisplayData[] = [
    { name: 'Clutch', value: 50, color: 'hsl(var(--destructive))', displayValue: '$3000', displayPercentage: '50%' },
    { name: 'Behance', value: 25, color: 'hsl(var(--custom-accent-orange))', displayValue: '$1000', displayPercentage: '25%' },
    { name: 'Instagram', value: 15, color: 'hsl(var(--custom-accent-green))', displayValue: '$1000', displayPercentage: '15%' },
    { name: 'Dribbble', value: 10, color: 'hsl(195,50%,70%)', displayValue: '$1000', displayPercentage: '10%' }, // Custom Light Blue
];

interface PieChartComponentProps {
  className?: string;
}

const PieChart: React.FC<PieChartComponentProps> = ({ className }) => {

  const CustomRechartsTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: ChartSourceDisplayData = payload[0].payload;
      return (
        <div className="bg-background p-2 border rounded-md shadow-lg text-sm">
          <p className="font-semibold text-foreground">{`${data.name}: ${data.displayPercentage}`}</p>
          <p className="text-xs text-muted-foreground">Value: {data.displayValue}</p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = () => {
    return (
      <ul className="space-y-2.5 mt-4">
        {
          chartDisplayData.map((item: ChartSourceDisplayData) => (
            <li key={`item-${item.name}`} className="grid grid-cols-[minmax(0,_1fr)_auto_auto] gap-x-2 sm:gap-x-4 items-center text-sm">
              <div className="flex items-center min-w-0">
                <span className="h-3 w-3 rounded-sm mr-2 flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-foreground truncate" title={item.name}>{item.name}</span>
              </div>
              <span className="text-muted-foreground text-right">{item.displayValue}</span>
              <div className="flex items-center justify-end">
                <span className="text-muted-foreground w-10 text-right">{item.displayPercentage}</span>
                 {item.name === 'Dribbble' && ( 
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                           <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground cursor-help opacity-60 hover:opacity-100 flex-shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-900 text-white p-1.5 rounded text-xs shadow-lg border-transparent font-medium">
                           From leads total
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
              </div>
            </li>
          ))}
      </ul>
    );
  };

  return (
    <Card className={cn("w-full shadow-sm bg-card text-card-foreground", className)}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-foreground">Sources</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-48 sm:h-52 md:h-48 lg:h-52 xl:h-56">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={chartDisplayData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="85%"
                innerRadius="60%"
                fill="#8884d8"
                dataKey="value"
                stroke="hsl(var(--card))" 
                strokeWidth={3}
              >
                {chartDisplayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip content={<CustomRechartsTooltip />} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
        {renderLegend()}
      </CardContent>
    </Card>
  );
};

export default PieChart;