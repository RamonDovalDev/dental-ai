"use client";

import BookingConfirmationStep from "@/components/appointments/BookingConfirmationStep";
import { DoctorCardsLoading } from "@/components/appointments/DoctorCardsLoading";
import DoctorSelectionStep from "@/components/appointments/DoctorSelectionStep";
import ProgressSteps from "@/components/appointments/ProgressSteps";
import TimeSelectionStep from "@/components/appointments/TimeSelectionStep";
import NavBar from "@/components/NavBar";
import {
  useBookAppointment,
  useUserAppointments,
} from "@/hooks/use-appointments";
import { APPOINTMENT_TYPES } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

type BookedAppointment = NonNullable<
  ReturnType<typeof useBookAppointment>["data"]
>;

const AppointmentsPage = () => {
  const [selectedDentistId, setSelectedDentistId] = useState<string | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookedAppointment, setBookedAppointment] =
    useState<BookedAppointment | null>(null);

  const bookAppointmentMutation = useBookAppointment();
  const { data: userAppointments = [] } = useUserAppointments();

  const handleSelectDentist = (dentistId: string) => {
    setSelectedDentistId(dentistId);

    // Reset when dentis changes
    setSelectedDate("");
    setSelectedTime("");
    setSelectedType("");
  };

  const handleBookAppintment = () => {
    if (!selectedDentistId || !selectedDate || !selectedTime) {
      toast.error("Please fill in all required files");
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

          // Resend Mail

          // Show the success modal
          setShowConfirmationModal(true);

          // reset form
          setSelectedDentistId(null);
          setSelectedDate("");
          setSelectedTime("");
          setSelectedType("");
          setCurrentStep(1);
        },
        onError: (error) =>
          toast.error(`Failed to book appointment: ${error.message}`),
      },
    );
  };

  return (
    <>
      <NavBar />

      <div className="max-w-7xl pt-24 px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Book an Appointment</h1>
          <p className="text-muted-foreground">
            Find and book with verfied dentists in your area
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
            onConfirm={handleBookAppintment}
            onModify={() => setCurrentStep(2)}
          />
        )}
      </div>
    </>
  );
};

export default AppointmentsPage;
