import React, { useState } from "react";
import { FormField, FormItem } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";

const CauseRankingStep = ({ form }: any) => {
  const [allowDynamicPriorities, setAllowDynamicPriorities] = useState(false);
  const selectedCauses = form.watch("selectedCauses") || [];
  const rankedCauses = form.watch("rankedCauses") || selectedCauses;

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(rankedCauses);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    form.setValue("rankedCauses", items);
  };

  return (
    <FormField
      control={form.control}
      name="rankedCauses"
      render={() => (
        <FormItem>
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Hey there!</h2>
              <p className="text-gray-600">
                Drag and drop to rank the categories by priority
              </p>
              <p className="text-sm text-gray-500">
                (you can always come back and change them)
              </p>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div className="space-y-1">
                <h3 className="font-medium">Allow Dynamic Priorities</h3>
                <p className="text-sm text-gray-500">
                  Turning on this feature allows the platform to change your priorities
                  over time based on your manual donations
                </p>
              </div>
              <Switch
                checked={allowDynamicPriorities}
                onCheckedChange={setAllowDynamicPriorities}
              />
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="causes">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {rankedCauses.map((cause: string, index: number) => (
                      <Draggable
                        key={cause}
                        draggableId={cause}
                        index={index}
                      >
                        {(provided) => (
                          <motion.div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="p-4 bg-white flex items-center justify-between">
                              <span className="font-medium text-gray-700">
                                {index + 1}. {cause}
                              </span>
                            </Card>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </FormItem>
      )}
    />
  );
};

export default CauseRankingStep;