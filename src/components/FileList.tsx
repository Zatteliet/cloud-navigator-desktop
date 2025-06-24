
import { FileItem } from "./FileExplorer";
import { FileListItem } from "./FileListItem";

interface FileListProps {
  files: FileItem[];
  selectedItems: string[];
  onFolderOpen: (folderId: string) => void;
  onItemSelect: (itemId: string, isSelected: boolean) => void;
}

export const FileList = ({ 
  files, 
  selectedItems, 
  onFolderOpen, 
  onItemSelect 
}: FileListProps) => {
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
          {files.map((file) => (
            <FileListItem
              key={file.id}
              file={file}
              isSelected={selectedItems.includes(file.id)}
              onFolderOpen={onFolderOpen}
              onItemSelect={onItemSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
