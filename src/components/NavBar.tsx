
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogIn } from "lucide-react";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const NavLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Skills", path: "/skills" },
    { name: "How It Works", path: "/how-it-works" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/70 backdrop-blur-lg shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          aria-label="Knowledge Barter Exchange"
        >
          <div className="relative w-8 h-8 bg-primary rounded-md flex items-center justify-center overflow-hidden">
            <span className="text-primary-foreground font-bold text-lg">K</span>
          </div>
          <span className="font-bold text-lg tracking-tight">
            Knowledge Barter
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {NavLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-all hover:text-primary",
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-foreground/80"
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-2">
            <Link to="/signin">
              <Button variant="ghost" size="sm">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">
                <User className="h-4 w-4 mr-2" />
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border animate-fade-in">
          <nav className="container py-5 px-4 mx-auto">
            <ul className="flex flex-col space-y-4 mb-6">
              {NavLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={cn(
                      "block py-2 text-base font-medium",
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground/80"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col space-y-3">
              <Link to="/signin">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full justify-start" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
