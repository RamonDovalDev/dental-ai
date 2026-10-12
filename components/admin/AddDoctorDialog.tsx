import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Gender } from "@/src/generated/prisma/enums";
import { useCreateDoctor } from "@/hooks/use-doctors";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { formatPhoneNumber } from "@/lib/utils";

interface AddDoctorDialogOpen {
  isOpen: boolean;
  onClose: () => void;
}

const AddDoctorDialog = ({ isOpen, onClose }: AddDoctorDialogOpen) => {
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    speciality: "",
    gender: "MALE" as Gender,
    isActive: true,
  });

  const createDoctorMutation = useCreateDoctor();

  const handleClose = () => {
    onClose();
    setNewDoctor({
      name: "",
      email: "",
      phone: "",
      speciality: "",
      gender: "MALE",
      isActive: true,
    });
  };

  const handlePhoneChange = (value: string) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setNewDoctor({ ...newDoctor, phone: formattedPhoneNumber });
  };

  const handleSave = () => {
    createDoctorMutation.mutate({ ...newDoctor }, { onSuccess: handleClose });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Doctor</DialogTitle>
          <DialogDescription>
            Add a new doctor to your practice
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-name">Name</Label>
              <Input
                id="new-name"
                type="text"
                value={newDoctor.name}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, name: e.target.value })
                }
                placeholder="Dr. John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-speciality">Speciality</Label>
              <Input
                id="new-speciality"
                type="text"
                value={newDoctor.speciality}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, speciality: e.target.value })
                }
                placeholder="General Dentistry"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-email">Email</Label>
            <Input
              id="new-email"
              type="text"
              value={newDoctor.email}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, email: e.target.value })
              }
              placeholder="your@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-phone">Phone</Label>
            <Input
              id="new-phone"
              type="text"
              value={newDoctor.phone}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, phone: e.target.value })
              }
              placeholder="+34 696 696 696"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-gender">Gender</Label>
              <Select
                value={newDoctor.gender || ""}
                onValueChange={(value) =>
                  setNewDoctor({ ...newDoctor, gender: value as Gender })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-status">Status</Label>
              <Select
                value={newDoctor.isActive ? "Active" : "Inactive"}
                onValueChange={(value) =>
                  setNewDoctor({ ...newDoctor, isActive: value === "active" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90 cursor-pointer"
          >
            {createDoctorMutation.isPending ? "Adding..." : "Add Doctor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoctorDialog;
