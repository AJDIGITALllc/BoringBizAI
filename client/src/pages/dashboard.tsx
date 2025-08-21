import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect /dashboard to /dashboard/overview
    setLocation("/dashboard/overview");
  }, [setLocation]);

  return null;
}
