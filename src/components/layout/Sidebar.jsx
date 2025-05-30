import { NavLink } from 'react-router-dom';
import {
  DocumentTextIcon,
  AcademicCapIcon,
  SparklesIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Text Toolkit', href: '/text-toolkit', icon: SparklesIcon },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-white dark:bg-gray-900 h-[calc(100vh-4rem)] sticky top-16 border-r border-gray-200 dark:border-gray-700">
      <div className="h-full px-4 py-6">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium ${
                  isActive
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`
              }
            >
              <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 