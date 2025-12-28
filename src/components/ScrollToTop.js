import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's no hash (like #features), scroll to top
    if (!hash) {
      window.scrollTo(0, 0);
    }
    // If there IS a hash, the browser/other components will handle scrolling
  }, [pathname, hash]);

  return null;
}
