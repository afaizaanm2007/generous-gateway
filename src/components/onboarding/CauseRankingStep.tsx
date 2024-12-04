// Polyfill for global
if (typeof window !== 'undefined') {
  (window as any).global = window;
}

import React, { useEffect, useRef } from "react";
import { FormField, FormItem } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import dragula from "dragula";
import "dragula/dist/dragula.css";

const CauseRankingStep = ({ form }: any) => {
  const [allowDynamicPriorities, setAllowDynamicPriorities] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedCauses = form.watch("selectedCauses") || [];

  useEffect(() => {
    if (!form.getValues("rankedCauses")) {
      form.setValue("rankedCauses", selectedCauses);
    }
  }, [selectedCauses, form]);

  useEffect(() => {
    if (containerRef.current) {
      const drake = dragula([containerRef.current], {
        direction: 'vertical',
        revertOnSpill: true
      });
      
      drake.on('drop', () => {
        if (containerRef.current) {
          const newOrder = Array.from(containerRef.current.children).map(
            child => child.getAttribute('data-cause')
          ).filter(Boolean) as string[];
          form.setValue("rankedCauses", newOrder);
        }
      });

      return () => drake.destroy();
    }
  }, [form]);

  const rankedCauses = form.watch("rankedCauses") || [];

  return (
    <FormField
      control={form.control}
      name="rankedCauses"
      render={() => (
        <FormItem>
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Prioritize Your Causes</h2>
              <p className="text-gray-600">
                Drag and drop to rank your selected causes by priority
              </p>
              <p className="text-sm text-gray-500">
                This helps us understand which causes matter most to you
              </p>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div className="space-y-1">
                <h3 className="font-medium">Allow Dynamic Priorities</h3>
                <p className="text-sm text-gray-500">
                  Let the platform adjust your priorities based on your donation patterns
                </p>
              </div>
              <Switch
                checked={allowDynamicPriorities}
                onCheckedChange={setAllowDynamicPriorities}
              />
            </div>

            <div 
              ref={containerRef}
              className="space-y-2"
            >
              {rankedCauses.map((cause: string, index: number) => (
                <Card 
                  key={cause}
                  data-cause={cause}
                  className="p-4 bg-white flex items-center justify-between cursor-move transition-all duration-200 hover:shadow-md"
                >
                  <span className="font-medium text-gray-700 flex-1">
                    {index + 1}. {cause}
                  </span>
                </Card>
              ))}
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

export default CauseRankingStep;