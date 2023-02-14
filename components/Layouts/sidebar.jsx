import { useContext } from "react";
import Context from "../../context.js";
import Link from "next/link.js";

const Sidebar = () => {
  const context = useContext(Context);
  return (
    <div
      style={{ boxShadow: " 2px 4px 4px #FFFFFF" }}
      className="fixed flex flex-col w-64 px-10 py-10 rounded-xl text-3xl mt-32 mx-14 gap-y-8 sidebarGradient"
    >
      <Link
        href={"/explore"}
        className={`cursor-pointer ${
          context.activeClass.explore ? "text-cyan font-gothamM" : ""
        }`}
        onClick={() => {
          context.setActiveClass({
            explore: true,
            create: false,
            collection: false,
            myProfile: false,
          });
        }}
      >
        Explore
      </Link>
      <Link
        href={"/upload"}
        className={`cursor-pointer  ${
          context.activeClass.create
            ? "text-cyan font-gothamM"
            : "hover:text-white"
        }`}
        onClick={() => {
          context.setActiveClass({
            explore: false,
            create: true,
            collection: false,
            myProfile: false,
          });
        }}
      >
        Create
      </Link>
      <Link
        href={"/collection"}
        className={`cursor-pointer ${
          context.activeClass.collection
            ? "text-cyan font-gothamM"
            : "hover:text-white"
        }`}
        onClick={() => {
          context.setActiveClass({
            explore: false,
            create: false,
            collection: true,
            myProfile: false,
          });
        }}
      >
        Collection
      </Link>
      <Link
        href={"/profile"}
        className={`cursor-pointer  ${
          context.activeClass.myProfile
            ? "text-cyan font-gothamM"
            : "hover:text-white"
        }`}
        onClick={() => {
          context.setActiveClass({
            explore: false,
            create: false,
            collection: false,
            myProfile: true,
          });
        }}
      >
        My Profile
      </Link>
    </div>
  );
};
export default Sidebar;
