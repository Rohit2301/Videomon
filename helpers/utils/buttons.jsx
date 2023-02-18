import { getEllipsisTxt } from "../formatters";

const CyanBtn = ({ data, children, size, overflow, invalid }) => {
  return (
    <div
      className={`relative py-1.5 text-black px-5 rounded-lg ${size ? size : "text-2xl"} font-semibold text-center ${invalid ? "bg-slate-500" : "cyanBtnGradient cursor-pointer"}`}
      style={{
        boxShadow: " 0.8px 1.7px 2.5px 1px rgba(242, 242, 242, 0.7)",
      }}
    >
    {overflow ? getEllipsisTxt(data, 3) : data}
      {children}
    </div>
  );
};
export { CyanBtn };
