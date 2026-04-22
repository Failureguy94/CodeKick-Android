// ─── OTP Utilities ────────────────────────────────────────────────────────────

/** Generate a secure 6-digit OTP string */
export function generateOtp(): string {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

/** Verify user-entered OTP against expected OTP */
export function verifyOtp(inputOtp: string, expectedOtp: string): boolean {
  return inputOtp.trim() === expectedOtp.trim();
}
