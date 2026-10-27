import AppointmentConfirmationEmail from "@/components/emails/AppointmentConfirmationEmail";
import resend from "@/lib/resend/resend";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const {
      userEmail,
      doctorName,
      appointmentDate,
      appointmentTime,
      appointmentType,
      duration,
      price,
    } = body;

    // Validate rrequired fields
    if (!userEmail || !doctorName || !appointmentDate || !appointmentTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Send the Email - Just for testing purposes - Not use in production
    const { data, error } = await resend.emails.send({
      from: "Dental-AI <no-reply@resend.dev>",
      to: [userEmail],
      subject: "Appointment Confirmation - Dental-AI",
      react: AppointmentConfirmationEmail({
        doctorName,
        appointmentDate,
        appointmentTime,
        appointmentType,
        duration,
        price,
      }),
    });

    if (error) {
      console.error("resend error: ", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", emailId: data.id },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email sending error: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
