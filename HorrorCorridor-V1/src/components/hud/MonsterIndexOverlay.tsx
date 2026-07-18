"use client";

import { useRuntimeStore } from "@/features/game-state/store/runtimeStore";

type MonsterIndexOverlayProps = Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>;

export default function MonsterIndexOverlay({ isOpen, onClose }: MonsterIndexOverlayProps) {
  const expedition = useRuntimeStore((state) => state.authoritativeSnapshot?.expedition ?? null);
  const collected = expedition?.monsterIndex.filter((entry) => entry.knowledge === "collected").length ?? 0;
  const total = expedition?.monsterIndex.length ?? 0;

  return (
    <div
      data-testid="monster-index-overlay"
      className={[
        "pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-[rgba(0,5,2,0.86)] px-4 py-6 backdrop-blur-md transition-opacity",
        isOpen ? "opacity-100" : "invisible opacity-0",
      ].join(" ")}
      aria-hidden={!isOpen}
    >
      <section className="pointer-events-auto max-h-[88vh] w-full max-w-3xl overflow-y-auto border border-[#77ff90]/25 bg-[rgba(3,12,6,0.96)] p-5 text-[#d8ffe0] shadow-[0_0_90px_rgba(36,255,105,0.08)]">
        <div className="flex items-start justify-between gap-4 border-b border-[#77ff90]/15 pb-4">
          <div>
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#83c98f]">Field Chronicle</p>
            <h2 className="mt-2 text-xl uppercase tracking-[0.32em] text-white">Monster Index</h2>
            <p className="mt-3 max-w-xl text-[11px] normal-case leading-5 tracking-[0.08em] text-[#9ec6a5]">
              A monster is collected only after you let its full scare happen and still repel it.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#77ff90]/20 bg-black/30 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-[#d8ffe0]"
          >
            M / Close
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-[9px] uppercase tracking-[0.26em] text-[#86d694]">
          <span>{collected}/{total} collected</span>
          <span>{expedition?.encountersSurvived ?? 0} encounters survived</span>
          <span>Building {Math.max(1, expedition?.buildingNumber ?? 1)}</span>
        </div>

        {expedition?.roomOffer && !expedition.roomOffer.claimed ? (
          <div className="mt-4 border border-[#b7ff7a]/25 bg-[#b7ff7a]/[0.04] p-4">
            <p className="text-[9px] uppercase tracking-[0.36em] text-[#c7ff97]">Room offering — E to take</p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white">{expedition.roomOffer.title}</p>
            <p className="mt-2 text-[11px] normal-case leading-5 tracking-[0.06em] text-[#b6d8bb]">
              {expedition.roomOffer.description}
            </p>
          </div>
        ) : null}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {(expedition?.monsterIndex ?? []).map((entry, index) => {
            const known = entry.knowledge !== "unknown";
            const studied = entry.knowledge === "studied" || entry.knowledge === "collected";
            const collectedEntry = entry.knowledge === "collected";
            return (
              <article
                key={entry.id}
                className="border border-[#77ff90]/15 bg-black/25 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.32em] text-[#6f9f78]">Record {String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 text-sm uppercase tracking-[0.22em] text-white">
                      {known ? entry.name : "Unknown presence"}
                    </h3>
                  </div>
                  <span className="border border-[#77ff90]/16 px-2 py-1 text-[8px] uppercase tracking-[0.18em] text-[#8ed79a]">
                    {entry.knowledge}
                  </span>
                </div>
                <dl className="mt-4 space-y-3 text-[10px] normal-case leading-5 tracking-[0.05em]">
                  <div>
                    <dt className="uppercase tracking-[0.25em] text-[#6f9f78]">Sign</dt>
                    <dd className="mt-1 text-[#c4ddc8]">{known ? entry.sign : "Not yet heard."}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.25em] text-[#6f9f78]">Scare</dt>
                    <dd className="mt-1 text-[#c4ddc8]">{studied ? entry.scare : "Survive an encounter to understand it."}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.25em] text-[#6f9f78]">Response</dt>
                    <dd className="mt-1 text-[#c4ddc8]">{studied ? entry.response : "No response recorded."}</dd>
                  </div>
                </dl>
                {collectedEntry ? (
                  <p className="mt-4 border-t border-[#77ff90]/12 pt-3 text-[9px] uppercase tracking-[0.27em] text-[#a7ffb6]">
                    Full scare survived · Encounter {entry.collectedAtEncounter}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
