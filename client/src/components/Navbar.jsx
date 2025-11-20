import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useClerk, useUser } from '@clerk/clerk-react';

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle">
    <path d="M3 19.5A2.5 2.5 0 0 0 5.5 22H20" />
    <path d="M3 4.5A2.5 2.5 0 0 1 5.5 2H20v20H5.5A2.5 2.5 0 0 1 3 19.5V4.5z" />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/rooms' },
    { name: 'Experience', path: '/' },
    { name: 'About', path: '/' },
  ];

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled ? 'bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4' : 'py-4 md:py-6'
      }`}
    >
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className={`h-9 ${isScrolled && 'invert opacity-80'}`} />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link key={i} to={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
            {link.name}
            <div className={`${isScrolled ? 'bg-gray-700' : 'bg-white'} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
          </Link>
        ))}
        <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`}>Dashboard</button>
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <img src={assets.searchIcon} alt="search" className={`h-7 transition-all duration-500 ${isScrolled ? 'invert' : ''}`} />
        {user ? (
          <UserButton className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? 'text-white bg-black' : 'bg-white text-black'}`}>{user.firstName || 'Profile'}</UserButton>
        ) : (
          <UserButton onClick={openSignIn} className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? 'text-white bg-black' : 'bg-white text-black'}`}>
            Login
          </UserButton>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-3 md:hidden cursor-pointer">
        <img src={assets.menuIcon} alt="menu" className={`h-6 ${isScrolled ? 'invert' : ''}`} />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
          <img src={assets.closeIcon} alt="close-menu" className="h-6 w-6" />
        </button>

        {navLinks.map((link, i) => (
          <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)} className={`hover:text-indigo-500 transition-all`}>
            {link.name}
          </Link>
        ))}

        <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">Dashboard</button>

        {user ? (
          <button className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">{user.firstName || 'Profile'}</button>
        ) : (
          <button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
