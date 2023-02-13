const CyanBtn = ({ data }) => {
  return (
    <div
      className="py-1.5 bg-white text-black px-5 rounded-lg text-2xl text-center"
      style={{
        background: "linear-gradient(274.46deg, #00B3B3 1.44%, #72CBCB 97.53%)",
        boxShadow: " 0.8px 1.7px 2.5px 1px rgba(242, 242, 242, 0.7)",
      }}
    >
      {data}
    </div>
  );
};
export { CyanBtn };
