import Image from "next/image";
import Logo from "../../../public/Logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useContext } from "react";
import Context from "../../../context";
import { useRouter } from "next/router";

const Header = () => {
  const context = useContext(Context);
  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${asPath}`;
  return (
    <div
      className={`${
        URL === "http://localhost:3000/streamPlayer" ||
        URL === "http://localhost:3000/VideoPlayer" ||
        URL === "http://localhost:3000/profilePlayer"
          ? "hidden"
          : ""
      }`}
    >
      <div
        className="relative flex justify-between px-20 py-8 content-center"
        style={{ boxShadow: " 0px 4px 20px rgba(118, 221, 221, 0.6)" }}
      >
        <div className="">
          <Link
            href={"/"}
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
        <div className="text-cyan text-5xl font-sansationR">Videomon</div>
        <div className="relative top-2">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
