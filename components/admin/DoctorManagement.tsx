"use client";

import {
  EditIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  Stethoscope,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useGetDoctors } from "@/hooks/use-doctors";
import Image from "next/image";
import { Badge } from "../ui/badge";
import AddDoctorDialog from "./AddDoctorDialog";
import { useState } from "react";
import EditDoctorDialog from "./EditDoctorDialog";
import { Doctor } from "@/src/generated/prisma/client";

const DoctorManagement = () => {
  const { data: doctors = [] } = useGetDoctors();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <>
      <Card className="mb-12">
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="size-5 text-primary" />
              Doctors Management
            </CardTitle>
            <CardDescription>
              Manage and oversee all doctors in your practice
            </CardDescription>
          </div>

          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary cursor-pointer"
          >
            <PlusIcon className="size-4" />
            Add Doctor
          </Button>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover ring-2 ring-background"
                    unoptimized
                  />
                  <div>
                    <div className="font-semibold">{doctor.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {doctor.speciality}
                      <span className="text-xs bg-muted rounded px-2 py-0.5 ml-2">
                        {doctor.gender === "MALE" ? "Male" : "Female"}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MailIcon className="w-3 h-3" />
                        {doctor.email}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <PhoneIcon className="w-3 h-3" />
                        {doctor.phone}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="font-semibold text-primary">
                      {doctor.appointmentsCount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Appointments
                    </div>
                  </div>

                  {doctor.isActive ? (
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}

                  <Button
                    onClick={() => handleEditDoctor(doctor)}
                    size="sm"
                    variant="outline"
                    className="h-8 px-3 cursor-pointer"
                  >
                    <EditIcon className="size-4" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddDoctorDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      <EditDoctorDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        doctor={selectedDoctor}
      />
    </>
  );
};

export default DoctorManagement;
