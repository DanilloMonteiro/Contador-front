import Header from "../header";
import Table from "@/components/table";

export default function ScreenTable() {
  return (
    <>
      <div className="flex flex-col w-screen h-screen items-center bg-blue-300">
        <Header />
        <Table />
      </div>
    </>
  );
}
