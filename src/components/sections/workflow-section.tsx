import { lifecycle } from "@/data/expertise";
import { SectionHeading } from "@/components/ui/section-heading";
import { WorkflowSteps } from "./workflow-steps";
import { WorkflowPinned } from "./workflow-pinned";

export function WorkflowSection() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="relative overflow-clip bg-bg-2/70">
      <div aria-hidden className="absolute inset-x-0 top-0 hairline" />
      <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
      <div className="site-w relative pt-24 sm:pt-32">
        <SectionHeading id="approach-title" index="06" eyebrow="My Approach" title={<>From Initial Concept to <span className="text-gradient">Successful Delivery.</span></>} text="A clear six-stage lifecycle that keeps clients, designers, developers and QA aligned from the first conversation to post-launch support." />
      </div>
      {/* Small screens, tablets and reduced-motion-free fallback: simple connected timeline. */}
      <div className="site-w relative pb-24 sm:pb-32 lg:hidden">
        <WorkflowSteps steps={lifecycle} />
      </div>
      {/* Large screens: scroll-driven stage. */}
      <div className="relative hidden lg:block">
        <WorkflowPinned steps={lifecycle} />
      </div>
    </section>
  );
}
