import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

interface Collection {
  id: string;
  name: string;
}
interface Entry {
  id: string;
  content: string;
  collection?: Collection;
}

interface CategoryPieChartProps {
  entries: Entry[];
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ entries }) => {
  // Group entries by collection name instead of ID
  const categoryData = entries.reduce((acc, entry) => {
    const category = entry.collection ? entry.collection.name : "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Convert data to Recharts format
  const data = Object.keys(categoryData).map((key, index) => ({
    name: key,
    value: categoryData[key],
    color: COLORS[index % COLORS.length],
  }));

  return (
    <PieChart width={400} height={150}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={50}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CategoryPieChart;
