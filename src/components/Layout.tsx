import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Upload, MessageSquare, Search, BarChart3 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { icon: Upload, label: "Upload Data", path: "/" },
    { icon: MessageSquare, label: "New Chat", path: "/chat" },
    { icon: Search, label: "Search Chat", path: "/search" },
    { icon: BarChart3, label: "Holdings reports", path: "/holdings" },
  ];

  const chatHistory = [
    "Ask Anything",
    "Ask Anything", 
    "Ask Anything"
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar-bg border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
              <span className="text-primary font-bold text-sm">EY</span>
            </div>
            <span className="font-semibold text-lg text-foreground">Fin Genie</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant={location.pathname === item.path ? "default" : "ghost"}
              className="w-full justify-start text-sidebar-text hover:bg-secondary"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          ))}

          {/* Chat History */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-sidebar-text mb-3">Chats</h3>
            <div className="space-y-1">
              {chatHistory.map((chat, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-sidebar-text hover:bg-secondary text-sm"
                >
                  {chat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default Layout;