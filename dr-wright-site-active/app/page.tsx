import { isSchedulingEnabled } from "@/lib/features";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold">Dr. Wright Chiropractic</h1>

      <p className="mt-3 max-w-xl">
        Welcome — this is the new website. We’ll add full content and scheduling next.
      </p>

      {isSchedulingEnabled ? (
        <p className="mt-6 max-w-xl rounded-xl border p-4">
          Use the Schedule button in the top navigation to choose New or Existing Patient booking.
        </p>
      ) : (
        <p className="mt-6 max-w-xl rounded-xl border p-4">
          Online scheduling is coming soon. Please call the office for appointments.
        </p>
      )}
    </main>
  );
}
