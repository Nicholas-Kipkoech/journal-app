"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { PrivateAxiosUtility } from "../services/api";

export default function withAuth(Component: React.FC) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
          router.replace("/sign-in");
          return;
        }

        try {
          const res: any = await PrivateAxiosUtility.get("/auth/profile");

          if (res.data.id) {
            setIsAuthenticated(true);
          } else {
            router.replace("/sign-in");
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          router.replace("/sign-in");
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return (
        <div className="h-screen flex items-center justify-center">
          <Skeleton className="w-64 h-16" />
        </div>
      );
    }

    return isAuthenticated ? <Component {...props} /> : null;
  };
}
