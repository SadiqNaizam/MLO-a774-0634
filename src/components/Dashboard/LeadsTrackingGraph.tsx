import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Area } from 'recharts';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const leadsTrackingData = [
    { month: 'March', closedWon: 68, closedLost: 58 },
    { month: 'April', closedWon: 20, closedLost: 40 },
    { month: 'May', closedWon: 65, closedLost: 70 },
    { month: 'June', closedWon: 80, closedLost: 10 },
    { month: 'July', closedWon: 60, closedLost: 45 },
    { month: 'August', closedWon: 30, closedLost: 85 },
];

interface LeadsTrackingGraphProps {
  className?: string;
}

type ActiveTab = 'leadsCame' | 'leadsConverted' | 'totalDealsSize';

const LeadsTrackingGraph: React.FC<LeadsTrackingGraphProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>('leadsConverted');

  const CustomRechartsTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border rounded-md shadow-lg">
          <p className="font-semibold text-sm text-foreground mb-1">{label}</p>
          {payload.map((pld: any) => (
            <div key={pld.dataKey} style={{ color: pld.stroke }} className="text-xs flex items-center">
              <span className="h-2 w-2 rounded-full mr-1.5" style={{ backgroundColor: pld.stroke }}></span>
              {pld.dataKey === 'closedWon' ? 'Closed Won' : 'Closed Lost'}: {pld.value}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
  
  const renderCustomLegend = () => (
    <div className="flex items-center justify-center space-x-6 mt-4">
      <div className="flex items-center text-sm text-muted-foreground">
        <span className="h-2.5 w-2.5 rounded-full mr-2" style={{ backgroundColor: 'hsl(var(--custom-accent-green))' }} />
        Closed won
      </div>
      <div className="flex items-center text-sm text-muted-foreground">
        <span className="h-2.5 w-2.5 rounded-full mr-2" style={{ backgroundColor: 'hsl(var(--destructive))' }} />
        Closed lost
      </div>
    </div>
  );

  return (
    <Card className={cn("w-full shadow-sm bg-card text-card-foreground", className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className='mb-4 sm:mb-0'>
            <CardTitle className="text-xl font-semibold text-foreground">Leads tracking</CardTitle>
            <div className="mt-1 flex items-baseline flex-wrap">
              <span className="text-3xl font-bold text-foreground">680</span>
              <span className="ml-1.5 mr-4 text-sm text-muted-foreground">total closed</span>
              <span className="text-3xl font-bold text-foreground">70</span>
              <span className="ml-1.5 text-sm text-muted-foreground">total lost</span>
            </div>
          </div>
          <div className="flex space-x-1 p-0.5 bg-muted rounded-md self-start sm:self-center">
            {(['Leads came', 'Leads Converted', 'Total deals size'] as const).map(tabName => {
                const tabVal = tabName.toLowerCase().replace(/\s+/g, '') as ActiveTab;
                return (
                    <Button 
                        key={tabName} 
                        variant={activeTab === tabVal ? "default" : "ghost"} 
                        size="sm" 
                        onClick={() => setActiveTab(tabVal)} 
                        className={cn(
                            "text-xs px-3 py-1 h-auto transition-all duration-150 ease-in-out", 
                            activeTab === tabVal 
                                ? "bg-background text-foreground shadow-sm" 
                                : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                        )}
                    >
                        {tabName}
                    </Button>
                );
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent className='pt-2 sm:pt-4'>
        <div className="w-full h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 0" vertical={false} stroke="hsl(var(--border) / 0.5)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} dy={10} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} domain={[0, 'dataMax + 10']}/>
              <RechartsTooltip content={<CustomRechartsTooltip />} cursor={{ stroke: 'hsl(var(--ring))', strokeWidth: 1.5, strokeDasharray: '3 3' }} />
              <defs>
                <linearGradient id="colorClosedWonGraph" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--custom-accent-green))" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="hsl(var(--custom-accent-green))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLostGraph" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="closedWon"
                stroke="hsl(var(--custom-accent-green))"
                fillOpacity={1}
                fill="url(#colorClosedWonGraph)"
                strokeWidth={2.5}
                dot={{ r: 4, strokeWidth: 2, fill: "hsl(var(--custom-accent-green))", stroke: "hsl(var(--card))" }}
                activeDot={{ r: 6, strokeWidth: 2, fill: "hsl(var(--custom-accent-green))", stroke: "hsl(var(--card))" }}
              />
              <Area
                type="monotone"
                dataKey="closedLost"
                stroke="hsl(var(--destructive))"
                fillOpacity={1}
                fill="url(#colorClosedLostGraph)"
                strokeWidth={2.5}
                dot={{ r: 4, strokeWidth: 2, fill: "hsl(var(--destructive))", stroke: "hsl(var(--card))" }}
                activeDot={{ r: 6, strokeWidth: 2, fill: "hsl(var(--destructive))", stroke: "hsl(var(--card))" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {renderCustomLegend()}
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingGraph;