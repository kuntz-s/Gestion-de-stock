import react, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import Sidebar from "./Sidebar";

const SidebarMenu = () => {
  const [shrink, setShrink] = useState(false);

  return (
    <section className="flex min-h-screen  ">
      {/**sidebar */}
      <div className="relative">
        <Sidebar shrink={shrink} />
        <div className="absolute right-[-10px] top-10 hover:cursor-pointer z-50 rounded-full bg-white">
            <BsFillArrowRightCircleFill
              className={shrink ? `text-[#000] text-xl  ` : "hidden"}
              onClick={() => setShrink(!shrink)}
            />
            <BsFillArrowLeftCircleFill
              className={!shrink ? `text-[#000] text-xl  ` : "hidden"}
              onClick={() => setShrink(!shrink)}
            />
          </div>
      </div>

      <div className="bg-white w-full px-4 md:px-6 lg:px-8 pt-12 ">
        {/**top navbar */}
        
          <Outlet />
      </div>
    </section>
  );
};

export default SidebarMenu;
