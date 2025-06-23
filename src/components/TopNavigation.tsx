
import { Search, Bell, HelpCircle, Settings, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProject } from "@/contexts/ProjectContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export const TopNavigation = () => {
  const { currentProject, projects, setCurrentProject } = useProject();
  const navigate = useNavigate();

  const handleProjectChange = (project: any) => {
    setCurrentProject(project);
  };

  const handleBackToProjects = () => {
    navigate('/');
  };

  return (
    <nav className="bg-black border-b border-gray-800 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo and Project Selector */}
        <div className="flex items-center gap-4">
          <div className="text-white text-xl font-semibold">
            Drive
          </div>
          
          {currentProject && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-gray-800 flex items-center gap-2">
                  <span>{currentProject.name}</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                {projects.map((project) => (
                  <DropdownMenuItem
                    key={project.id}
                    onClick={() => handleProjectChange(project)}
                    className="hover:bg-gray-800 cursor-pointer"
                  >
                    {project.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  onClick={handleBackToProjects}
                  className="hover:bg-gray-800 cursor-pointer border-t border-gray-700 mt-2 pt-2"
                >
                  Switch Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Right side options */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
            <HelpCircle size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
            <Settings size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
            <Bell size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
            <User size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
};
