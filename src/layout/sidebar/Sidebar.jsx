import React from "react";
import { VscPerson} from "react-icons/vsc";
import { BiStore } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiCaravanLine } from "react-icons/ri";
import { LiaWineBottleSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import logoShrink from "../../assets/logoShrink.png";

const sidebarItems = [
  { title: "Dashboard", link: "dashboard", icon: <MdOutlineDashboard  className="scale-[1.3] translate-y-[-2px]" /> },
  { title: "Clients", link: "clients", icon: <VscPerson  className="scale-[1.5]" /> },
  
  {
    title: "Produits",
    link: "produits",
    icon: <LiaWineBottleSolid className="scale-[1.5]" />,
  },
  {
    title: "Commandes",
    link: "commandes",
    icon: <BiStore className="scale-[1.3]"/>,
  },
  {
    title: "Fournisseurs",
    link: "fournisseurs",
    icon: <RiCaravanLine className="scale-[1.3]" />,
  },
];

const Sidebar = ({ shrink }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${
        !shrink ? "w-[230px]" : "w-[58px]"
      } h-screen overflow-y-auto shrink-0 sticky top-0 p-3 border-r border-slate-200 `}
    >
      <div
        className="flex justify-center items-center my-2 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={shrink ? logoShrink : logo}
          alt="dossier medical"
          className="object-cover"
          width={200}
          height={200}
        />
      </div>
      <div className="mt-4">
        {sidebarItems.map((item, id) => {
          return (
            <Link to={item.link} key={id} className="relative">
              <p
                key={id}
                className={`${
                  location.pathname === "/" + item.link
                    ? " text-primary "
                    : " text-slate-600 bg-white hover:text-primary hover:bg-red-50 hover:text-primary/80"
                } flex items-center my-1 p-3 rounded-md  `}
              >
                <span className="text-lg">{item.icon}</span>
                <span
                  className={`${
                    shrink ? "hidden" : "text-[15px] font-medium ml-4"
                  }`}
                >
                  {item.title}
                </span>
              </p>
              <div
                className={`${
                  location.pathname === "/" + item.link &&
                  "absolute top-[1px] left-[-10px] h-10 w-1 bg-primary"
                }`}
              ></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
