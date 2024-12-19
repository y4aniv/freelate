import type { Metadata } from "next";
import "@/styles/globals.css";

const metadata: Metadata = {
  title: "FreeLate",
  description:
    "En retard ? FreeLate génère vos justificatifs pour toutes les lignes RATP en un instant !",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactElement => {
  return (
    <html lang={"fr"}>
      <body>{children}</body>
    </html>
  );
};

export { metadata };
export default RootLayout;
