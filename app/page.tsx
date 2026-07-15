import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Curriculum } from "@/components/Curriculum";
import { Testimonials, Faq } from "@/components/Testimonials";
import { CtaSection, Footer } from "@/components/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <About />
        <Curriculum />
        <Testimonials />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
