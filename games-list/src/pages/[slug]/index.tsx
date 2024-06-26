import HeaderDesc from "@/componentsGD/Header";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

/*
Work in Progress
*/
export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [gameObject, setObject] = useState(searchParams.get("gameName"));
  return (
    <main>
      <Link href="/">
        <button>
          {router.query.slug} and {gameObject}
        </button>
      </Link>
      {gameObject !== null && <HeaderDesc gameName={JSON.parse(gameObject)} />}
    </main>
  );
}
