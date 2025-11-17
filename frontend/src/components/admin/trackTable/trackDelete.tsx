"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import api from "@/lib/axios";
import { Track } from "@/types/track";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TrackDelete({ track }: { track: Track }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const { data } = await api.delete(`/track/${track._id}`);

      if (!data.success) {
        toast.error(data.message || "Алдаа гарлаа.");
        return;
      }

      toast.success("Track амжилттай устгагдлаа!");
      router.refresh();
    } catch (error) {
      toast.error("Устгах үед алдаа гарлаа!");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild onSelect={(e) => e.preventDefault()}>
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Энэ track-ийг устгах уу?</AlertDialogTitle>
          <AlertDialogDescription>
            &apos;{track.trackingNumber}&apos; дугаартай Track-ийг устгах гэж
            байна.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
