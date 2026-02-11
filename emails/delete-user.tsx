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

export const DeleteUserTemplate = ({
  userName,
  url,
}: {
  userName: string;
  url: string;
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Съжаляваме, че си тръгваш 😞</Preview>
      <Container style={container}>
        <Img
          src="https://slpuwykwyzkiukdhghuc.supabase.co/storage/v1/object/public/logos/logoLight.webp"
          alt="Mateska Studio - company logo"
          width="300"
          style={{ margin: "auto" }}
        />
        <Heading style={h1}>Здравей, {userName} 👋🏻</Heading>
        <Text style={{ ...text, marginBottom: "14px" }}>
          Съжаляваме, че си тръгваш 😞
          <br />
          Моля кликни линка отдолу да потвърдиш, че искаш да изтриеш акаунта си:
          <br />
          <a href={url}>Линк за потвърждение</a>
        </Text>
        <Text style={{ ...text, color: " #FF0000" }}>
          ВАЖНО! Ако не отвориш линка отгоре, профилът ти НЯМА да бъде изтрит!
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

export default DeleteUserTemplate;

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
