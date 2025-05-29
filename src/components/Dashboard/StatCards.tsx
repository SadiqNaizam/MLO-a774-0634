import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ReasonLost {
  id: string;
  percentage: string;
  reason: string;
}

const reasonsLostData: ReasonLost[] = [
  { id: 'reason1', percentage: '40%', reason: 'The proposal is unclear' },
  { id: 'reason2', percentage: '20%', reason: 'However venture pursuit' }, // As per image text
  { id: 'reason3', percentage: '10%', reason: 'Other' },
  { id: 'reason4', percentage: '30%', reason: 'The proposal is unclear' }, // Duplicate in image, using as is
];

interface OtherStat {
  id: string;
  value: string;
  label: string;
  tooltip?: string;
}

const otherDataStats: OtherStat[] = [
  { id: 'stat1', value: '900', label: 'total leads count' },
  { id: 'stat2', value: '12', label: 'days in average to convert lead' },
  { id: 'stat3', value: '30', label: 'inactive leads', tooltip: 'Leads with no recorded activity in the last 30 days.' },
];

interface StatCardsProps {
  className?: string;
}

const StatCards: React.FC<StatCardsProps> = ({ className }) => {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6", className)}>
      <Card className="shadow-sm bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
            {reasonsLostData.map((item) => (
              <div key={item.id}>
                <p className="text-3xl lg:text-4xl font-bold text-foreground">{item.percentage}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.reason}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Other data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
            {otherDataStats.map((stat) => (
              <div key={stat.id}>
                <p className="text-3xl lg:text-4xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-muted-foreground leading-relaxed">{stat.label}</p>
                  {stat.tooltip && (
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help flex-shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-popover text-popover-foreground p-2 rounded text-xs shadow-md border max-w-[200px]">
                          {stat.tooltip}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;