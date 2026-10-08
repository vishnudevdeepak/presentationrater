import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from '@/components/ui/resizable-navbar';

export default function Navbar({ userAuth }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Analyze", link: "/analyze" },
    { name: "Examples", link: "/examples" },
    { name: "Pricing", link: "/pricing" },
    ...(userAuth?.isLoggedIn
      ? [
          { name: "Dashboard", link: "/dashboard" },
          { name: "History", link: "/history" }
        ]
      : [])
  ];

  return (
    <ResizableNavbar>
      {/* Desktop Navigation */}
      <NavBody className="hidden md:flex">
        <NavbarLogo />
        <NavItems items={navItems} />

        <div className="flex items-center gap-3">
          {userAuth?.isLoggedIn && (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                title="Profile Settings"
              >
                <img
                  src={userAuth.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
                />
                <span className="text-xs font-bold text-black pr-1 group-hover:text-indigo-600">
                  {userAuth.user?.name?.split(' ')[0]}
                </span>
              </Link>
            </div>
          )}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          <div className="flex flex-col gap-2">
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-nav-${idx}`}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 text-base font-semibold transition-colors ${
                  location.pathname === item.link
                    ? 'text-indigo-600 font-bold'
                    : 'text-black'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex w-full flex-col gap-2 pt-2 border-t border-slate-200">
            {userAuth?.isLoggedIn && (
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 text-base font-semibold text-black"
              >
                <User className="w-5 h-5 text-indigo-500" />
                Profile ({userAuth.user?.name})
              </Link>
            )}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}
