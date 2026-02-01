import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import vitLogo from '@/assets/vit-logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Academics', path: '/academics' },
  { name: 'Admissions', path: '/admissions' },
  { name: 'Campus Life', path: '/campus' },
  { name: 'Contact', path: '/contact' },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, fullName, userRole, signOut } = useAuth();

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={vitLogo} alt="VIT Logo" className="h-10 w-auto" />
          <div className="hidden sm:block">
            <h1 className="font-heading text-lg font-bold text-primary leading-tight">
              VIT University
            </h1>
            <p className="text-xs text-muted-foreground">Vellore Institute of Technology</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActivePath(link.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/70 hover:text-foreground hover:bg-muted'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth & Chat Buttons */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/chat">
                <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </Button>
              </Link>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{fullName || 'User'}</span>
                <span className="text-xs text-muted-foreground capitalize">({userRole})</span>
              </div>
              <Button variant="ghost" size="icon" onClick={signOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <nav className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActivePath(link.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/chat"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium rounded-md text-foreground/70 hover:text-foreground hover:bg-muted flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                AI Assistant
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
