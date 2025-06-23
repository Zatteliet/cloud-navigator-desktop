
import { ChevronRight, Home } from "lucide-react";
import { FileItem } from "./FileExplorer";

interface FileExplorerBreadcrumbProps {
  currentFolderId: string;
  onNavigate: (folderId: string) => void;
  files: FileItem[];
}

export const FileExplorerBreadcrumb = ({ 
  currentFolderId, 
  onNavigate, 
  files 
}: FileExplorerBreadcrumbProps) => {
  const getBreadcrumbPath = () => {
    const path = [];
    let currentId = currentFolderId;
    
    // Special handling for non-folder views
    if (currentId === "starred") {
      return [{ id: "starred", name: "Starred" }];
    }
    if (currentId === "shared") {
      return [{ id: "shared", name: "Shared with me" }];
    }
    if (currentId === "trash") {
      return [{ id: "trash", name: "Trash" }];
    }
    
    // Build path for folder navigation
    while (currentId && currentId !== "root") {
      const folder = files.find(f => f.id === currentId && f.type === "folder");
      if (folder) {
        path.unshift({ id: folder.id, name: folder.name });
        currentId = folder.parentId || "root";
      } else {
        break;
      }
    }
    
    // Add root
    path.unshift({ id: "root", name: "My Drive" });
    
    return path;
  };

  const breadcrumbPath = getBreadcrumbPath();

  return (
    <div className="bg-black border-b border-gray-800 px-6 py-3">
      <div className="flex items-center gap-2 text-sm">
        {breadcrumbPath.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2">
            {index === 0 && <Home size={16} className="text-gray-400" />}
            
            <button
              onClick={() => onNavigate(item.id)}
              className={`hover:text-cyan-400 transition-colors ${
                index === breadcrumbPath.length - 1
                  ? "text-white font-medium"
                  : "text-gray-400"
              }`}
            >
              {item.name}
            </button>
            
            {index < breadcrumbPath.length - 1 && (
              <ChevronRight size={16} className="text-gray-600" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
