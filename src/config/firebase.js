import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Storage with custom settings
const storage = getStorage(app);

// Configure CORS for Storage
if (process.env.NODE_ENV === 'development') {
  // Set CORS headers for development
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
  
  // Add CORS headers to all storage requests
  const originalFetch = window.fetch;
  window.fetch = function(url, options = {}) {
    if (url.includes('firebasestorage.googleapis.com')) {
      options.headers = {
        ...options.headers,
        ...corsHeaders
      };
    }
    return originalFetch(url, options);
  };
}

export { auth, analytics, storage };

export default app; 