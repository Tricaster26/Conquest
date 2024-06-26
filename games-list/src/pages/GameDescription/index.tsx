import HeaderDesc from "@/componentsGD/Header";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function GameDescription() {
  const searchParams = useSearchParams();
  const [gameObject, setObject] = useState(searchParams.get("gameName"));
  return (
    <main>
      <Link href="/">
        <button>Home</button>
      </Link>
      {gameObject !== null && <HeaderDesc gameName={JSON.parse(gameObject)} />}
    </main>
  );
}
