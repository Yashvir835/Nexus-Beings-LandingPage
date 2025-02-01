import { redirect } from "next/navigation";

export default function Home() {
  redirect("/landingPage"); // Redirect to landing page
  return null;
}
