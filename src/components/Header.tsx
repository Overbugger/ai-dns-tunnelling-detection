
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-dns-primary to-dns-accent flex items-center justify-center">
              <div className="absolute w-4 h-4 border-2 border-white rounded-full"></div>
              <div className="absolute w-6 h-6 bg-transparent border border-white rounded-full animate-pulse-ring"></div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive("/") ? "text-dns-primary" : "text-gray-700 hover:text-dns-primary"
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/docs" 
              className={`font-medium transition-colors ${
                isActive("/docs") ? "text-dns-primary" : "text-gray-700 hover:text-dns-primary"
              }`}
            >
              Docs
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors ${
                isActive("/about") ? "text-dns-primary" : "text-gray-700 hover:text-dns-primary"
              }`}
            >
              About
            </Link>
          </nav>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-2 animate-slide-in">
          <nav className="container mx-auto px-4 flex flex-col space-y-3 py-2">
            <Link 
              to="/" 
              className={`px-2 py-1.5 rounded-md hover:bg-gray-100 font-medium transition-colors ${
                isActive("/") ? "text-dns-primary" : "text-gray-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/docs" 
              className={`px-2 py-1.5 rounded-md hover:bg-gray-100 font-medium transition-colors ${
                isActive("/docs") ? "text-dns-primary" : "text-gray-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Docs
            </Link>
            <Link 
              to="/about" 
              className={`px-2 py-1.5 rounded-md hover:bg-gray-100 font-medium transition-colors ${
                isActive("/about") ? "text-dns-primary" : "text-gray-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
