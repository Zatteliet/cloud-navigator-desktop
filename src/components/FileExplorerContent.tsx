
import { FileItem } from "./FileExplorer";
import { 
  Folder, 
  FileText, 
  Image, 
  FileSpreadsheet,
  Star,
  Share2,
  MoreVertical
} from "lucide-react";

interface FileExplorerContentProps {
  files: FileItem[];
  viewMode: "grid" | "list";
  selectedItems: string[];
  onFolderOpen: (folderId: string) => void;
  onItemSelect: (itemId: string, isSelected: boolean) => void;
}

export const FileExplorerContent = ({ 
  files, 
  viewMode, 
  selectedItems, 
  onFolderOpen, 
  onItemSelect 
}: FileExplorerContentProps) => {
  const getFileIcon = (file: FileItem) => {
    if (file.type === "folder") return Folder;
    
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return Image;
      case 'xlsx':
      case 'xls':
        return FileSpreadsheet;
      default:
        return FileText;
    }
  };

  const handleItemClick = (file: FileItem) => {
    if (file.type === "folder") {
      onFolderOpen(file.id);
    }
  };

  const handleItemSelectChange = (itemId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    onItemSelect(itemId, event.target.checked);
  };

  if (files.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <Folder size={64} className="mx-auto mb-4 opacity-50" />
          <p>This folder is empty</p>
        </div>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {files.map((file) => {
            const Icon = getFileIcon(file);
            const isSelected = selectedItems.includes(file.id);
            
            return (
              <div
                key={file.id}
                className={`group relative p-3 rounded-lg border cursor-pointer transition-all hover:bg-gray-900 ${
                  isSelected 
                    ? "bg-cyan-900/50 border-cyan-600" 
                    : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                }`}
                onClick={() => handleItemClick(file)}
              >
                {/* Selection Checkbox */}
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => handleItemSelectChange(file.id, e)}
                  className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity accent-cyan-600"
                />
                
                {/* File Icon */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-2">
                    <Icon 
                      size={48} 
                      className={`${
                        file.type === "folder" ? "text-cyan-400" : "text-gray-400"
                      }`} 
                    />
                    {file.starred && (
                      <Star size={16} className="absolute -top-1 -right-1 text-yellow-400 fill-yellow-400" />
                    )}
                    {file.shared && (
                      <Share2 size={16} className="absolute -bottom-1 -right-1 text-blue-400" />
                    )}
                  </div>
                  
                  {/* File Name */}
                  <div className="text-sm text-white truncate w-full" title={file.name}>
                    {file.name}
                  </div>
                  
                  {/* File Info */}
                  <div className="text-xs text-gray-500 mt-1">
                    {file.size && <div>{file.size}</div>}
                    <div>{file.modified}</div>
                  </div>
                </div>

                {/* More Options */}
                <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-800 rounded">
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="flex-1 overflow-auto">
      <div className="min-w-full">
        {/* Header */}
        <div className="sticky top-0 bg-black border-b border-gray-800 px-6 py-3">
          <div className="grid grid-cols-12 gap-4 text-sm text-gray-400 font-medium">
            <div className="col-span-1"></div>
            <div className="col-span-5">Name</div>
            <div className="col-span-2">Modified</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-2"></div>
          </div>
        </div>

        {/* File List */}
        <div className="px-6">
          {files.map((file) => {
            const Icon = getFileIcon(file);
            const isSelected = selectedItems.includes(file.id);
            
            return (
              <div
                key={file.id}
                className={`group grid grid-cols-12 gap-4 py-3 rounded-lg cursor-pointer transition-all hover:bg-gray-900 ${
                  isSelected ? "bg-cyan-900/50" : ""
                }`}
                onClick={() => handleItemClick(file)}
              >
                {/* Selection */}
                <div className="col-span-1 flex items-center">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => handleItemSelectChange(file.id, e)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity accent-cyan-600"
                  />
                </div>

                {/* Name */}
                <div className="col-span-5 flex items-center gap-3">
                  <div className="relative">
                    <Icon 
                      size={20} 
                      className={`${
                        file.type === "folder" ? "text-cyan-400" : "text-gray-400"
                      }`} 
                    />
                    {file.starred && (
                      <Star size={12} className="absolute -top-1 -right-1 text-yellow-400 fill-yellow-400" />
                    )}
                  </div>
                  <span className="text-white truncate">{file.name}</span>
                  {file.shared && (
                    <Share2 size={14} className="text-blue-400" />
                  )}
                </div>

                {/* Modified */}
                <div className="col-span-2 flex items-center text-gray-400 text-sm">
                  {file.modified}
                </div>

                {/* Size */}
                <div className="col-span-2 flex items-center text-gray-400 text-sm">
                  {file.size || "—"}
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center justify-end">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-800 rounded">
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
