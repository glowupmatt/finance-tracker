"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { usePots } from "@/context/PotsContext";
import { deletePot } from "@/lib/PotsCRUDfunctions";
import { DialogClose } from "@/components/ui/dialog";

type Props = {
  dataId: string | undefined;
};

const DeleteForm = (props: Props) => {
  const { dataId } = props;
  const { setIsPotsUpdated } = usePots();

  const handleDelete = async () => {
    if (!dataId) return;
    try {
      await deletePot(dataId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPotsUpdated((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-4">
      <DialogClose asChild onClick={handleDelete}>
        <Button variant={"destroy"}>Yes, Confirm Deletion</Button>
      </DialogClose>
      <DialogClose>
        <div className="bg-none text-beigeDark p-3">No, Go Back</div>
      </DialogClose>
    </div>
  );
};

export default DeleteForm;
