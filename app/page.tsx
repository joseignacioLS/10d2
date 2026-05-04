"use client";

import { HomeSearchBar } from "@/src/components/TTRPG/HomeSearchBar";
import { Dashboard } from "@/src/components/Views/Dashboard";

export default function Home() {
  return (
    <main>
      <HomeSearchBar />
      <Dashboard />
    </main>
  );
}
