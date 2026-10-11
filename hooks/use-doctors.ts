"use client";

import {
  createDoctor,
  getAvailableDoctors,
  getDoctors,
  updateDoctor,
} from "@/lib/actions/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { error } from "console";

export const useGetDoctors = () => {
  const result = useQuery({
    queryKey: ["getDoctors"],
    queryFn: getDoctors,
  });

  return result;
};

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      // Invalidate related queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] });
    },
    onError: (error) => console.log("Error whiile creating a doctor"),
  });

  return result;
};

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDoctor,
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["getDoctors"] }),
        queryClient.invalidateQueries({ queryKey: ["getAvailableDoctors"] }));
    },
    onError: (error) => console.error("failed to update the doctor:", error),
  });
};

// Get available doctors for appointments
export const useAvailableDoctors = () => {
  const result = useQuery({
    queryKey: ["getAvailableDoctors"],
    queryFn: getAvailableDoctors,
  });

  return result;
};
