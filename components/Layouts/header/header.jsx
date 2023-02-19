import Image from "next/image";
import Logo from "../../../public/Logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useContext } from "react";
import Context from "../../../context";
import { useRouter } from "next/router";
import SuperMatic from "@/components/superMatic";

const Header = () => {
  const context = useContext(Context);
  const { asPath } = useRouter();
  const router = useRouter();
  const { pathname } = router;
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const balance = (context.superTokenBalance / 10 ** 18).toFixed(3);

  const URL = `${origin}${asPath}`;
  return (
    <div
      className={`${
        URL === "http://localhost:3000/streamPlayer" ||
        URL === "http://localhost:3000/VideoPlayer" ||
        URL === "http://localhost:3000/profilePlayer"
          ? "hidden"
          : ""
      } ${router.asPath === "/" ? "hidden" : ""}`}
    >
      <div
        className="relative flex justify-between px-20 py-8 content-center"
        style={{ boxShadow: " 0px 4px 20px rgba(118, 221, 221, 0.6)" }}
      >
        <div className="">
          <Link
            href={"http://localhost:3000/"}
            onClick={() => {
              context.setActiveClass({
                explore: false,
                upload: false,
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
        {/* <div className="text-cyan text-5xl font-sansationR">Videomon</div> */}
        <div className="flex flex-col justify-center items-center">
          <span className="text-cyan text-xl font-sansationR">Balance</span>
          <div className="flex gap-4">
            <span className="text-white text-2xl font-sansationR">
              {context.superTokenBalance ? balance : "Connect Wallet"}
            </span>
            <SuperMatic></SuperMatic>
          </div>
        </div>
        <div className="relative top-2">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
