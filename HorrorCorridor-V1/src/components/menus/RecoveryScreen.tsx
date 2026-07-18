"use client";

import type { SessionConnectionStatus } from "@/features/game-state/store/sessionStore";
import type { SharedRecoveryState } from "@/features/networking/domain/sharedRecovery";

type RecoveryScreenProps = Readonly<{
  connectionStatus: SessionConnectionStatus;
  recovery: SharedRecoveryState;
  onReconnect: () => void;
  onQuitToTitle: () => void;
}>;

export default function RecoveryScreen({
  connectionStatus,
  recovery,
  onReconnect,
  onQuitToTitle,
}: RecoveryScreenProps) {
  const isRecovering = recovery.connection === "reconnecting";
  const lastPlace = recovery.disconnection?.lastKnownPlace;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/76 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[1.85rem] border border-[#7aff86]/20 bg-[rgba(0,7,2,0.9)] p-6 shadow-[0_0_42px_rgba(122,255,134,0.08)]">
        <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-[#b8ffbf]/70">
          Shared expedition
        </p>
        <h2 className="mt-3 text-3xl font-semibold uppercase tracking-[0.18em] text-white">
          {isRecovering ? "Recovering your place." : "Connection lost."}
        </h2>
        <p className="mt-4 font-mono text-sm leading-7 text-[#d6ffd8]">
          {isRecovering
            ? "The host has been found. Restoring the latest authoritative corridor truth."
            : "Your last known place is preserved. Rejoin the same expedition when the host is reachable."}
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-3 rounded-[1.15rem] border border-[#7aff86]/14 bg-black/35 p-4 font-mono text-[10px] uppercase tracking-[0.2em]">
          <div>
            <dt className="text-[#8fb692]">Last building</dt>
            <dd className="mt-1 text-sm text-white">
              {lastPlace?.buildingNumber ?? "--"}
            </dd>
          </div>
          <div>
            <dt className="text-[#8fb692]">Score</dt>
            <dd className="mt-1 text-sm text-white">
              {lastPlace?.encountersSurvived ?? "--"}
            </dd>
          </div>
          <div>
            <dt className="text-[#8fb692]">Last tick</dt>
            <dd className="mt-1 text-sm text-white">
              {lastPlace?.authoritativeTick ?? "--"}
            </dd>
          </div>
          <div>
            <dt className="text-[#8fb692]">Status</dt>
            <dd className="mt-1 text-sm text-white">{connectionStatus}</dd>
          </div>
        </dl>

        <div className="mt-6 grid gap-3">
          <button
            type="button"
            onClick={onReconnect}
            disabled={isRecovering}
            className="rounded-[1.15rem] border border-[#7aff86]/24 bg-[rgba(122,255,134,0.1)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-[#9effac]/48 hover:bg-[rgba(122,255,134,0.16)] disabled:cursor-wait disabled:opacity-55"
          >
            {isRecovering ? "Recovering expedition" : "Rejoin expedition"}
          </button>
          <button
            type="button"
            onClick={onQuitToTitle}
            className="rounded-[1.15rem] border border-[#7aff86]/18 bg-black/35 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#d6ffd8] transition hover:border-[#9effac]/35 hover:bg-black/45"
          >
            Quit to title
          </button>
        </div>
      </div>
    </div>
  );
}
