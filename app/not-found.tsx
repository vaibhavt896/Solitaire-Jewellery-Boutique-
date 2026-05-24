import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-bone min-h-[80vh] flex items-center">
      <div className="container-content text-center py-20">
        <p className="text-mono text-micro uppercase tracking-eyebrow text-gold-deep mb-4">
          Four · Zero · Four
        </p>
        <h1 className="font-display text-mega leading-[1.02]">
          The page is missing.
          <br />
          <em className="not-italic text-gold-deep">The pieces are not.</em>
        </h1>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/collections" className="btn-primary">
            View Collections
          </Link>
          <Link href="/visit" className="btn-secondary">
            Visit Us
          </Link>
        </div>
      </div>
    </section>
  );
}
