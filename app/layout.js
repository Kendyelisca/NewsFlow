import { Inter } from "next/font/google";
import "./globals.css";
import MyNavbar from "@/components/navbar/Navbar";
import Myfooter from "@/components/footer/Footer";
import { NewsContextProvider } from "@/contexts/newsContext";
import { UserContextProvider } from "@/contexts/user-context";
import { SaveProvider } from "@/contexts/saveContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NewsFlow App",
  description: "created by Kendy Elisca",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NewsContextProvider>
          <UserContextProvider>
            <SaveProvider>
              {" "}
              <MyNavbar />
              {children}
              <Myfooter />
            </SaveProvider>
          </UserContextProvider>
        </NewsContextProvider>
      </body>
    </html>
  );
}
