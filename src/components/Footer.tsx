
import { Link } from "react-router-dom";
import { Github, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8 bg-primary rounded-md flex items-center justify-center overflow-hidden">
                <span className="text-primary-foreground font-bold text-lg">K</span>
              </div>
              <span className="font-bold text-lg tracking-tight">
                Knowledge Barter
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Exchange knowledge and skills with others, without any currency involved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Github">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/skills" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Skills
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/signin" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-muted-foreground hover:text-foreground transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-foreground transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Knowledge Barter Exchange. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-4 sm:mt-0">
            Designed with care. Built with modern technologies.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
