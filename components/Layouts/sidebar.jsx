import { useContext } from "react";
import Context from "../../context.js";
import Link from "next/link.js";
import { useRouter } from "next/router";

const Sidebar = () => {
  const context = useContext(Context);
  const { asPath } = useRouter();
  const router = useRouter();
  const { pathname } = router;
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${asPath}`;
  console.log(URL);
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
      {/* TODO: CAHNGE LOCALHOST URL */}
      <div
        style={{ boxShadow: " 2px 4px 4px #FFFFFF" }}
        className="fixed flex flex-col w-64 px-10 py-10 font-sansationR rounded-xl text-3xl mt-32 mx-14 gap-y-8 sidebarGradient"
      >
        <Link
          href={"/explore"}
          className={`cursor-pointer ${
            context.activeClass.explore ? "text-cyan font-gothamM" : ""
          }`}
          onClick={() => {
            context.setActiveClass({
              explore: true,
              upload: false,
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
            context.activeClass.upload
              ? "text-cyan font-gothamM"
              : "hover:text-white"
          }`}
          onClick={() => {
            context.setActiveClass({
              explore: false,
              upload: true,
              create: false,
              collection: false,
              myProfile: false,
            });
          }}
        >
          Upload
        </Link>
        <Link
          href={"/createStream"}
          className={`cursor-pointer  ${
            context.activeClass.create
              ? "text-cyan font-gothamM"
              : "hover:text-white"
          }`}
          onClick={() => {
            context.setActiveClass({
              explore: false,
              upload: false,
              create: true,
              collection: false,
              myProfile: false,
            });
          }}
        >
          Stream
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
              upload: false,
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
              upload: false,
              create: false,
              collection: false,
              myProfile: true,
            });
          }}
        >
          My Profile
        </Link>
      </div>
    </div>
  );
};
export default Sidebar;
