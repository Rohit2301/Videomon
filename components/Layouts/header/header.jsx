import Image from "next/image";
import Logo from "../../../public/Logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useContext } from "react";
import Context from "../../../context";

const Header = () => {
  const context = useContext(Context);
  return (
    <div
      className="relative flex justify-between px-20 py-8 content-center"
      style={{ boxShadow: " 0px 4px 20px rgba(118, 221, 221, 0.6)" }}
    >
      <div className="">
        <Link
          href={"/explore"}
          onClick={() => {
            context.setActiveClass({
              explore: true,
              create: false,
              collection: false,
              myProfile: false,
            });
          }}
        >
          <Image
            src={Logo}
            alt={"Vidmon logo"}
            draggable={false}
            className="w-48"
          />
        </Link>
      </div>
      <div className="text-cyan text-5xl">VideoMon</div>
      <div className="relative top-2">
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
