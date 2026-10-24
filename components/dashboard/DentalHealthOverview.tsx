import { BrainIcon, MessageSquareIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getUserAppointmentStats } from "@/lib/actions/appointments";
import { currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";

const DentalHealthOverview = async () => {
  const appointmentsStats = await getUserAppointmentStats();
  const user = await currentUser();

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainIcon className="size-5 text-primary" />
          Your dental Health
        </CardTitle>
        <CardDescription>
          Keep track of your dental track journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-muted/30 rounded-xl">
            <div className="text-2xl font-bold text-primary mb-1">
              {appointmentsStats.completedAppointments}
            </div>
            <div className="text-sm text-muted-foreground">
              Completed Visits
            </div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-xl">
            <div className="text-2xl font-bold text-primary mb-1">
              {appointmentsStats.totalAppointments}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Appointments
            </div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-xl">
            <div className="text-2xl font-bold text-primary mb-1">
              {format(new Date(user?.createdAt!), "MMM yyyy")}
            </div>
            <div className="text-sm text-muted-foreground">Member since</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-linear-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
              <MessageSquareIcon className="size-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-primary">
                Ready to get started
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Book your first appointment or try our AI Assistant for instant
                dental advice
              </p>
              <div className="flex gap-2">
                <Link href="/voice">
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 cursor-pointer"
                  >
                    Try AI Assistant
                  </Button>
                </Link>
                <Link href="/appointments">
                  <Button
                    size="sm"
                    variant="outline"
                    className="cursor-pointer"
                  >
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DentalHealthOverview;
