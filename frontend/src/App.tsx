import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppProvider } from './context/AppContext';
import AppRoutes from './routes/AppRoutes';


function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
