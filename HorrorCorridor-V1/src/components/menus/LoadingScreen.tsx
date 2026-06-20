"use client";

type LoadingScreenProps = Readonly<{
  steps: readonly string[];
  activeStep: number;
}>;

export default function LoadingScreen({ steps, activeStep }: LoadingScreenProps) {
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-[#050403] px-4">
      <div className="w-full max-w-lg rounded-[1.65rem] border border-[#a78355]/30 bg-[rgba(14,10,6,0.9)] p-6 text-[#e2d3ba] shadow-[0_0_42px_rgba(180,138,85,0.12)]">
        <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-[#c6a06b]/80">
          Loading Corridor
        </p>
        <h2 className="mt-3 text-2xl font-semibold uppercase tracking-[0.18em] text-white">
          Generating scene kits
        </h2>
        <div className="mt-6 grid gap-3 font-mono text-xs uppercase tracking-[0.22em]">
          {steps.map((step, index) => (
            <div
              key={step}
              className={[
                "flex items-center justify-between rounded-full border px-4 py-2",
                index <= activeStep
                  ? "border-[#c4945d]/35 bg-[#c4945d]/10 text-[#f2d7b1]"
                  : "border-[#69513a]/28 bg-black/25 text-[#86725d]",
              ].join(" ")}
            >
              <span>{step}</span>
              <span>{index < activeStep ? "done" : index === activeStep ? "active" : "queued"}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
