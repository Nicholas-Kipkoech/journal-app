import MoodAnalytics from "./_components/mood-analytics";
import JournalEntries from "./JournalEntries";

const Dashboard = async () => {
  return (
    <div className="px-4 py-8 space-y-8">
      {/* Analytics Section */}
      <section className="space-y-4">
        <MoodAnalytics />
      </section>

      <JournalEntries />
    </div>
  );
};

export default Dashboard;
