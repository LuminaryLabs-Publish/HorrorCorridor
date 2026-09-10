"use client";
import dynamic from "next/dynamic";
const Game = dynamic(() => import("../src/App"), {
  ssr: false,
  loading: () => <main role="status">Preparing the corridor…</main>,
});
export default function GameHost() { return <Game />; }
