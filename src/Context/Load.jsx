import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading/Loading.jsx";

export default function Load() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Show loading spinner
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return loading ? <Loading /> : null;
}
