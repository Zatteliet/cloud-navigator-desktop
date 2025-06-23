
import { FileExplorer } from "@/components/FileExplorer";
import { TopNavigation } from "@/components/TopNavigation";
import { useProject } from "@/contexts/ProjectContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { currentProject } = useProject();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentProject) {
      navigate('/projects');
    }
  }, [currentProject, navigate]);

  if (!currentProject) {
    return null;
  }

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
