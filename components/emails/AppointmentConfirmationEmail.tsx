import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";
import type { CSSProperties } from "react";

interface AppointmentConfirmationEmailProps {
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  duration: string;
  price: string;
}

export default function AppointmentConfirmationEmail({
  doctorName,
  appointmentDate,
  appointmentTime,
  appointmentType,
  duration,
  price,
}: AppointmentConfirmationEmailProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  return (
    <Html>
      <Head />
      <Preview>Your dental appointment has been confirmed</Preview>

      <Body style={main}>
        <Container style={container}>
          {/* Logo + brand */}
          <Section style={logoContainer}>
            <Img
              src="https://i.postimg.cc/8jSv9Zqh/logo.png"
              width="50"
              height="50"
              alt="Dental-AI"
              style={logo}
            />
            <Text style={logoText}>Dental-AI</Text>
          </Section>

          <Heading style={h1}>Appointment Confirmed! 🦷</Heading>

          <Text style={text}>Hi there,</Text>
          <Text style={text}>
            Your dental appointment has been successfully booked. Here are the
            details:
          </Text>

          {/* Appointment Details */}
          <Section style={appointmentDetails}>
            <Text style={detailLabel}>Doctor</Text>
            <Text style={detailValue}>{doctorName}</Text>

            <Text style={detailLabel}>Appointment Type</Text>
            <Text style={detailValue}>{appointmentType}</Text>

            <Text style={detailLabel}>Date</Text>
            <Text style={detailValue}>{appointmentDate}</Text>

            <Text style={detailLabel}>Time</Text>
            <Text style={detailValue}>{appointmentTime}</Text>

            <Text style={detailLabel}>Duration</Text>
            <Text style={detailValue}>{duration}</Text>

            <Text style={detailLabel}>Cost</Text>
            <Text style={detailValue}>{price}</Text>

            <Text style={detailLabel}>Location</Text>
            <Text style={detailValue}>Dental Center</Text>
          </Section>

          <Text style={text}>
            Please arrive 15 minutes early for your appointment. If you need to
            reschedule or cancel, please contact us at least 24 hours in
            advance.
          </Text>

          {/* CTA */}
          <Section style={buttonContainer}>
            <Link
              style={button}
              href={`${process.env.NEXT_PUBLIC_APP_URL}/appointments`}
            >
              View My Appointments
            </Link>
          </Section>

          <Text style={footer}>
            Best regards,
            <br />
            The DentWise Team
          </Text>

          <Text style={footerText}>
            If you have any questions, please contact us at support@dentwise.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

/* ----------------------------- Styles ----------------------------- */

const main: CSSProperties = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container: CSSProperties = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const logoContainer: CSSProperties = {
  textAlign: "center",
  marginBottom: "32px",
};

const logo: CSSProperties = {
  borderRadius: "8px",
  display: "inline",
  verticalAlign: "middle",
};

const logoText: CSSProperties = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#2563eb",
  margin: "0 0 0 12px",
  display: "inline",
};

const h1: CSSProperties = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
  margin: "30px 0",
};

const text: CSSProperties = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
};

const appointmentDetails: CSSProperties = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
};

const detailLabel: CSSProperties = {
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: 500,
  margin: "8px 0 4px 0",
};

const detailValue: CSSProperties = {
  color: "#1f2937",
  fontSize: "16px",
  fontWeight: 600,
  margin: "0 0 16px 0",
};

const buttonContainer: CSSProperties = {
  textAlign: "center",
  margin: "32px 0",
};

const button: CSSProperties = {
  backgroundColor: "#2563eb",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 600,
  textDecoration: "none",
  textAlign: "center",
  display: "inline-block",
  padding: "12px 24px",
};

const footer: CSSProperties = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "32px 0 16px 0",
};

const footerText: CSSProperties = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0 0 0",
  textAlign: "center",
};
