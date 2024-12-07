import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface DetailViewProps {
  option: {
    id: number;
    name: string;
    description: string;
    data: Array<{
      name: string;
      value: number;
      color: string;
    }>;
  };
  onClose: () => void;
}

export const DetailView = ({ option, onClose }: DetailViewProps) => {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={onClose}
      >
        <X className="mr-2 h-4 w-4" /> Back to Options
      </Button>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {option.name}
          </h2>
          <p className="text-gray-600 mb-6">{option.description}</p>
          <div className="w-full aspect-square">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <Pie
                  data={option.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius="90%"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {option.data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      className="transition-all duration-300 hover:opacity-80"
                    />
                  ))}
                </Pie>
                <Legend 
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-xl p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl font-semibold mb-6">Allocation Breakdown</h3>
          <div className="space-y-4">
            {option.data.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="font-mono font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};