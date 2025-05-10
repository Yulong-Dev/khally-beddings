import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading/Loading.jsx";

export default function Load({ children }) {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // adjust time as needed

    return () => clearTimeout(timer);
  }, [pathname]);

  return loading ? <Loading /> : children;
}

