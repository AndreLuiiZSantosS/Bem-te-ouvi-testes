import { useEffect, useState } from "react";

export function useRole() {
  const [role, setRole] = useState<string | null>(
    localStorage.getItem("role")
  );

  useEffect(() => {
    const handleStorage = () => {
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return role;
}
