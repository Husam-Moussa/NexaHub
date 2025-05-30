import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import AnimatedSidebar from './components/layout/AnimatedSidebar';
import Dashboard from './pages/Dashboard';
import Summarize from './pages/Summarize';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NexaHubChat from './pages/NexaHubChat';
import Translate from './pages/Translate';
import Sidebar from './components/layout/Sidebar';

const AppLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="flex pt-16">
        {!isMobile && <AnimatedSidebar />}
        <main className={`flex-1 ${!isMobile ? 'ml-64' : ''}`}>
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4 sm:p-8"
            >
              <Dashboard />
            </motion.div>
          </ProtectedRoute>
        )
      },
      {
        path: "summarize",
        element: (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-8"
          >
            <Summarize />
          </motion.div>
        )
      },
      {
        path: "text-toolkit",
        element: (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-8"
          >
            <Summarize />
          </motion.div>
        )
      },
      {
        path: "signin",
        element: (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SignIn />
          </motion.div>
        )
      },
      {
        path: "signup",
        element: (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SignUp />
          </motion.div>
        )
      },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4 sm:p-8"
            >
              <Account />
            </motion.div>
          </ProtectedRoute>
        )
      },
      {
        path: "nexahub-chat",
        element: (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-8"
          >
            <NexaHubChat />
          </motion.div>
        )
      },
      {
        path: "translate",
        element: (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-8"
          >
            <Translate />
          </motion.div>
        )
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (remove this in production)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
