
import './index.css';
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import Loader from './components/ui/Loader.tsx';
import { ThemeProvider } from './contexts/ThemeContext';
import React , {useState, useEffect, StrictMode} from 'react';

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
        {loading ? <Loader onLoaded={() => setLoading(false)} /> : <App />}
      </ThemeProvider>
    </StrictMode>
  );
};
createRoot(document.getElementById('root')!).render(<Root />);

// if (loading) {
//   createRoot(document.getElementById('root')!).render(
//     <StrictMode>
//       <ThemeProvider>
//         <Loader onLoaded={() => setLoading(false)} />
//       </ThemeProvider>
//     </StrictMode>
//   );
// }


// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
