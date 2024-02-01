"use clients";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React from "react";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/modals/ConfirmModal";

interface BannerProps {
  documentId: Id<"documents">;
}

const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);
  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Eliminando nota...",
      success: "Nota eliminada",
      error: "Error al eliminar nota",
    });

    router.push("/documents");
  };
  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restaurando nota...",
      success: "Nota restaurada",
      error: "Error al restaurar nota",
    });
  };
  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>Esta nota esta actualmente en la papelera...</p>
      <Button
        size={"sm"}
        variant={"outline"}
        onClick={onRestore}
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white   p-1 px-2 h-auto font-normal"
      >
        Restaurar nota
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size={"sm"}
          variant={"outline"}
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white   p-1 px-2 h-auto font-normal"
        >
          Eliminar nota
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
