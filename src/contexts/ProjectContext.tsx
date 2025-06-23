
import { createContext, useContext, useState, ReactNode } from 'react';

export interface Project {
  id: string;
  name: string;
  description?: string;
  created: string;
}

interface ProjectContextType {
  currentProject: Project | null;
  projects: Project[];
  setCurrentProject: (project: Project) => void;
  addProject: (project: Omit<Project, 'id' | 'created'>) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

// Mock projects data
const mockProjects: Project[] = [
  { id: '1', name: 'Personal Files', description: 'My personal documents and files', created: '2024-01-15' },
  { id: '2', name: 'Work Projects', description: 'Work-related documents and presentations', created: '2024-02-01' },
  { id: '3', name: 'Photos & Media', description: 'Family photos and media files', created: '2024-01-20' },
];

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const addProject = (projectData: Omit<Project, 'id' | 'created'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      created: new Date().toISOString().split('T')[0],
    };
    setProjects(prev => [...prev, newProject]);
  };

  return (
    <ProjectContext.Provider value={{
      currentProject,
      projects,
      setCurrentProject,
      addProject,
    }}>
      {children}
    </ProjectContext.Provider>
  );
};
