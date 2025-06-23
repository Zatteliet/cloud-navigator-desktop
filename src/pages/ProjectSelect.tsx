import { useProject } from "@/contexts/ProjectContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, Folder, Star } from "lucide-react";

const ProjectSelect = () => {
  const { projects, defaultProject, setCurrentProject } = useProject();
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

          {/* Default Project - Special Treatment */}
          <div className="mb-8">
            <div
              onClick={() => handleProjectSelect(defaultProject)}
              className="bg-gray-900 border-2 border-cyan-500 p-8 cursor-pointer hover:border-cyan-400 hover:bg-gray-800 transition-all relative"
            >
              <div className="absolute top-4 right-4">
                <Star size={20} className="text-cyan-500 fill-cyan-500" />
              </div>
              <div className="flex items-start gap-6">
                <div className="bg-cyan-600 p-4">
                  <Folder size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-cyan-400">{defaultProject.name}</h3>
                  <p className="text-gray-300 text-base mb-4">{defaultProject.description}</p>
                  <div className="bg-cyan-900 text-cyan-200 px-3 py-1 text-sm inline-block">
                    Default Drive
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Projects */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-300">Other Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleProjectSelect(project)}
                  className="bg-gray-900 border border-gray-800 p-6 cursor-pointer hover:border-cyan-500 hover:bg-gray-800 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-700 p-3">
                      <Folder size={24} className="text-gray-300" />
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
