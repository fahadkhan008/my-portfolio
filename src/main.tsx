import "./index.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import Loader from "./components/ui/Loader";
import { ThemeProvider } from "./contexts/ThemeContext";
import CustomCursor from "./components/ui/CustomCursor";
import { useState, useEffect, StrictMode } from "react";

const Root = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds loader
    return () => clearTimeout(timer);
  }, []);

  return (
    <StrictMode>
      <ThemeProvider>
        <CustomCursor />
        {loading ? <Loader onLoaded={() => setLoading(false)} /> : <App />}
        {/* <App /> */}
      </ThemeProvider>
    </StrictMode>
  );
};
createRoot(document.getElementById("root")!).render(<Root />);
