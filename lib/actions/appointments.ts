"use server";

import { AppointmentStatus, Prisma } from "@/src/generated/prisma/client";
import { prisma } from "../prisma";
import { auth } from "@clerk/nextjs/server";

type AppointmentWithRelations = Prisma.AppointmentGetPayload<{
  include: {
    user: {
      select: {
        firstName: true;
        lastName: true;
        email: true;
      };
    };
    doctor: {
      select: {
        name: true;
        imageUrl: true;
      };
    };
  };
}>;

const transformAppointment = (appointment: AppointmentWithRelations) => {
  return {
    ...appointment,
    patientName:
      `${appointment.user.firstName} ${appointment.user.lastName}`.trim(),
    patientEmal: appointment.user.email,
    doctorName: appointment.doctor.name,
    doctorImageUrl: appointment.doctor.imageUrl,
    date: appointment.date.toISOString().split("T")[0],
  };
};

export const getAppointments = async () => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: { select: { name: true, imageUrl: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return appointments.map(transformAppointment);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw new Error("Failed to fetch appointments");
  }
};

export const getUserAppointments = async () => {
  try {
    // Get the authenticated user from Clerk
    const { userId } = await auth();
    if (!userId) {
      throw new Error(
        "You must be successfully signed in to get the user appoinstments",
      );
    }

    // Find user by ClerkId from authenticated session
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) {
      throw new Error(
        "User not found. Please, ensure your account is properly set up",
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: { userId: user.id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });

    return appointments.map(transformAppointment);
  } catch (error) {
    console.error("Error fetching the user apointments:", error);
    throw new Error("Failed to fetchthe user appointments");
  }
};

export const getUserAppointmentStats = async () => {
  try {
    // Get the authenticated user from Clerk
    const { userId } = await auth();
    if (!userId) {
      throw new Error(
        "You must be successfully signed in to get the user appoinstments",
      );
    }

    // Find user by ClerkId from authenticated session
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) {
      throw new Error(
        "User not found. Please, ensure your account is properly set up",
      );
    }

    // Run both database queries in parallel
    const [totalCount, completedCount] = await Promise.all([
      prisma.appointment.count({
        where: { userId: user.id },
      }),
      prisma.appointment.count({
        where: { userId: user.id, status: "COMPLETED" },
      }),
    ]);

    return {
      totalAppointments: totalCount,
      completedAppointments: completedCount,
    };
  } catch (error) {
    console.error("Error fetching user appointments stats:", error);

    return {
      totalAppointments: 0,
      completedAppointments: 0,
    };
  }
};

export const bookAppointmentsSlots = async (doctorId: string, date: string) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        date: new Date(date),
        status: {
          in: ["CONFIRMED", "COMPLETED"], // Consider both confirmed and completed appointments as blocking
        },
      },
      select: { time: true },
    });

    return appointments.map((appointment) => appointment.time);
  } catch (error) {
    console.error("Error fetching booked time slots", error);
    return []; // Return an empty array if it´s error
  }
};

interface BookAppointmentInput {
  doctorId: string;
  date: string;
  time: string;
  reason?: string;
}

export const bookAppointment = async (input: BookAppointmentInput) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error(
        "You must be succesfully signed in to book an appointment",
      );
    }

    if (!input.doctorId || !input.date || !input.time) {
      throw new Error("doctorId, date and time are required");
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) {
      throw new Error(
        "User not found. Please, ensure your account is properly setup",
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        doctorId: input.doctorId,
        date: new Date(input.date),
        time: input.time,
        reason: input.reason || "General consultation",
        status: "CONFIRMED",
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: { select: { name: true, imageUrl: true } },
      },
    });

    return transformAppointment(appointment);
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw new Error("Failed to book appointment. Please try again later.");
  }
};

export const updateAppointmentStatus = async (input: {
  id: string;
  status: AppointmentStatus;
}) => {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: input.id },
      data: { status: input.status },
    });

    return appointment;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw new Error("Failed to update appointment");
  }
};
