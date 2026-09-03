import React from 'react';
import { Home, User, Cpu, FolderGit2, Mail } from 'lucide-react';
import './MobileNav.css';

interface MobileNavProps {
  activeSection: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeSection }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, link: '#home' },
    { id: 'about', label: 'About', icon: User, link: '#about' },
    { id: 'skills', label: 'Skills', icon: Cpu, link: '#skills' },
    { id: 'projects', label: 'Projects', icon: FolderGit2, link: '#projects' },
    { id: 'contact', label: 'Contact', icon: Mail, link: '#contact' }
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation Dock">
      <div className="mobile-nav-pill">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.link}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
              aria-label={item.label}
            >
              <Icon size={20} className="mobile-nav-icon" />
              <span className="mobile-nav-label">{item.label}</span>
              {isActive && <span className="mobile-nav-active-dot" />}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
