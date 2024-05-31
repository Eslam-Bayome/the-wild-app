import Header from "./_components/Header";
import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
const josifn = Josefin_Sans({
  display: "swap",
  subsets: ["latin"],
});
export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description: "Luxurious cabin hotel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josifn.className} relative flex flex-col bg-primary-950 text-primary-100 min-h-screen`}
      >
        <Header>
          <Logo />
          <nav>
            <Navigation />
          </nav>
        </Header>
        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl  mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
