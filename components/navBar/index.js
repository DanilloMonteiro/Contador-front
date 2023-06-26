import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <div className="">
        <div className="flex items-center relative w-screen h-[12vh] bg-white p-[10px]  border-b-8 border-blue-300">
          <a
            className="font-titilliem text-5xl text-blue-500 hover:text-blue-700 ml-5"
            href="/"
          >
            Brascabos
          </a>
          <a
            className="font-rubik text-3xl text-blue-500 ml-10 hover:text-blue-700 underline"
            href="/"
          >
            Tabela de manutenção das mesas
          </a>
        </div>
      </div>
    </>
  );
}
