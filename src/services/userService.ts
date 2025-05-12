
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  User,
  sendPasswordResetEmail
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { UserRole } from "@/context/AuthContext";

// User profile interface
export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  createdAt: any;
  updatedAt: any;
}

/**
 * Register a new user
 */
export const registerUser = async (email: string, password: string, name: string): Promise<User> => {
  try {
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user document in Firestore
    await createUserProfile(user, name);
    
    return user;
  } catch (error) {
    console.error("Error in registerUser:", error);
    throw error;
  }
};

/**
 * Create user profile in Firestore
 */
export const createUserProfile = async (user: User, name: string, role: UserRole = 'user'): Promise<void> => {
  try {
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email,
      displayName: name || user.displayName,
      role: role,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    // Create user document
    await setDoc(doc(db, 'users', user.uid), userProfile);
    
    // Also add to role-specific collection for easier queries
    if (role === 'admin') {
      await setDoc(doc(db, 'admins', user.uid), { uid: user.uid });
    } else if (role === 'vendor') {
      await setDoc(doc(db, 'vendors', user.uid), { uid: user.uid });
    }
  } catch (error) {
    console.error("Error in createUserProfile:", error);
    throw error;
  }
};

/**
 * Get user profile from Firestore
 */
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      return userDocSnap.data() as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    return null;
  }
};

/**
 * Update user role
 */
export const updateUserRole = async (uid: string, role: UserRole): Promise<void> => {
  try {
    // Update user document
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, { 
      role: role,
      updatedAt: serverTimestamp()
    });
    
    // Add to role-specific collection
    if (role === 'admin') {
      await setDoc(doc(db, 'admins', uid), { uid: uid });
    } else if (role === 'vendor') {
      await setDoc(doc(db, 'vendors', uid), { uid: uid });
    }
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

/**
 * Login user
 */
export const loginUser = (email: string, password: string): Promise<User> => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => userCredential.user);
};

/**
 * Logout user
 */
export const logoutUser = (): Promise<void> => {
  return signOut(auth);
};

/**
 * Send password reset email
 */
export const sendPasswordReset = (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};
