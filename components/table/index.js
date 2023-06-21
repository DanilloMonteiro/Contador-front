import FirstTH from "./firstTH";
import SecondTH from "./secondTH";
import TBody from "./tableBody";

export default function Table({ handleSelectChange, contador, change }) {
  return (
    <div className="flex justify-center">
      <div
        className=""
        style={{
          display: "flex",
          height: "80vh",
          width: "100vw",
          overflowX: "auto",
        }}
      >
        <table
          className="
          border-collapse 
          border 
          border-slate-400
          w-full h-auto
          bg-white"
        >
          <thead>
            <FirstTH />
            <SecondTH handleSelectChange={handleSelectChange} />
          </thead>
          <TBody contador={contador} change={change} />
        </table>
      </div>
    </div>
  );
}
