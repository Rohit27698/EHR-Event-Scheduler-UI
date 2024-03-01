import { useContext, useState, } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user,isLogged,logout,}=useContext(AuthContext)
const nav=useNavigate()
  const handleLogout=()=>{
    logout()
    nav('/')

  }
  return (
    <div>
      <header className="bg-purple-900 text-white py-2 px-4 border-b border-gray-200 flex items-center">
        <div className="flex-1 md:flex-none mr-10">
          <Link to="/">
            <h1 className="w-50">EHR Event Scheduler</h1>
          </Link>
        </div>
        <nav className="hidden md:flex space-x-4">
          <DesktopNav />
        </nav>
        <div className="flex items-center ml-auto md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            ☰
          </button>
        </div>
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <MobileNav setIsMenuOpen={setIsMenuOpen} />
        </div>
        <div className="flex items-center ml-auto hidden md:flex">
          {!isLogged ? (
            <div className="space-x-4">
              <Link to="/login" className="text-white">
                Login
              </Link>
              <Link to="/signup" className="text-white">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/user" className="text-lg font-bold" >{user}</Link>
              <button
                onClick={handleLogout}
                className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-300"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

const DesktopNav = () => {
  const NAV_ITEMS = [
    { label: 'Events', href: '/event' },
    { label: 'Add Event', href: '/addevent' }
  ];

  return (
    <>
      {NAV_ITEMS.map((navItem) => (
        <Link
          key={navItem.label}
          to={navItem.href}
          className="text-white hover:text-gray-800"
        >
          {navItem.label}
        </Link>
      ))
      }
    </>
  );
};

export const MobileNav = ({ setIsMenuOpen }) => {
  const { user, isLogged, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/');
  };

  const NAV_ITEMS = [
    { label: 'Events', href: '/event' },
    { label: 'Add Event', href: '/addevent' }
  ];

  return (
    <div className="flex flex-col space-y-2">
      {!isLogged ? (
        <div className="flex flex-col space-y-2" >
          <Link to="/login" className="text-white px-4 py-2">
            Login
          </Link>
          <Link to="/signup" className="text-white px-4 py-2">
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <Link to="/user" className="text-lg font-bold" >{user}</Link>
          <button
            onClick={handleLogout}
            className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-300"
          >
            Sign Out
          </button>
        </div>
      )}
      {NAV_ITEMS.map((navItem) => (
        <Link
          key={navItem.label}
          to={navItem.href}
          className="text-white hover:text-gray-800 px-4 py-2"
          onClick={() => setIsMenuOpen(false)}
        >
          {navItem.label}
        </Link>
      ))}
      
    </div>
  );
};
