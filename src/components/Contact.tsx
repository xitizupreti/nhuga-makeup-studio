import { site } from "@/config/site";
import { InstagramIcon } from "./icons";

const mapSrc = `https://maps.google.com/maps?q=${site.maps.lat},${site.maps.lng}&z=16&output=embed`;

export default function Contact() {
  return (
    <section id="contact" className="section bg-white">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Visit</p>
          <h2 className="heading mt-3">Find the studio</h2>

          <div className="mt-8 space-y-6 text-sm">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-ink/50">
                Address
              </h3>
              <p className="mt-1.5 leading-relaxed text-ink/80">
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
              <a
                href={site.maps.placeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block font-semibold text-blush-600 hover:text-blush-800"
              >
                Open in Google Maps →
              </a>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-ink/50">
                Hours
              </h3>
              <dl className="mt-1.5 space-y-1">
                {site.hours.map((entry) => (
                  <div key={entry.days} className="flex justify-between gap-6">
                    <dt className="text-ink/70">{entry.days}</dt>
                    <dd className="text-ink/80">{entry.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-ink/50">
                Contact
              </h3>
              <div className="mt-1.5 flex flex-col gap-1">
                <a href={`tel:+${site.phone}`} className="text-blush-700">
                  {site.phoneDisplay}
                </a>
                <a href={`tel:+${site.phoneAlt}`} className="text-blush-700">
                  {site.phoneAltDisplay}
                </a>
                <a href={`mailto:${site.email}`} className="text-blush-700">
                  {site.email}
                </a>
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-blush-700 transition hover:text-blush-900"
                >
                  <InstagramIcon className="h-4 w-4" />
                  @nhugamakeupstudio
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[300px] overflow-hidden rounded-3xl border border-blush-100 shadow-sm sm:h-[380px]">
          <iframe
            src={mapSrc}
            title={`Map showing ${site.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
