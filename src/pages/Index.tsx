
import { FileExplorer } from "@/components/FileExplorer";
import { TopNavigation } from "@/components/TopNavigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <TopNavigation />
      <div className="px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <FileExplorer />
        </div>
      </div>
    </div>
  );
};

export default Index;
