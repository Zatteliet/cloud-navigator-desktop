
import { 
  Folder, 
  FileText, 
  Image, 
  FileSpreadsheet,
  Star,
  Share2,
  MoreVertical
} from "lucide-react";
import { FileItem } from "./FileExplorer";

interface FileGridItemProps {
  file: FileItem;
  isSelected: boolean;
  onFolderOpen: (folderId: string) => void;
  onItemSelect: (itemId: string, isSelected: boolean) => void;
}

export const FileGridItem = ({ 
  file, 
  isSelected, 
  onFolderOpen, 
  onItemSelect 
}: FileGridItemProps) => {
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

  const handleItemClick = () => {
    if (file.type === "folder") {
      onFolderOpen(file.id);
    }
  };

  const handleItemSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    onItemSelect(file.id, event.target.checked);
  };

  const Icon = getFileIcon(file);

  return (
    <div
      className={`group relative p-3 border cursor-pointer transition-all hover:bg-gray-900 ${
        isSelected 
          ? "bg-cyan-900/50 border-cyan-600" 
          : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
      }`}
      onClick={handleItemClick}
    >
      {/* Selection Checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleItemSelectChange}
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
      <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-800">
        <MoreVertical size={16} className="text-gray-400" />
      </button>
    </div>
  );
};
