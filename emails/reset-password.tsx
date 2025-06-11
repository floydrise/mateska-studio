import {
  Img,
  Html,
  Head,
  Body,
  Preview,
  Container,
  Heading,
  Text,
} from "@react-email/components";

const ResetPassword = ({ name, url }: { name: string; url: string }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Следвай стъпките описани в имейла</Preview>
      <Container style={container}>
        <Img
          src="https://mateskasport.com/wp-content/uploads/2025/01/Logo-2.png"
          alt="Mateska Studio - company logo"
          width="300"
          style={{ margin: "auto" }}
        />
        <Heading style={h1}>Здравей, {name} 👀👋🏻</Heading>
        <Text style={{ ...text, marginBottom: "14px" }}>
          Забрави паролата, а? Моля, кликни линка отдолу и следвай стъпките за
          спяна на парола 👇🏻
          <br />
          {url}
          <br />
          Успех!
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

export default ResetPassword;

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
