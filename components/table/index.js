import FirstTH from "./firstTH";
import SecondTH from "./secondTH";
import TBody from "./tableBody";

export default function Table({}) {
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
            <SecondTH />
          </thead>
          <TBody />
        </table>
      </div>
    </div>
  );
}
