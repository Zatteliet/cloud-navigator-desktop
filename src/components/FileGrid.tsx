
import { FileItem } from "./FileExplorer";
import { FileGridItem } from "./FileGridItem";

interface FileGridProps {
  files: FileItem[];
  selectedItems: string[];
  onFolderOpen: (folderId: string) => void;
  onItemSelect: (itemId: string, isSelected: boolean) => void;
}

export const FileGrid = ({ 
  files, 
  selectedItems, 
  onFolderOpen, 
  onItemSelect 
}: FileGridProps) => {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {files.map((file) => (
          <FileGridItem
            key={file.id}
            file={file}
            isSelected={selectedItems.includes(file.id)}
            onFolderOpen={onFolderOpen}
            onItemSelect={onItemSelect}
          />
        ))}
      </div>
    </div>
  );
};
