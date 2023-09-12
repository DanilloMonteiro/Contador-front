import { ArrowClockwise, Bell } from "@phosphor-icons/react";

export default function Button({ onClick, name, arrowReload, bell, length }) {
  return (
    <>
      <button
        className="flex flex-row relative bg-white w-auto h-auto px-3 py-[2px] border-[2px] rounded-sm text-blue-600 font-semibold hover:bg-blue-500 hover:text-white border-blue-600 active:bg-white active:text-blue-600"
        onClick={onClick}
      >
        {name}
        {arrowReload && (
          <ArrowClockwise weight="bold" className="mt-[1px]" size={22} />
        )}
        {bell && <Bell size={22} weight="bold" className="mt-[1px]" />}
        {bell && (
          <div className="absolute w-5 h-5 bg-orange-500 text-white text-[12px] text-center -top-2 -right-3 rounded-full">
            {length}
          </div>
        )}
      </button>
    </>
  );
}
