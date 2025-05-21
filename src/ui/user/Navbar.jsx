import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo_.png";
import close from "../../assets/svg/close.svg";
import menu from "../../assets/svg/menu.svg";
import Button from "../shared/Button";
import school from "../../assets/img/school.png";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [nav, setNav] = useState(true);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("timeline");

  // Handle section navigation
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      // Add offset for the navbar height
      const navbarHeight = 140; // Approximation of navbar + section nav height
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  };

  const handleNav = () => {
    setNav(!nav);
  };
  const navRef = useRef(null);

  // Only show sub-navbar on scholarship page
  const isScholarshipPage = location.pathname === "/scholarship";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNav(true);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    if (!isScholarshipPage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180; // Adding offset for navbar
      
      const timelineSection = document.getElementById('timeline');
      const browseSection = document.getElementById('browse');
      const assistantSection = document.getElementById('assistant');
      
      if (!timelineSection || !browseSection || !assistantSection) return;
      
      const timelineTop = timelineSection.offsetTop;
      const browseTop = browseSection.offsetTop;
      const assistantTop = assistantSection.offsetTop;
      
      if (scrollPosition >= assistantTop) {
        setActiveSection('assistant');
      } else if (scrollPosition >= browseTop) {
        setActiveSection('browse');
      } else if (scrollPosition >= timelineTop) {
        setActiveSection('timeline');
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScholarshipPage]);

  const Links = [
    { name: "explore scholarships", link: "/scholarship", image: school },
  ];
  
  return (
    <>
      <nav className="bg-[#283d50] sticky top-0 z-30" ref={navRef}>
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4 xl:px-10">
          <Link to="/" className="flex-shrink-0">
            <img src={Logo} alt="Logo" className="w-[50px] md:w-[50px]" />
          </Link>
          <div className="flex-grow flex justify-center">
            <ul className="hidden md:inline-flex">
              {Links.map((link) => (
                <li key={link.name} className="flex px-2 uppercase items-center">
                  <img className="h-5 w-5 mr-2" src={link.image} alt="" />
                  <Link
                    to={link.link}
                    className="text-gray-800 hover:text-gray-400"
                  >
                    <span className="text-white">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0">
            <div onClick={handleNav} className="block md:hidden">
              {nav ? (
                <Button>
                  <img src={menu} alt="menuIcon" className="h-5 w-5" />
                </Button>
              ) : (
                <Button>
                  <img src={close} alt="closeIcon" className="w-5 h-5" />
                </Button>
              )}
            </div>
            <div
              className={
                nav
                  ? "hidden"
                  : "absolute mx-2 my-16 right-0 top-0 w-[150px] text-sm shadow-xl bg-[#283d50] ease-in-out duration-500 md:hidden rounded-lg text-white"
              }
            >
              <ul className="uppercase px-5 py-5 space-y-5">
                {Links.map((link) => (
                  <li key={link.name}>
                    <Link onClick={handleNav} to={link.link}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Scholarship Section Navigation - only show on /scholarship page */}
      {isScholarshipPage && (
        <div className="bg-white shadow-md sticky top-[72px] z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-4 md:space-x-8 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => scrollToSection('timeline')}
                className={`py-4 px-3 md:px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeSection === 'timeline'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                aria-label="Go to Scholarships Timeline section"
              >
                <span className="hidden sm:inline">Scholarships</span> Timeline
              </button>
              <button
                onClick={() => scrollToSection('browse')}
                className={`py-4 px-3 md:px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeSection === 'browse'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                aria-label="Go to Browse Scholarships section"
              >
                Browse <span className="hidden sm:inline">Scholarships</span>
              </button>
              <button
                onClick={() => scrollToSection('assistant')}
                className={`py-4 px-3 md:px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeSection === 'assistant'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                aria-label="Go to AI Scholarship Assistant section"
              >
                AI <span className="hidden sm:inline">Scholarship Assistant</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
