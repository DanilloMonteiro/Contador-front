import ScreenTable from "@/components/screen/table";
import { BoardProvider } from "@/context/BoardContext";
import { RowProvider } from "@/context/RowContext";

export default function HomeScreen() {
  return (
    <>
      <BoardProvider>
        <RowProvider>
          <ScreenTable />
        </RowProvider>
      </BoardProvider>
    </>
  );
}
