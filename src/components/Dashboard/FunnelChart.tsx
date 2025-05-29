import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface FunnelStageData {
  name: string;
  count: number;
  value: number; 
  time: string;
  actualTime?: string; // For stages like "In conversation" that might have a specific display for time
  color: string;
}

const funnelStagesData: FunnelStageData[] = [
  { name: 'Discovery', count: 200, value: 200, time: '2 days', color: 'hsl(var(--destructive))' },
  { name: 'Qualified', count: 100, value: 100, time: '2 days', color: 'hsl(var(--custom-accent-orange))' },
  { name: 'In conversation', count: 50, value: 100, time: 'average', actualTime: '5 days', color: 'hsl(255,45%,45%)' }, // Custom Purple, slightly adjusted
  { name: 'Negotiations', count: 20, value: 50, time: '8 days', color: 'hsl(var(--custom-accent-green))' },
  { name: 'Closed won', count: 20, value: 50, time: '10 days', color: 'hsl(var(--primary))' },
];

const chartDataForStackedBar = [{
  name: 'Leads Funnel',
  Discovery: funnelStagesData.find(s => s.name === 'Discovery')?.count ?? 0,
  Qualified: funnelStagesData.find(s => s.name === 'Qualified')?.count ?? 0,
  'In conversation': funnelStagesData.find(s => s.name === 'In conversation')?.count ?? 0,
  Negotiations: funnelStagesData.find(s => s.name === 'Negotiations')?.count ?? 0,
  'Closed won': funnelStagesData.find(s => s.name === 'Closed won')?.count ?? 0,
}];

interface FunnelChartProps {
  className?: string;
}

const FunnelChart: React.FC<FunnelChartProps> = ({ className }) => {
  
  const StageTooltipRecharts = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const stageName = payload[0].name; 
      const stageData = funnelStagesData.find(s => s.name === stageName);
      if (stageData) {
        return (
          <div className="bg-background p-2 border rounded-md shadow-lg text-sm">
            <p className="font-semibold text-foreground">{stageData.name}: {stageData.count}</p>
          </div>
        );
      }
    }
    return null;
  };
  
  return (
    <Card className={cn("w-full shadow-sm bg-card text-card-foreground", className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold text-foreground">Funnel count</CardTitle>
            <div className="mt-1">
              <span className="text-4xl font-bold text-foreground">600</span> 
              <span className="ml-2 text-sm text-muted-foreground">active leads</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-8 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartDataForStackedBar}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              barCategoryGap={0}
            >
              <XAxis type="number" hide domain={[0, 'dataMax']} />
              <YAxis type="category" dataKey="name" hide />
              <RechartsTooltip content={<StageTooltipRecharts />} cursor={{fill: 'transparent'}}/>
              {funnelStagesData.map((stage) => (
                <Bar key={stage.name} dataKey={stage.name} stackId="a" fill={stage.color} radius={0} barSize={32} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-3">
          {funnelStagesData.map((stage) => (
            <div key={stage.name} className="grid grid-cols-[minmax(0,_1fr)_auto_auto_auto] sm:grid-cols-[minmax(0,_2fr)_1fr_1fr_1fr] gap-x-2 sm:gap-x-4 items-center text-sm">
              <div className="flex items-center min-w-0">
                <span className="h-3 w-3 rounded-sm mr-2 flex-shrink-0" style={{ backgroundColor: stage.color }} />
                <span className="text-foreground truncate" title={stage.name}>{stage.name}</span>
              </div>
              <span className="text-muted-foreground text-right">{stage.count}</span>
              <span className="text-muted-foreground text-right">$ {stage.value}</span>
              <div className="flex items-center justify-end text-muted-foreground">
                {stage.time === 'average' && stage.actualTime ? (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center cursor-help">
                          <span className="mr-1">{stage.actualTime}</span> 
                          <Info className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-900 text-white p-1.5 rounded text-xs shadow-lg border-transparent font-medium">
                        Average time on this stage
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <span>{stage.time}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelChart;