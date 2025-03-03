import Providers from "../(site)/Providers";
import AuthContext from "../context/AuthContext";
import ToasterContext from "../context/ToasterContext";
import "../globals.css";

export const metadata = {
  title: "Welcome to Fit Flow",
};

export default function AuthLayout({ children }) {
  return (
    <Providers>
      <AuthContext>
        <ToasterContext />
        {children}
      </AuthContext>
    </Providers>
  );
}
