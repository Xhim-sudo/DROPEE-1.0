
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/config/firebase';

// Role types
export type UserRole = 'user' | 'vendor' | 'admin';

// User information structure
interface UserInfo {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
}

// Authentication context interface
interface AuthContextType {
  currentUser: User | null;
  userInfo: UserInfo | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isVendor: boolean;
  isUser: boolean;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userInfo: null,
  loading: true,
  login: () => Promise.reject(new Error('AuthContext not initialized')),
  register: () => Promise.reject(new Error('AuthContext not initialized')),
  logout: () => Promise.reject(new Error('AuthContext not initialized')),
  isAdmin: false,
  isVendor: false,
  isUser: false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  // Function to fetch user role from Firestore
  const fetchUserRole = async (user: User) => {
    try {
      // Check admin collection
      const adminDocRef = doc(db, 'admins', user.uid);
      const adminDocSnap = await getDoc(adminDocRef);
      
      if (adminDocSnap.exists()) {
        return 'admin' as UserRole;
      }
      
      // Check vendor collection
      const vendorDocRef = doc(db, 'vendors', user.uid);
      const vendorDocSnap = await getDoc(vendorDocRef);
      
      if (vendorDocSnap.exists()) {
        return 'vendor' as UserRole;
      }
      
      // Default to regular user
      return 'user' as UserRole;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return 'user' as UserRole;
    }
  };
  
  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = await fetchUserRole(user);
        
        setCurrentUser(user);
        setUserInfo({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: role
        });
      } else {
        setCurrentUser(null);
        setUserInfo(null);
      }
      
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);
  
  // Login function
  const login = (email: string, password: string): Promise<User> => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => userCredential.user);
  };
  
  // Register function
  const register = (email: string, password: string): Promise<User> => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => userCredential.user);
  };
  
  // Logout function
  const logout = (): Promise<void> => {
    return signOut(auth);
  };
  
  // Role check properties
  const isAdmin = userInfo?.role === 'admin';
  const isVendor = userInfo?.role === 'vendor';
  const isUser = userInfo?.role === 'user' || (!isAdmin && !isVendor);
  
  // Create value object
  const value = {
    currentUser,
    userInfo,
    loading,
    login,
    register,
    logout,
    isAdmin,
    isVendor,
    isUser,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
