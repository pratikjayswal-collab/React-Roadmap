import { NavLink } from "react-router"
import { useTheme } from "../../contexts/ThemeContext"

const Footer = () => {
  const { theme } = useTheme()

  const getFooterStyles = () => {
    switch(theme) {
      case 'dark':
        return 'bg-gray-800 text-gray-300'
      case 'blue':
        return 'bg-blue-800 text-white'
      case 'red':
        return 'bg-red-800 text-red-100'
      default:
        return 'bg-gray-100 text-gray-300'
    }
  };

  const getLinkStyles = () => {
    switch(theme) {
      case 'dark':
        return 'hover:text-blue-400'
      case 'blue':
        return 'text-white hover:text-blue-300'
      case 'red':
        return 'hover:text-white'
      default:
        return 'hover:text-orange-400'
    }
  };

  return (
    <footer className={`${getFooterStyles()} py-6 mt-auto text-gray-600`}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

        <p className="text-sm">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        
        <ul className="flex space-x-6 mt-3 md:mt-0">
          <li>
            <NavLink
              to="/"
              className={`text-sm ${getLinkStyles()} transition-colors duration-200`}
            >
              Privacy Policy
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={`text-sm ${getLinkStyles()} transition-colors duration-200`}
            >
              Terms of Service
            </NavLink>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;    