import { Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function GameDescription() {
  const searchParams = useSearchParams();
  const gameName = searchParams.get("gameName");
  return (
    <main>
      <h1>{gameName}</h1>
    </main>
  );
}
