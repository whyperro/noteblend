"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Tus ideas, tus pensamientos y tus planificaciones. Un solo lugar. <br />{" "}
        Esto es <span className="underline">Noteblend.</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        En Noteblend toda tu organización <br />
        es mejor, más rapida y más eficiente.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      )}
      {!isLoading && !isAuthenticated && (
        <>
          <SignInButton mode="modal">
            <Button>
              ¡Unete a Noteblend!
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </SignInButton>
        </>
      )}
      {!isLoading && isAuthenticated && (
        <>
          <Button asChild>
            <Link href={"/documents"}>
              Entra a Noteblend
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default Heading;
