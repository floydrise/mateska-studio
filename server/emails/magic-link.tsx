import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Img,
} from "@react-email/components";

const MagicLink = ({ email, url }: { email: string; url: string }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Добре дошъл в Mateska Studio</Preview>
      <Container style={container}>
        <Img
          src="https://mateskasport.com/wp-content/uploads/2025/01/Logo-2.png"
          alt="Mateska Studio - company logo"
          width="300"
        />
        <Heading style={h1}>Здравей, {email} 👀👋🏻</Heading>
        <Text style={{ ...text, marginBottom: "14px" }}>
          Радваме се да те видим, моля кликни линка отдолу за да си влезеш в
          акаунта 👇🏻
          <br />
          {url}
        </Text>
        <Text style={{ ...footer, marginBottom: 0 }}>
          С уважение, екипът на MateskaSport 🏋
        </Text>
        <Text style={{ ...footer, marginTop: 0, marginBottom: 0 }}>
          Този имейл не се следи, моля не отговаряйте!
        </Text>
      </Container>
    </Body>
  </Html>
);

export default MagicLink;

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const footer = {
  color: "#898989",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};
