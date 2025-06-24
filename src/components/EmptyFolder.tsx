
import { Folder } from "lucide-react";

export const EmptyFolder = () => {
  return (
    <div className="flex-1 flex items-center justify-center text-gray-500">
      <div className="text-center">
        <Folder size={64} className="mx-auto mb-4 opacity-50" />
        <p>This folder is empty</p>
      </div>
    </div>
  );
};
