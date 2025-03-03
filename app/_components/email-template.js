import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = process.env.BASE_URL || "http://localhost:3000";

function WelcomeEmail({ firstName }) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>
          Welcome to Fit Flow, {firstName}! Start tracking your fitness journey
          today.
        </Preview>

        <Container style={container}>
          <Img
            src={`${baseUrl}/public/images/logo.png`}
            width="120"
            height="auto"
            alt="Fit Flow Logo"
          />
          <Text style={title}>Welcome to Fit Flow, {firstName}!</Text>
          <Section style={section}>
            <Text style={text}>
              We're thrilled to have you on board! Fit Tracker is designed to
              help you achieve your fitness goals by tracking your progress,
              workouts, and stats.
            </Text>
            <Text style={text}>
              Explore your dashboard to start adding your workouts, set fitness
              goals, and stay motivated with real-time progress updates.
            </Text>

            <Button style={ctaButton}>
              <Link href="https://fitflow.com" style={link}>
                Get Started
              </Link>
            </Button>
          </Section>

          <Text style={footerText}>
            Need help? Visit our{" "}
            <Link href="https://fittracker.com/support" style={footerLink}>
              support page
            </Link>{" "}
            or contact us anytime.
          </Text>

          <Text style={footer}>
            Fit Tracker | 123 Fitness St., Health City, Fitland
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeEmail;

const main = {
  backgroundColor: "#f4f4f9",
  color: "#333",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
};

const container = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

const title = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#111827",
  marginBottom: "20px",
};

const section = {
  padding: "20px",
  borderRadius: "5px",
  backgroundColor: "#f9f9f9",
  textAlign: "center",
};

const text = {
  fontSize: "16px",
  color: "#555",
  lineHeight: "1.5",
  marginBottom: "20px",
};

const ctaButton = {
  backgroundColor: "#111827",
  color: "#ffffff",
  fontSize: "16px",
  padding: "12px 24px",
  borderRadius: "5px",
  textDecoration: "none",
  margin: "20px 0",
};

const link = {
  color: "#ffffff",
  textDecoration: "none",
};

const footerText = {
  fontSize: "14px",
  color: "#777",
  textAlign: "center",
};

const footerLink = {
  color: "#111827",
  textDecoration: "none",
};

const footer = {
  fontSize: "12px",
  color: "#777",
  textAlign: "center",
  marginTop: "30px",
};
