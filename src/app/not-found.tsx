import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center px-5 text-center">
      <div>
        <p className="eyebrow">Error 404</p>
        <h1 className="h-section mt-4">This page isn&apos;t part of the plan.</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-2">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8"><Button href="/">Back to homepage</Button></div>
      </div>
    </section>
  );
}
