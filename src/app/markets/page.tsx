import { redirect } from "next/navigation";

export default function MarketsRedirect() {
  redirect("/enter-market");
  return null;
}
