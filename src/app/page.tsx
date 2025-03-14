import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-3xl">HOME</h1>
      <div>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </div>
      <div className="flex gap-3">
        <Button> Testando botão </Button>
        <Input placeholder="Testando input" />
      </div>
    </div>
  );
}
