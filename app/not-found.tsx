import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-bone min-h-[80vh] flex items-center">
      <div className="container-content text-center py-20">
        <p className="text-mono text-micro uppercase tracking-eyebrow text-gold-deep mb-4">
          Four · Zero · Four
        </p>
        <h1 className="font-display text-mega leading-[1.02]">
          This piece seems to
          <br />
          <em className="not-italic text-gold-deep">have wandered off.</em>
        </h1>
        <p className="body-lead max-w-md mx-auto mt-6">
          The page you are looking for is not here. But plenty of beautiful things
          are, start with our collections, or simply come and see us.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/collections" className="btn-primary">
            See the Collections
          </Link>
          <Link href="/visit" className="btn-secondary">
            Visit the Boutique
          </Link>
        </div>
      </div>
    </section>
  );
}
