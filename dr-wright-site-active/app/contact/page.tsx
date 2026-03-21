import Link from "next/link";
import {
  existingPatientScheduleUrl,
  isSchedulingEnabled,
  newPatientScheduleUrl,
  officeEmail,
  officeHours,
  officeLocation,
  officePhone,
} from "@/lib/features";

const isExternalUrl = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://");

function ScheduleLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (isExternalUrl(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default async function ContactPage() {
  const phoneHref = `tel:${officePhone.replace(/[^+\d]/g, "")}`;

  return (
    <main className="min-h-[calc(100vh-68px)] bg-gradient-to-b from-amber-50 to-white p-6">
      <div className="mx-auto max-w-5xl">
        {!isSchedulingEnabled && (
          <div
            role="status"
            className="mb-6 rounded-2xl border-2 border-amber-200 bg-amber-50 p-4 text-amber-900"
          >
            <p className="font-semibold">Online booking connects soon.</p>
            <p className="mt-1 text-sm">
              For now, please call <a href={phoneHref} className="underline font-medium">{officePhone}</a> to schedule.
            </p>
          </div>
        )}

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
          Dr. Wright Chiropractic
        </p>
        <h1 className="mt-2 text-4xl font-bold text-black">
          Ready to feel better?
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-gray-700">
          Schedule your visit or get in touch. Choose the option that fits you—first-time patients and returning visitors both welcome.
        </p>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border-2 border-black bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
              First Visit
            </p>
            <h2 className="mt-2 text-2xl font-bold text-black">New Patient</h2>
            <p className="mt-3 text-gray-700">
              Start here if this is your first appointment with the clinic.
            </p>
            <ScheduleLink
              href={newPatientScheduleUrl}
              className="mt-6 inline-block rounded-full bg-black px-5 py-3 text-sm font-semibold text-white"
            >
              {isSchedulingEnabled ? "Book New Patient" : "New Patient"}
            </ScheduleLink>
          </article>

          <article className="rounded-2xl border-2 border-black bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
              Returning Care
            </p>
            <h2 className="mt-2 text-2xl font-bold text-black">Existing Patient</h2>
            <p className="mt-3 text-gray-700">
              Use this option if you have already been seen in the office.
            </p>
            <ScheduleLink
              href={existingPatientScheduleUrl}
              className="mt-6 inline-block rounded-full border border-black px-5 py-3 text-sm font-semibold text-black"
            >
              {isSchedulingEnabled ? "Book Existing Patient" : "Existing Patient"}
            </ScheduleLink>
          </article>
        </section>

        <section className="mt-10 rounded-2xl border border-black bg-neutral-900 p-6 text-white">
          <h2 className="text-2xl font-semibold">Contact & Location</h2>
          <p className="mt-2 text-gray-300">
            Parking is available on-site. Please arrive 10 minutes early for your first visit to complete intake.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <a href={phoneHref} className="rounded-xl border border-white/30 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-300">Phone</p>
              <p className="mt-1 text-base font-semibold">{officePhone}</p>
            </a>
            <a href={`mailto:${officeEmail}`} className="rounded-xl border border-white/30 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-300">Email</p>
              <p className="mt-1 text-base font-semibold break-all">{officeEmail}</p>
            </a>
            <div className="rounded-xl border border-white/30 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-300">Location & Hours</p>
              <p className="mt-1 text-base font-semibold">{officeLocation}</p>
              <p className="mt-1 text-sm text-gray-300">{officeHours}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
