import React from "react";
import Participate from "./event/Participate";

const EventPage = () => {
  // Example event data (replace with real props or state)
  const e = {
    title: "Car Show 2025",
    description:
      "Join us for an exciting car show featuring the latest models, classic cars, and thrilling live demos.",
    type: "Exhibition",
    location: "Downtown Auto Arena",
    startDate: new Date("2025-09-15T12:00:00"),
    endDate: new Date("2025-09-15T18:00:00"),
    currency: "$",
    fee: 150,
  };

  // Format date nicely
  const formatDate = (date) =>
    date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <main className="min-h-screen bg-gradient-to-r from-black to-blue-950 text-white py-10 px-6">
      <article className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden">
        {/* Header / Banner */}
        <div className="relative h-72 md:h-96 bg-[url('https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <h1 className="text-4xl md:text-5xl font-bold text-white px-6 pb-6">
              {e.title}
            </h1>
          </div>
        </div>

        {/* Content area */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: description */}
          <section className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">About the event</h2>
            <p className="text-gray-300 leading-relaxed">{e.description}</p>

            {/* Additional details list */}
            <ul className="mt-6 space-y-3">
              <li>
                <strong className="inline-block w-28 text-gray-200">
                  Event type:
                </strong>
                <span className="text-gray-300">{e.type}</span>
              </li>
              <li>
                <strong className="inline-block w-28 text-gray-200">
                  Location:
                </strong>
                <span className="text-gray-300">{e.location}</span>
              </li>
              <li>
                <strong className="inline-block w-28 text-gray-200">
                  Date & time:
                </strong>
                <span className="text-gray-300">
                  {formatDate(e.startDate)}
                  {e.endDate ? ` — ${formatDate(e.endDate)}` : ""}
                </span>
              </li>
            </ul>
          </section>

          {/* Right: ticket / participation panel */}
          <aside className="bg-gray-800/70 p-5 rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-sm text-gray-400">Participation fee</p>
                  <p className="text-2xl font-bold mt-1">
                    {e.currency} {e.fee.toLocaleString()}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-400">
                  <p className="font-medium">Spots</p>
                  <p className="mt-1">Limited</p>
                </div>
              </div>

              <div className="mt-5">
                <button
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-transform"
                  onClick={() =>
                    alert(
                      `Thanks for wanting to participate in ${e.title}! (Implement booking logic here)`
                    )
                  }
                  aria-label={`Participate in ${e.title}`}
                >
                  Participate
                </button>
              </div>

              <div className="mt-4 text-xs text-gray-400">
                <p>
                  By clicking Participate you agree to the event terms & safety
                  rules.
                </p>
              </div>
              <Participate/>
            </div>

            <div className="mt-6 text-xs text-gray-500">
              <p>
                Contact:{" "}
                <a
                  href="mailto:info@example.com"
                  className="underline hover:text-gray-300"
                >
                  info@example.com
                </a>
              </p>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
};

export default EventPage;