const Sidebar = () => {
  return (
    <div
      style={{ boxShadow: "2px 4px 8px #FFFFFF" }}
      className="relative flex flex-col w-64 px-10 py-10 rounded-xl text-3xl m-20 bg-grey gap-y-8"
    >
      <div className="text-cyan font-gothamM">Explore</div>
      <div className="">Upload</div>
      <div className="">My Uploads</div>
      <div className="">Collection</div>
    </div>
  );
};
export default Sidebar;
