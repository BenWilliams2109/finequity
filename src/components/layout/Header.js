'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigationItems = [
    { 
      href: '/', 
      label: 'Home', 
      icon: '🏠',
      description: 'Welcome & Overview'
    },
    { 
      href: '/business-profile', 
      label: 'Get Started', 
      icon: '🚀',
      description: 'Begin Loan Application'
    },
    { 
      href: '/chat', 
      label: 'AI Assistant', 
      icon: '💬',
      description: 'Get Help & Guidance'
    },
    { 
      href: '/forum', 
      label: 'Community', 
      icon: '👥',
      description: 'Connect with Businesses'
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <div>
                  <div className="text-gray-900 text-lg font-bold">Finequity Portal</div>
                  <div className="text-gray-500 text-xs hidden sm:block">Financial Inclusion Platform</div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:space-x-1">
              {navigationItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href 
                      ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden" 
              onClick={closeMobileMenu}
            ></div>
            
            {/* Dropdown Panel */}
            <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 md:hidden">
              <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="space-y-1">
                  {navigationItems.map((item) => (
                    <Link 
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        pathname === item.href 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <span className="text-xl">{item.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                      {pathname === item.href && (
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
                
                {/* Additional Info in Mobile Menu */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="px-4">
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">💡 Need help?</span> Use our AI assistant for instant support.
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>🔒 Secure</span>
                      <span>•</span>
                      <span>📱 Mobile Friendly</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
      
      {/* Spacer to prevent content from hiding behind sticky header */}
      <div className="h-0"></div>
    </>
  );
};

export default Header;