
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-dns-primary to-dns-accent flex items-center justify-center">
              <div className="absolute w-4 h-4 border-2 border-white rounded-full"></div>
              <div className="absolute w-6 h-6 bg-transparent border border-white rounded-full animate-pulse-ring"></div>
            </div>
            <span className="text-xl font-bold text-gray-900">DNS Sentinel</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-dns-primary font-medium transition-colors">
              Dashboard
            </Link>
            <Link to="/results" className="text-gray-700 hover:text-dns-primary font-medium transition-colors">
              Analysis Results
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-dns-primary font-medium transition-colors">
              About AI Model
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
              className="text-gray-700 hover:text-dns-primary font-medium transition-colors px-2 py-1.5 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/results" 
              className="text-gray-700 hover:text-dns-primary font-medium transition-colors px-2 py-1.5 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Analysis Results
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-dns-primary font-medium transition-colors px-2 py-1.5 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About AI Model
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
