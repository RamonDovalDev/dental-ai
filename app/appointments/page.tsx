"use client";

import AppointmentConfirmationModal from "@/components/appointments/AppointmentConfirmationModal";
import BookingConfirmationStep from "@/components/appointments/BookingConfirmationStep";
import DoctorSelectionStep from "@/components/appointments/DoctorSelectionStep";
import ProgressSteps from "@/components/appointments/ProgressSteps";
import TimeSelectionStep from "@/components/appointments/TimeSelectionStep";
import NavBar from "@/components/NavBar";
import {
  useBookAppointment,
  useUserAppointments,
} from "@/hooks/use-appointments";
import { APPOINTMENT_TYPES } from "@/lib/utils";
import { format } from "date-fns";
import React, { useState } from "react";
import { toast } from "sonner";

type BookedAppointment = NonNullable<
  ReturnType<typeof useBookAppointment>["data"]
>;

const AppointmentsPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDentistId, setSelectedDentistId] = useState<string | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [bookedAppointment, setBookedAppointment] =
    useState<BookedAppointment | null>(null);
  const [showConfirmationModal, setShowCOnfirmationModal] = useState(false);

  const bookAppointmentMutation = useBookAppointment();
  const { data: userAppointments = [] } = useUserAppointments();

  const handleSelectDentist = (dentistId: string) => {
    setSelectedDentistId(dentistId);

    // Reset the state when dentist changes
    setSelectedDate("");
    setSelectedTime("");
    setSelectedType("");
  };

  const handleBookAppointment = async () => {
    if (!selectedDentistId || !selectedDate || !selectedTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    const appointmentType = APPOINTMENT_TYPES.find(
      (type) => type.id === selectedType,
    );

    bookAppointmentMutation.mutate(
      {
        doctorId: selectedDentistId,
        date: selectedDate,
        time: selectedTime,
        reason: appointmentType?.name,
      },
      {
        onSuccess: async (appointment) => {
          // Store the appointment details to show in the modal
          setBookedAppointment(appointment);

          try {
            const emailResponse = await fetch("/api/send-appointment-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userEmail: appointment.patientEmail,
                doctorName: appointment.doctorName,
                appointmentDate: format(
                  new Date(appointment.date),
                  "EEEE, MMMM d, yyyy",
                ),
                appointmentTime: appointment.time,
                appointmentType: appointmentType?.name,
                duration: appointmentType?.duration,
                price: appointmentType?.price,
              }),
            });

            if (!emailResponse.ok)
              console.error("Failed to send confirmation email");
          } catch (error) {
            console.error("Error sending confirmation email: ", error);
          }

          // Show the success modal
          setShowCOnfirmationModal(true);

          // Reset
          setSelectedDentistId(null);
          setSelectedDate("");
          setSelectedTime("");
          setSelectedType("");
          setCurrentStep(1);
        },
        onError: (error) =>
          toast.error(`failed to booka appointment: ${error.message}`),
      },
    );
  };

  return (
    <>
      <NavBar />

      <div className="max-w-7xl pt-24 px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Book an Appointment</h1>
          <p className="text-muted-foreground">
            Find and book with verified dentists in your area
          </p>
        </div>

        <ProgressSteps currentStep={currentStep} />

        {currentStep === 1 && (
          <DoctorSelectionStep
            selectedDentistId={selectedDentistId}
            onSelectDentist={handleSelectDentist}
            onContinue={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && selectedDentistId && (
          <TimeSelectionStep
            selectedDentistId={selectedDentistId}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedType={selectedType}
            onDateChange={setSelectedDate}
            onTimeChange={setSelectedTime}
            onTypeChange={setSelectedType}
            onBack={() => setCurrentStep(1)}
            onContinue={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && selectedDentistId && (
          <BookingConfirmationStep
            selectedDentistId={selectedDentistId}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedType={selectedType}
            isBooking={bookAppointmentMutation.isPending}
            onBack={() => setCurrentStep(2)}
            onModify={() => setCurrentStep(2)}
            onConfirm={handleBookAppointment}
          />
        )}

        {bookedAppointment && (
          <AppointmentConfirmationModal
            open={showConfirmationModal}
            onOpenChange={setShowCOnfirmationModal}
            appointmentDetails={{
              doctorName: bookedAppointment.doctorName,
              appointmentDate: format(
                new Date(bookedAppointment.date),
                "EEEE, MMMM d, yyyy",
              ),
              appointmentTime: bookedAppointment.time,
              userEmail: bookedAppointment.patientEmail,
            }}
          />
        )}
      </div>
    </>
  );
};

export default AppointmentsPage;
