import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#283d50] border-t bg-muted/40">
      <div className="max-w-7xl mx-auto flex justify-between p-4 xl:px-10">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-[50px] md:w-[50px]" />
        </Link>
      </div>
    </footer>
  );
}
