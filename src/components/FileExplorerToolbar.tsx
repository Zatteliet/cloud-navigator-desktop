
import { 
  Search, 
  Grid3X3, 
  List, 
  SortAsc,
  Filter,
  Upload,
  FolderPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileExplorerToolbarProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
}

export const FileExplorerToolbar = ({
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
  selectedCount,
  totalCount,
  onSelectAll
}: FileExplorerToolbarProps) => {
  return (
    <div className="bg-black border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search in Drive"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-cyan-600 focus:outline-none w-80"
            />
          </div>

          {/* Selection Info */}
          {selectedCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{selectedCount} of {totalCount} selected</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSelectAll}
                className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/20"
              >
                {selectedCount === totalCount ? "Deselect all" : "Select all"}
              </Button>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Quick Actions */}
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <Upload size={16} className="mr-2" />
            Upload
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <FolderPlus size={16} className="mr-2" />
            New Folder
          </Button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-700 mx-2" />

          {/* Filters and Sort */}
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <Filter size={16} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <SortAsc size={16} />
          </Button>

          {/* View Toggle */}
          <div className="flex bg-gray-900 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className={`p-2 ${
                viewMode === "grid" 
                  ? "bg-cyan-600 text-white" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Grid3X3 size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange("list")}
              className={`p-2 ${
                viewMode === "list" 
                  ? "bg-cyan-600 text-white" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <List size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
