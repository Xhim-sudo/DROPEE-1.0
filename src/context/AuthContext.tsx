
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { 
  getUserProfile, 
  updateUserRole, 
  loginUser, 
  registerUser, 
  logoutUser,
  UserProfile
} from '@/services/userService';

// Role types
export type UserRole = 'user' | 'vendor' | 'admin';

// Authentication context interface
interface AuthContextType {
  currentUser: User | null;
  userInfo: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, name: string) => Promise<User>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isVendor: boolean;
  isUser: boolean;
  setUserRole: (uid: string, role: UserRole) => Promise<void>;
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
  setUserRole: () => Promise.reject(new Error('AuthContext not initialized')),
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user profile from Firestore
          const profile = await getUserProfile(user.uid);
          setCurrentUser(user);
          
          if (profile) {
            setUserInfo(profile);
          } else {
            // If profile doesn't exist, create minimal info
            setUserInfo({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              role: 'user',
              createdAt: null,
              updatedAt: null
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Set minimal user info on error
          setCurrentUser(user);
          setUserInfo({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: 'user',
            createdAt: null,
            updatedAt: null
          });
        }
      } else {
        setCurrentUser(null);
        setUserInfo(null);
      }
      
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);
  
  // Register function
  const register = (email: string, password: string, name: string): Promise<User> => {
    return registerUser(email, password, name);
  };
  
  // Login function
  const login = (email: string, password: string): Promise<User> => {
    return loginUser(email, password);
  };
  
  // Logout function
  const logout = (): Promise<void> => {
    return logoutUser();
  };
  
  // Function to set user role
  const setUserRole = async (uid: string, role: UserRole): Promise<void> => {
    try {
      await updateUserRole(uid, role);
      
      // Update local state if this is the current user
      if (userInfo && userInfo.uid === uid) {
        setUserInfo({
          ...userInfo,
          role: role
        });
      }
    } catch (error) {
      console.error("Error setting user role:", error);
      throw error;
    }
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
    setUserRole,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
