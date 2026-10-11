"use server";

import { Gender } from "@/src/generated/prisma/enums";
import { prisma } from "../prisma";
import { generateAvatar } from "../utils";
import { revalidatePath } from "next/cache";

// Get the doctors from the database
export const getDoctors = async () => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        _count: { select: { appointments: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return doctors.map((doctor) => ({
      ...doctor,
      appointmentsCount: doctor._count.appointments,
    }));
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw new Error("Failed to get the doctors from the database");
  }
};

// Data contrat to create a new doctor
interface CreateDoctorInput {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  gender: Gender;
  isActive: boolean;
}

// Create a new doctor in database
export const createDoctor = async (input: CreateDoctorInput) => {
  try {
    if (!input.name || !input.email) {
      throw new Error("");
    }

    const newDoctor = await prisma.doctor.create({
      data: {
        ...input,
        imageUrl: generateAvatar(input.name, input.gender),
      },
    });

    revalidatePath("/admin");

    return newDoctor;
  } catch (error: any) {
    console.error("Error creating a new doctor:", error);

    // Handle unique constraint violation (Email already exists)
    if (error?.code === "P2003") {
      throw new Error("A doctor with this Email already exists");
    }

    throw error;
  }
};

// Data contract to update a doctor
interface UpdateDoctorInput extends CreateDoctorInput {
  id: string;
}

// Update a doctor in database
export const updateDoctor = async (input: UpdateDoctorInput) => {
  try {
    if (!input.name || !input.email) {
      throw new Error("");
    }

    const currentDoctor = await prisma.doctor.findUnique({
      where: { id: input.id },
      select: { email: true },
    });

    if (!currentDoctor) {
      throw new Error("Doctor not found");
    }

    // If email is changing, check if the new email already exists
    if (input.email !== currentDoctor.email) {
      const existingDoctor = await prisma.doctor.findUnique({
        where: { email: input.email },
        select: { id: true },
      });

      if (existingDoctor) {
        throw new Error("A doctor with this email already exists");
      }
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id: input.id },
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        speciality: input.speciality,
        gender: input.gender,
        isActive: input.isActive,
      },
    });

    return updatedDoctor;
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw error;
  }
};

// Get available doctor filtering by "isActive"
export const getAvailableDoctors = async () => {
  try {
    const availableDoctors = await prisma.doctor.findMany({
      where: { isActive: true },
      include: {
        _count: { select: { appointments: true } },
      },
      orderBy: { name: "desc" },
    });

    return availableDoctors.map((doctor) => ({
      ...doctor,
      appointmentsCount: doctor._count.appointments,
    }));
  } catch (error) {
    console.error("Error fetching available doctors:", error);
    throw new Error("Failed to fetch available dcotors");
  }
};
