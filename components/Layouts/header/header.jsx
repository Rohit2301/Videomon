import ConnectWallet from "@/helpers/connectWallet/connectWallet";
const Header = () => {
  return (
    <div className="relative flex justify-between px-6 py-4">
      <div>Icon</div>
      <div className="relative flex gap-x-16">
        <div>Links</div>
        <div>Links</div>
        <div>{<ConnectWallet />}</div>
      </div>
    </div>
  );
};

export default Header;
