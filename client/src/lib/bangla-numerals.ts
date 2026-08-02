// Extracted 2026-08-02 rather than copy-pasted a second time. The first copy
// (in AIToolsVault.tsx) existed because a Bangla comparison figure had drifted
// from its English counterpart after only one of the two was corrected during
// a reprice — a second independently-typed copy of the same digit map is
// exactly how that kind of drift recurs.
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const bnDigits = (n: number): string =>
  n.toLocaleString("en-US").replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

export const bnBdt = (n: number): string => `৳${bnDigits(n)}`;
