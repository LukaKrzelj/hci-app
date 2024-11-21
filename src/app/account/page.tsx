import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AccountPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-6xl font-extrabold tracking-tight">Account</h1>
    </main>
  );
}