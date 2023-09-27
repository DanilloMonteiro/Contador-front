import { BoardProvider } from "@/context/BoardContext";
import { RowProvider } from "@/context/RowContext";

import Table from "@/components/table";
import Header from "@/components/header";

export default function HomeScreen() {
  return (
    <>
      <BoardProvider>
        <RowProvider>
          <div className="flex flex-col w-screen h-screen items-center bg-blue-300">
            <Header />
            <Table />
          </div>
        </RowProvider>
      </BoardProvider>
    </>
  );
}
