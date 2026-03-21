const withFallback = (value: string | undefined, fallback: string) => {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
};

/** Only allow http/https URLs for security; fallback to internal path if invalid. */
function safeScheduleUrl(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  if (!trimmed) return fallback;
  const lower = trimmed.toLowerCase();
  if (lower.startsWith("https://") || lower.startsWith("http://")) {
    return trimmed;
  }
  return fallback;
}

export const isSchedulingEnabled =
  process.env.NEXT_PUBLIC_ENABLE_SCHEDULING === "true";

export const newPatientScheduleUrl = safeScheduleUrl(
  process.env.NEXT_PUBLIC_NEW_PATIENT_SCHEDULE_URL,
  "/contact?patientType=new",
);

export const existingPatientScheduleUrl = safeScheduleUrl(
  process.env.NEXT_PUBLIC_EXISTING_PATIENT_SCHEDULE_URL,
  "/contact?patientType=existing",
);

export const officePhone = withFallback(
  process.env.NEXT_PUBLIC_OFFICE_PHONE,
  "(801) 465-8800",
);

export const officeEmail = withFallback(
  process.env.NEXT_PUBLIC_OFFICE_EMAIL,
  "WrightChiropractic@yahoo.com",
);

export const officeLocation = withFallback(
  process.env.NEXT_PUBLIC_OFFICE_LOCATION,
  "89 N 100 W St, Payson, UT 84651",
);

export const officeHours = withFallback(
  process.env.NEXT_PUBLIC_OFFICE_HOURS,
  "Mon–Thu: 8:30a–5:30p, Fri–Sun: Closed",
);
