import { HeroSection } from "@/components/sections/hero-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExpertiseSection } from "@/components/sections/expertise-section";
import { TechnicalAdvantageSection } from "@/components/sections/technical-advantage-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { WorkflowSection } from "@/components/sections/workflow-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { SectionDots } from "@/components/layout/section-dots";
import { GsapPage } from "@/components/motion/gsap-page";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <GsapPage />
      <SectionDots />
      <HeroSection />
      <ImpactSection />
      <AboutSection />
      <ExpertiseSection />
      <TechnicalAdvantageSection />
      <ExperienceSection />
      <FeaturedProjectsSection />
      <WorkflowSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
