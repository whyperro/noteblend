"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();
  const onCreate = () => {
    
    const promise = create({ title: "Sin titulo" })
                    .then((documentId) => router.push(`/documents/${documentId}`))
    toast.promise(promise, {
      loading: "Creando nueva nota...",
      success: "Nota creada correctamente",
      error: "Ha ocurrido un error...",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src={"/empty.png"}
        height={"300"}
        width={"300"}
        alt="empty"
        className="dark:hidden"
      />
      <Image
        src={"/empty-dark.png"}
        height={"300"}
        width={"300"}
        alt="empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        ¡Bienvenido a Noteblend, {user?.firstName}!
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Crear una nota
      </Button>
    </div>
  );
};

export default DocumentsPage;
