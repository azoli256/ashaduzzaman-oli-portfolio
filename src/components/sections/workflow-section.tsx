import { lifecycle } from "@/data/expertise";
import { SectionHeading } from "@/components/ui/section-heading";
import { WorkflowSteps } from "./workflow-steps";

export function WorkflowSection() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="relative overflow-hidden bg-bg-2/70 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 hairline" />
      <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="approach-title" index="06" eyebrow="My Approach" title={<>From Initial Concept to <span className="text-gradient">Successful Delivery.</span></>} text="A clear six-stage lifecycle that keeps clients, designers, developers and QA aligned from the first conversation to post-launch support." />
        <WorkflowSteps steps={lifecycle} />
      </div>
    </section>
  );
}
