/** Deterministic spacing keeps the opening readable while preventing a flat cadence later. */
export function encounterSafeDistance(buildingNumber: number): number {
  if (buildingNumber <= 1) return 90;
  const laterProfile = [55, 62, 70, 58, 66];
  return laterProfile[(buildingNumber - 2) % laterProfile.length];
}
