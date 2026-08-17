import Link from "next/link";

/** Banner at the top of the standalone pages, matching the home hero's tone. */
export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-blush-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blush-100 to-cream" />
      <div className="pointer-events-none absolute -right-20 top-0 -z-10 h-64 w-64 rounded-full bg-blush-200/40 blur-3xl" />

      <div className="container-page py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-ink/50">
          <Link href="/" className="transition hover:text-blush-600">
            Home
          </Link>
          <span aria-hidden className="mx-2 text-blush-300">
            /
          </span>
          <span className="text-blush-700">{title}</span>
        </nav>

        <p className="eyebrow">{eyebrow}</p>
        <h1 className="heading mt-3">{title}</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink/70">{intro}</p>
      </div>
    </section>
  );
}
