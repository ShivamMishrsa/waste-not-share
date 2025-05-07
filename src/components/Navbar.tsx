
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Utensils, HandHeart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-green-500">Waste Not, Share</span>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/about" className="text-darkgray hover:text-green-600 font-medium">
              About
            </Link>
            <Link to="/how-it-works" className="text-darkgray hover:text-green-600 font-medium">
              How It Works
            </Link>
            <Link to="/impact" className="text-darkgray hover:text-green-600 font-medium">
              Our Impact
            </Link>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="border-green-500 hover:bg-green-50 text-green-600">
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild className="bg-green-500 hover:bg-green-600">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-darkgray" />
            ) : (
              <Menu className="h-6 w-6 text-darkgray" />
            )}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link to="/about" className="block py-2 text-darkgray hover:text-green-600 font-medium">
              About
            </Link>
            <Link to="/how-it-works" className="block py-2 text-darkgray hover:text-green-600 font-medium">
              How It Works
            </Link>
            <Link to="/impact" className="block py-2 text-darkgray hover:text-green-600 font-medium">
              Our Impact
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button asChild variant="outline" className="border-green-500 hover:bg-green-50 text-green-600">
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild className="bg-green-500 hover:bg-green-600">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
