
import { useProject } from "@/contexts/ProjectContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, Folder } from "lucide-react";

const ProjectSelect = () => {
  const { projects, setCurrentProject } = useProject();
  const navigate = useNavigate();

  const handleProjectSelect = (project: any) => {
    setCurrentProject(project);
    navigate('/drive');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Select a Project</h1>
            <p className="text-gray-400 text-lg">Choose a project to access your files</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectSelect(project)}
                className="bg-gray-900 border border-gray-800 p-6 cursor-pointer hover:border-cyan-500 hover:bg-gray-800 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-600 p-3">
                    <Folder size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                    <p className="text-gray-500 text-xs">Created: {project.created}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3">
              <Plus size={20} className="mr-2" />
              Create New Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSelect;
