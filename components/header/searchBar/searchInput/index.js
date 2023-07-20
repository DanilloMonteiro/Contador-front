import { RowContext } from "@/context/RowContext";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useContext } from "react";

export default function SearchInput() {
  const { searchFilterWrapper } = useContext(RowContext);
  return (
    <div className="flex flex-row items-center bg-blue-500 w-auto  border-2 border-blue-500">
      <input
        className="font-rubik mx-2 px-2 py-[3px]"
        type="text"
        placeholder="Pesquisar..."
        onChange={(event) => searchFilterWrapper(event.target.value)}
      ></input>
      <MagnifyingGlass size={25} className="mr-1" />
    </div>
  );
}
