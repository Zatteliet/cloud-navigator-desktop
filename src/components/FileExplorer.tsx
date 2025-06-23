
import { useState } from "react";
import { FileExplorerSidebar } from "./FileExplorerSidebar";
import { FileExplorerContent } from "./FileExplorerContent";
import { FileExplorerToolbar } from "./FileExplorerToolbar";
import { FileExplorerBreadcrumb } from "./FileExplorerBreadcrumb";

export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: string;
  modified: string;
  starred?: boolean;
  shared?: boolean;
  parentId?: string;
}

export const FileExplorer = () => {
  const [currentFolderId, setCurrentFolderId] = useState<string>("root");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Mock data - in a real app, this would come from an API
  const files: FileItem[] = [
    { id: "1", name: "Documents", type: "folder", modified: "2 days ago", parentId: "root" },
    { id: "2", name: "Images", type: "folder", modified: "1 week ago", starred: true, parentId: "root" },
    { id: "3", name: "Project Proposal.pdf", type: "file", size: "2.4 MB", modified: "3 hours ago", parentId: "root" },
    { id: "4", name: "Screenshot.png", type: "file", size: "1.2 MB", modified: "1 day ago", shared: true, parentId: "root" },
    { id: "5", name: "Budget.xlsx", type: "file", size: "854 KB", modified: "5 days ago", parentId: "1" },
    { id: "6", name: "Meeting Notes.docx", type: "file", size: "234 KB", modified: "1 week ago", parentId: "1" },
  ];

  const currentFiles = files.filter(file => file.parentId === currentFolderId);
  const filteredFiles = searchQuery 
    ? currentFiles.filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : currentFiles;

  const handleFolderOpen = (folderId: string) => {
    setCurrentFolderId(folderId);
    setSelectedItems([]);
  };

  const handleItemSelect = (itemId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredFiles.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredFiles.map(file => file.id));
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <FileExplorerSidebar 
        onNavigate={setCurrentFolderId}
        currentFolderId={currentFolderId}
      />
      
      <div className="flex-1 flex flex-col">
        <FileExplorerToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCount={selectedItems.length}
          totalCount={filteredFiles.length}
          onSelectAll={handleSelectAll}
        />
        
        <FileExplorerBreadcrumb 
          currentFolderId={currentFolderId}
          onNavigate={setCurrentFolderId}
          files={files}
        />
        
        <FileExplorerContent
          files={filteredFiles}
          viewMode={viewMode}
          selectedItems={selectedItems}
          onFolderOpen={handleFolderOpen}
          onItemSelect={handleItemSelect}
        />
      </div>
    </div>
  );
};
