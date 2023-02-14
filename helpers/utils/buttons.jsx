const CyanBtn = ({ data, children }) => {
  return (
    <div
      className="relative py-1.5 text-black px-5 rounded-lg text-2xl text-center cyanBtnGradient cursor-pointer"
      style={{
        boxShadow: " 0.8px 1.7px 2.5px 1px rgba(242, 242, 242, 0.7)",
      }}
    >
      {data}
      {children}
    </div>
  );
};
export { CyanBtn };
