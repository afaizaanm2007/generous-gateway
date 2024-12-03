import React, { useState } from "react";
import { FormField, FormItem } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { motion, AnimatePresence } from "framer-motion";
import { GripVertical } from "lucide-react";

const CauseRankingStep = ({ form }: any) => {
  const [allowDynamicPriorities, setAllowDynamicPriorities] = useState(false);
  const selectedCauses = form.watch("selectedCauses") || [];

  React.useEffect(() => {
    // Initialize rankedCauses with selectedCauses if not already set
    if (!form.getValues("rankedCauses")) {
      form.setValue("rankedCauses", selectedCauses);
    }
  }, [selectedCauses, form]);

  const rankedCauses = form.watch("rankedCauses") || [];

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

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="causes">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    <AnimatePresence>
                      {rankedCauses.map((cause: string, index: number) => (
                        <Draggable
                          key={cause}
                          draggableId={cause}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{
                                duration: 0.2,
                                delay: index * 0.05,
                              }}
                            >
                              <Card 
                                className={`p-4 bg-white flex items-center justify-between cursor-grab active:cursor-grabbing ${
                                  snapshot.isDragging ? "shadow-lg" : ""
                                }`}
                              >
                                <span className="font-medium text-gray-700 flex-1">
                                  {index + 1}. {cause}
                                </span>
                                <div className="text-gray-400">
                                  <GripVertical size={20} />
                                </div>
                              </Card>
                            </motion.div>
                          )}
                        </Draggable>
                      ))}
                    </AnimatePresence>
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