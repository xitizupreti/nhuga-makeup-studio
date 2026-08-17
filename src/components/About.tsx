import Link from "next/link";
import { founder, site } from "@/config/site";

const points = [
  {
    title: "In studio or at your venue",
    body: "Come to the studio in Kathmandu, or book outdoor service and we come to your home or venue on the day.",
  },
  {
    title: "Built for the camera",
    body: "Long-wearing products and finishes chosen so the look holds through a full day of photos and functions.",
  },
  {
    title: "Learn it yourself",
    body: "Small-batch classes in professional makeup, hair styling and nail extension, taught hands-on.",
  },
];

export default function About() {
  return (
    <section id="about" className="section bg-white">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="eyebrow">About</p>
          <h2 className="heading mt-3">A studio built around your day</h2>
          <p className="mt-6 leading-relaxed text-ink/70">
            {site.name} is {founder.name}&apos;s studio in Kalimati, Kathmandu,
            working on bridal, engagement and party looks alongside nail
            extension and lash work. Every booking starts with a conversation
            about the outfit, the venue and how you want to feel — the look
            follows from there.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#booking" className="btn-primary">
              Book a consultation
            </a>
            <Link href="/about" className="btn-secondary">
              More about {founder.name.split(" ")[0]} →
            </Link>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-1">
          {points.map((point) => (
            <li
              key={point.title}
              className="rounded-2xl border border-blush-100 bg-blush-50/60 p-6"
            >
              <h3 className="font-serif text-xl text-blush-900">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {point.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
