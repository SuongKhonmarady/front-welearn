import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Logo from "../../assets/Logo.png";
import { logOut } from "../../context/user/UserAction";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const res = await logOut();
    if (res) {
      navigate("/");
    }
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm rounded-lg
        sm:hidden"
      >
        <span className="sr-only">Toggle sidebar</span>
        <img src={""} alt="sideBarIcon" className="w-5" />
      </button>

      <aside
        ref={sidebarRef}
        className={`fixed md:sticky h-screen top-0 left-0 z-20 w-40 md:w-64 transition-transform text-xs md:text-lg ${
          isOpen ? "md:block" : "hidden md:block"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#283d50]">
          <div className="flex justify-center md:py-5">
            <Link to="/">
              <img src={Logo} alt="logo" className="w-[50px] md:w-[100px]" />
            </Link>
          </div>

          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {/* <img src={} alt="chartIcon" className="w-5 h-5" /> */}
                <span className="ms-3">Subject</span>
              </Link>
            </li>

            <li>
              <Link
                to="/manageQuestion"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {/* <img src={""} alt="bookIcon" className="w-5 h-5" /> */}
                <span className="flex-1 ms-3 whitespace-nowrap">Question</span>
              </Link>
            </li>
            <li>
              <Link
                to="/manageScholarship"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {/* <img src={""} alt="bookIcon" className="w-5 h-5" /> */}
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Scholorship
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={handleLogout}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {/* <img src={""} alt="bookIcon" className="w-5 h-5" /> */}
                <span className="flex-1 ms-3 whitespace-nowrap">
                  LogOut
                </span>
              </Link>
            </li>
            
          </ul>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
