import { ArrowClockwise } from "@phosphor-icons/react";

export default function Button({ onClick, name, arrowReload }) {
  return (
    <>
      <button
        className="flex flex-row  bg-white w-auto h-auto px-3 py-[2px] border-[2px] rounded-sm text-blue-600 font-semibold hover:bg-blue-500 hover:text-white border-blue-600"
        onClick={onClick}
      >
        {name}
        {arrowReload && (
          <ArrowClockwise weight="bold" className="mt-[1px]" size={22} />
        )}
      </button>
    </>
  );
}
