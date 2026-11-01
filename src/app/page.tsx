import { HeroSection } from "@/components/sections/hero-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExpertiseSection } from "@/components/sections/expertise-section";
import { TechnicalAdvantageSection } from "@/components/sections/technical-advantage-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { WorkflowSection } from "@/components/sections/workflow-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { GsapPage } from "@/components/motion/gsap-page";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <GsapPage />
      <HeroSection />
      <ImpactSection />
      <AboutSection />
      <ExpertiseSection />
      <TechnicalAdvantageSection />
      <FeaturedProjectsSection />
      <WorkflowSection />
      <ExperienceSection />
      <TechnologySection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
