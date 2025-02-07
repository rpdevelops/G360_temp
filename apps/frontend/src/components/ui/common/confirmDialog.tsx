import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons"; // Ensure you have the Icons component

interface ConfirmProps {
  title: string;
  description: string;
  onConfirm: () => Promise<void>; // Update onConfirm to handle async function
  onCancel?: () => void;
  triggerText: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export default function Confirm({
  title,
  description,
  onConfirm,
  onCancel,
  triggerText,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
}: ConfirmProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(); // Await the onConfirm action if it's a Promise
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="m-4" variant={isDestructive ? "destructive" : "default"}>
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="ghost" onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button
            variant={isDestructive ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? <Icons.spinner className="animate-spin h-6 w-6" /> : confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
