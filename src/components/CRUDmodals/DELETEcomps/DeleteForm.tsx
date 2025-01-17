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
  const { setIsUpdated } = usePots();

  const handleDelete = async () => {
    if (!dataId) return;
    try {
      await deletePot(dataId);
      setIsUpdated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-4">
      <Button variant={"destroy"} onClick={handleDelete}>
        Yes, Confirm Deletion
      </Button>
      <DialogClose>
        <div className="bg-none text-beigeDark p-3">No, Go Back</div>
      </DialogClose>
    </div>
  );
};

export default DeleteForm;
