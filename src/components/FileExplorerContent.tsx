
import { FileItem } from "./FileExplorer";
import { EmptyFolder } from "./EmptyFolder";
import { FileGrid } from "./FileGrid";
import { FileList } from "./FileList";

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
  if (files.length === 0) {
    return <EmptyFolder />;
  }

  if (viewMode === "grid") {
    return (
      <FileGrid
        files={files}
        selectedItems={selectedItems}
        onFolderOpen={onFolderOpen}
        onItemSelect={onItemSelect}
      />
    );
  }

  return (
    <FileList
      files={files}
      selectedItems={selectedItems}
      onFolderOpen={onFolderOpen}
      onItemSelect={onItemSelect}
    />
  );
};
