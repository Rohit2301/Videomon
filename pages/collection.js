import { assestResDum } from "@/helpers/assetRespDum";
const Collection = () => {
  return (
    <div className="mt-10">
      <div className="text-4xl font-sansationR">My Collection</div>
      <div>
        {assestResDum.map(({ id }) => {
          const dlp = "asd";
          return (
            <div key={id}>
              <div>asda</div>
              <div>asdad</div>;
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Collection;
