import MainRoutes from './All_routes/MainRoutes';
import './App.css';
import Navbar from './Components/Navbar';
import { AuthContextProvider } from './context/AuthContextProvider';

function App() {
  return (
    <div className="App ">
      <AuthContextProvider>
        <Navbar />
        <MainRoutes />
      </AuthContextProvider>

    </div>
  );
}

export default App;
