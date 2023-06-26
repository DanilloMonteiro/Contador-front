import Home from "@/components/home";
import { RowProvider } from "@/context/RowContext";

export default function HomeScreen() {
  return (
    <>
      <RowProvider>
        <Home />
      </RowProvider>
    </>
  );
}
