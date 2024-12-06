import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface AllocationOption {
  id: number;
  name: string;
  description: string;
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

interface AllocationCardProps {
  option: AllocationOption;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export const AllocationCard = ({ option, isSelected, onSelect }: AllocationCardProps) => {
  const topFiveCauses = option.data.slice(0, 5);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card
        className={`p-6 cursor-pointer transition-all hover:shadow-xl ${
          isSelected 
            ? "ring-2 ring-primary shadow-lg shadow-primary/20" 
            : "hover:shadow-lg hover:shadow-primary/10"
        }`}
        onClick={() => onSelect(option.id)}
      >
        <h3 className="text-2xl font-bold mb-2 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {option.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 text-center">
          {option.description}
        </p>
        <div className="h-64 mb-4">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={topFiveCauses}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {topFiveCauses.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="transition-all duration-300"
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
};