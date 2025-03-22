import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays } from "date-fns";

interface TimelineEntry {
  date: string;
  entryCount: number;
}

interface EntryHeatmapProps {
  timeline: TimelineEntry[];
}

const EntryHeatmap: React.FC<EntryHeatmapProps> = ({ timeline }) => {
  return (
    <div>
      <CalendarHeatmap
        startDate={subDays(new Date(), 365)}
        endDate={new Date()}
        values={timeline.map((day) => ({
          date: day.date,
          count: day.entryCount,
        }))}
        classForValue={(value) => {
          if (!value) return "color-empty";
          return `color-scale-${Math.min(value.count, 4)}`;
        }}
      />
    </div>
  );
};

export default EntryHeatmap;
