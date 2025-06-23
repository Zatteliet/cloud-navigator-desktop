
import { useState } from "react";
import { 
  Home, 
  Star, 
  Share2, 
  Trash2, 
  Cloud, 
  Settings,
  ChevronDown,
  ChevronRight,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileExplorerSidebarProps {
  onNavigate: (folderId: string) => void;
  currentFolderId: string;
}

export const FileExplorerSidebar = ({ onNavigate, currentFolderId }: FileExplorerSidebarProps) => {
  const [isMyDriveExpanded, setIsMyDriveExpanded] = useState(true);

  const sidebarItems = [
    { id: "root", label: "My Drive", icon: Home, active: currentFolderId === "root" },
    { id: "starred", label: "Starred", icon: Star, active: currentFolderId === "starred" },
    { id: "shared", label: "Shared with me", icon: Share2, active: currentFolderId === "shared" },
    { id: "trash", label: "Trash", icon: Trash2, active: currentFolderId === "trash" },
  ];

  return (
    <div className="w-64 bg-black border-r border-gray-800 flex flex-col">
      {/* New Button */}
      <div className="p-4">
        <Button className="w-full bg-white text-black hover:bg-gray-200 flex items-center gap-2">
          <Plus size={16} />
          New
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-900 transition-colors ${
              item.active ? "bg-gray-900 text-cyan-400 border-l-2 border-cyan-400" : "text-gray-300"
            }`}
          >
            <item.icon size={18} />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}

        {/* My Drive Expandable Section */}
        <div className="mt-4">
          <button
            onClick={() => setIsMyDriveExpanded(!isMyDriveExpanded)}
            className="w-full flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white transition-colors"
          >
            {isMyDriveExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span className="text-sm">Quick Access</span>
          </button>
          
          {isMyDriveExpanded && (
            <div className="ml-4 space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-900 transition-colors text-gray-300">
                <Cloud size={16} />
                <span className="text-sm">Recent</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Storage Info */}
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-400 mb-2">Storage</div>
        <div className="w-full bg-gray-800 h-2 mb-2">
          <div className="bg-cyan-600 h-2" style={{ width: "45%" }}></div>
        </div>
        <div className="text-xs text-gray-400">4.5 GB of 15 GB used</div>
      </div>

      {/* Settings */}
      <div className="p-2 border-t border-gray-800">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-900 transition-colors text-gray-300">
          <Settings size={16} />
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
};
