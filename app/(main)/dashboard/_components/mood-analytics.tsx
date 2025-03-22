"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MoodAnalyticsSkeleton from "./analytics-loading";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import useFetch from "@/app/hooks/use-fetch";
import { getAnalytics } from "@/app/services/analytics";
import EntryHeatmap from "./entry-heatmap";
import CategoryPieChart from "./category-pie-chart";
import WordCountTrends from "./word-count-trends";
import WordFrequencyCloud from "./word-frequency-cloud";

const timeOptions = [
  { value: "7d", label: "Last 7 Days" },
  { value: "15d", label: "Last 15 Days" },
  { value: "30d", label: "Last 30 Days" },
];

interface Entry {
  id: string;
  content: string;
  title: string;
  createdAt: string;
  collection?: {
    id: string;
    name: string;
  };
}

interface TimelineData {
  date: string;
  entryCount: number;
}

interface Stats {
  totalEntries: number;
  dailyAverage: number;
  averageScore: number;
  mostFrequentMood: string;
}

interface AnalyticsData {
  data: {
    entries: Entry[];
    timeline: TimelineData[];
    stats: Stats;
  };
}

const MoodAnalytics: React.FC = () => {
  const [period, setPeriod] = useState("7d");

  const {
    loading,
    data: analytics,
    fn: fetchAnalytics,
  } = useFetch<AnalyticsData>(getAnalytics);

  useEffect(() => {
    fetchAnalytics(period);
  }, [period]);

  if (loading || !analytics?.data) {
    return <MoodAnalyticsSkeleton />;
  }

  if (!analytics) return null;

  const { timeline, stats } = analytics.data;

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-5xl font-bold gradient-title">Dashboard</h2>

        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {analytics.data.entries.length === 0 ? (
        <div>
          No Entries Found.{" "}
          <Link href="/journal/write" className="underline text-orange-400">
            Write New
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalEntries}</div>
                <p className="text-xs text-muted-foreground">
                  ~{stats.dailyAverage} entries per day
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Mood
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.averageScore}/10
                </div>
                <p className="text-xs text-muted-foreground">
                  Overall mood score
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Mood Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                  {stats.mostFrequentMood}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Journal Entry Frequency */}
          <div className="flex flex-col md:flex-row gap-2">
            <Card className="w-full md:w-1/2">
              <CardHeader>
                <CardTitle>Journal Entry Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <EntryHeatmap timeline={timeline} />
              </CardContent>
            </Card>

            <Card className="w-full md:w-1/2">
              <CardHeader>
                <CardTitle>Category distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <CategoryPieChart entries={analytics.data.entries} />
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Card className="w-full md:w-1/2">
              <CardHeader>
                <CardTitle>Word count trends over time</CardTitle>
              </CardHeader>
              <CardContent>
                <WordCountTrends entries={analytics.data.entries} />
              </CardContent>
            </Card>
            <Card className="w-full md:w-1/2">
              <CardHeader>
                <CardTitle>Word/phrase frequency analysis cloud</CardTitle>
              </CardHeader>
              <CardContent>
                <WordFrequencyCloud entries={analytics.data.entries} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default MoodAnalytics;
