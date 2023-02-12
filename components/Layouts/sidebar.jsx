import { CyanBtn } from "@/helpers/utils/btn";
const Sidebar = () => {
  return (
    <div
      style={{ boxShadow: " 2px 4px 4px #FFFFFF" }}
      className="fixed flex flex-col w-64 px-10 py-10 rounded-xl text-3xl mt-32 mx-14 bg-grey gap-y-8 sidebarGradient"
    >
      <div className="text-cyan font-gothamM">Explore</div>
      <div className="">Create</div>
      <div className="">Collection</div>
      <div className="">My Profile</div>
      <CyanBtn />
    </div>
  );
};
export default Sidebar;
