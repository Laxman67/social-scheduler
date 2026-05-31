import { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { MenuIcon } from 'lucide-react';

const pageMeta: Record<string, { title: string; description: string }> = {
  '/dashboard': {
    title: 'Dashboard',
    description: 'Overview of your scheduled posts and account performance.',
  },
  '/accounts': {
    title: 'Social Accounts',
    description: 'Connect, manage, and review linked social media accounts.',
  },
  '/schedule': {
    title: 'Post Scheduler',
    description: 'Create, schedule, and automate your social content calendar.',
  },
  '/ai-composer': {
    title: 'AI Composer',
    description:
      'Generate smart social posts with AI-powered content assistance.',
  },
};

const Layout = () => {
  const location = useLocation();
  // Means if we get the route and matches then return left else right
  const meta = pageMeta[location.pathname] ?? {
    title: 'Social Scheduler',
    description: 'Manage and automate your social presence.',
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <aside className="flex h-screen bg-slate-200">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-blue-500 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      <div className="flex flex-1  flex-col">
        {/* Top Bar */}

        <header className="h-16  bg-white border-b border-slate-200 flex items-center px-4 md:px-8 gap-4  ">
          <button
            className="md:hidden p-2 ml-2 text-slate-500 "
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MenuIcon />
          </button>
          <div>
            <h2 className="text-slate-900">{meta.title}</h2>
            <p className="text-slate-400 hidden sm:block">{meta.description}</p>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 lg:p-12">
          <Outlet />
        </main>
      </div>{' '}
    </aside>
  );
};

export default Layout;
