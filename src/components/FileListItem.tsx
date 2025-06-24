
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

interface FileListItemProps {
  file: FileItem;
  isSelected: boolean;
  onFolderOpen: (folderId: string) => void;
  onItemSelect: (itemId: string, isSelected: boolean) => void;
}

export const FileListItem = ({ 
  file, 
  isSelected, 
  onFolderOpen, 
  onItemSelect 
}: FileListItemProps) => {
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
      className={`group grid grid-cols-12 gap-4 py-3 cursor-pointer transition-all hover:bg-gray-900 ${
        isSelected ? "bg-cyan-900/50" : ""
      }`}
      onClick={handleItemClick}
    >
      {/* Selection */}
      <div className="col-span-1 flex items-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleItemSelectChange}
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
        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-800">
          <MoreVertical size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
};
