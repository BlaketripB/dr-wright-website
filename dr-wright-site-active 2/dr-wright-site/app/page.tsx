<div className="p-4 bg-green-500 text-white rounded-xl">Tailwind ON</div>

export default function Page() {
  return (
    <div className="p-10">
      <div className="bg-red-500 md:bg-green-500 text-white p-10 rounded-xl">
        Red on small screens, GREEN on large screens.
      </div>
    </div>
  );
}
