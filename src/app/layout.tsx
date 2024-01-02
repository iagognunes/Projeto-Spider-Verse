import Image from "next/image";
import "./globals.scss";
import Link from "next/link";

export const metadata = {
  title: "Spiderverse",
  description: "Executando o projeto em Next.js da plataforma DIO.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <Image
            src="/icons/menu.svg"
            alt="Opções de menu"
            width={36}
            height={25}
          />
          <Link href="/">
            <Image
              src="/spider-logo.svg"
              alt="spiderman logo"
              width={260}
              height={70}
            />
          </Link>
          <Image
            src="/icons/user.svg"
            alt="Opções de login"
            width={36}
            height={36}
          />
        </header>
        {children}
      </body>
    </html>
  );
}
