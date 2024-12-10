import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import account from "../../assets/svg/user.svg";
import close from "../../assets/svg/close.svg";
import menu from "../../assets/svg/menu.svg";
import Button from "../shared/Button";
import ranking from "../../assets/img/ranking.png";
import ideas from "../../assets/img/ideas.png";
import school from "../../assets/img/school.png";
import technology from "../../assets/img/technology.png";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };
  const navRef = useRef(null);

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

  const Links = [
    { name: "quiz", link: "/quiz", image: ideas },
    { name: "ranking", link: "/ranking", image: ranking },
    { name: "bakdoubAnswer", link: "/bakDoubAnswer", image: technology },
    { name: "scholarship", link: "/scholarship", image: school },
    { name: "account", link: "/account", image: account },
  ];
  return (
    <nav className="bg-[#283d50] sticky top-0 z-30" ref={navRef}>
      <div className="max-w-7xl mx-auto flex justify-between p-4 xl:px-10">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-[50px] md:w-[50px]" />
        </Link>
        <div className="flex gap-5 items-center">
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
  );
}
