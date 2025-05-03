
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { app } from '@/config/firebase';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell } from "lucide-react";
import { Link } from 'react-router-dom';

const db = getFirestore(app);

const VendorApprovalAlert = () => {
  const [pendingCount, setPendingCount] = useState<number>(0);

  useEffect(() => {
    const pendingVendorsQuery = query(
      collection(db, "vendorApplications"), 
      where("status", "==", "pending")
    );

    const unsubscribe = onSnapshot(pendingVendorsQuery, (snapshot) => {
      setPendingCount(snapshot.docs.length);
    });

    return () => unsubscribe();
  }, []);

  if (pendingCount === 0) return null;

  return (
    <Alert className="mb-6 border-yellow-500 bg-yellow-50">
      <Bell className="h-4 w-4 text-yellow-500" />
      <AlertTitle className="text-yellow-800">Vendor applications require review</AlertTitle>
      <AlertDescription className="flex justify-between items-center">
        <span>You have {pendingCount} pending vendor {pendingCount === 1 ? 'application' : 'applications'} awaiting approval.</span>
        <Link to="/admin/vendors">
          <span className="text-sm font-medium text-yellow-800 hover:underline">
            Review now
          </span>
        </Link>
      </AlertDescription>
    </Alert>
  );
};

export default VendorApprovalAlert;
