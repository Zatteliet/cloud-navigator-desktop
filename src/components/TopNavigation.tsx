
import { Search, Bell, HelpCircle, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TopNavigation = () => {
  return (
    <nav className="bg-black border-b border-gray-800 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-white text-xl font-semibold">
            Drive
          </div>
        </div>

        {/* Right side options */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
            <HelpCircle size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
            <Settings size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
            <Bell size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
            <User size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
};
