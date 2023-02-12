const CyanBtn = ({ data }) => {
  return (
    <div
      className="text-3xl text-center text-red-900 px-10 py-4 bg-black rounded-xl"
      //   style={{
      //     background: "linear-gradient(274.46deg, #00B3B3 1.44%, #72CBCB 97.53%)",
      //     boxShadow: "0.8px 1.7px 2.5px 1px rgba(242, 242, 242, 0.7)",
      //     borderRadius: "10px",
      //   }}
    >
      {data}
    </div>
  );
};
const HomeGetStartedBtn = ({ data, children, text }) => {
  return (
    <div className="relative font-mons text-xl text-center orangeBtn rounded-lg flex">
      <button
        className={`px-4 py-2 ${
          text === "white" ? "text-white" : "text-black"
        }`}
      >
        {data}
        {children}
      </button>
    </div>
  );
};
export { HomeGetStartedBtn };
export { CyanBtn };
