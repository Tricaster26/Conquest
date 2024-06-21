import { Inter } from "next/font/google";
import App from "./App";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <App />
    </main>
  );
}
