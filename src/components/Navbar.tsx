import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserRole } from "../models/UserProfile";
import { logout } from "../store/auth/slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

interface NavbarProps {
  role: UserRole;
}

interface NavLink {
  label: string;
  url: string;
}

const NAV_LINKS: Record<UserRole, NavLink[]> = {
  Client: [
    { label: "My Profile", url: "/user-profile" },
    { label: "My Projects", url: "/projects" },
    { label: "My Invoices", url: "/invoices" },
    { label: "My Contracts", url: "/contracts" },
    { label: "My Proposals", url: "/proposals" },
    { label: "Project Board", url: "/board" },
  ],
  Freelancer: [
    { label: "My Profile", url: "/user-profile" },
    { label: "Projects", url: "/projects" },
    { label: "Invoices", url: "/invoices" },
    { label: "Contracts", url: "/contracts" },
    { label: "Proposals", url: "/proposals" },
  ],
};

export default function Navbar({ role }: NavbarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navLinks = useMemo(() => NAV_LINKS[role] ?? [], [role]);
  const isActive = (url: string) => location.pathname.startsWith(url);
  const logouutUser = () => {
    dispatch(logout());
    navigate("/")
  };
  const handleNavigate = (to: string) => {
    navigate(to);
    setOpen(false);
  };

  return (
    <nav className="bg-gray-700">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setOpen((v) => !v)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop links */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.url}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-300 hover:bg-gray-600 hover:text-white focus:bg-gray-900 focus:text-white ${
                      isActive(link.url) ? "bg-gray-900 text-white" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <button className="cursor-pointer text-gray-300 hover:bg-gray-600 hover:text-white focus:bg-gray-900 focus:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="sm:hidden px-2 pt-2 pb-3 space-y-1"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavigate(link.url)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-300 hover:bg-gray-600 hover:text-white focus:bg-gray-900 focus:text-white ${
                  isActive(link.url) ? "bg-gray-900 text-white" : ""
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={logouutUser}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-600 hover:text-white focus:bg-gray-900 focus:text-white"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
