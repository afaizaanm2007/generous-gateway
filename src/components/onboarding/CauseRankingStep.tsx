import React from "react";
import { FormField, FormItem } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: string;
  index: number;
}

const SortableItem = ({ id, index }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 bg-white flex items-center justify-between transition-all duration-200 hover:shadow-md cursor-move"
    >
      <span className="font-medium text-gray-700 flex-1">
        {index + 1}. {id}
      </span>
    </Card>
  );
};

const CauseRankingStep = ({ form }: any) => {
  const [allowDynamicPriorities, setAllowDynamicPriorities] = React.useState(false);
  const selectedCauses = form.watch("selectedCauses") || [];

  React.useEffect(() => {
    if (!form.getValues("rankedCauses")) {
      form.setValue("rankedCauses", selectedCauses);
    }
  }, [selectedCauses, form]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const rankedCauses = form.watch("rankedCauses") || [];

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = rankedCauses.indexOf(active.id);
      const newIndex = rankedCauses.indexOf(over.id);
      const newOrder = arrayMove(rankedCauses, oldIndex, newIndex);
      form.setValue("rankedCauses", newOrder, { 
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true 
      });
    }
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

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={rankedCauses}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {rankedCauses.map((cause: string, index: number) => (
                    <SortableItem key={cause} id={cause} index={index} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </FormItem>
      )}
    />
  );
};

export default CauseRankingStep;