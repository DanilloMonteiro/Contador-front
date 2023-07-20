import ScreenTable from "@/components/screen/table";
import { RowProvider } from "@/context/RowContext";

export default function HomeScreen() {
  return (
    <>
      <RowProvider>
        <ScreenTable />
      </RowProvider>
    </>
  );
}
