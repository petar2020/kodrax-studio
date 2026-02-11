import type { Metadata } from "next";

import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Share your project scope and get a fast response from KodraX Studio."
};

export default function ContactPage() {
  return (
    <div className="page-wrap">
      <Reveal>
        <ContactSection
          title="Contact us"
          description="Describe your stack, blockers, and deadlines. We can jump in quickly for delivery or rescue work."
        />
      </Reveal>
    </div>
  );
}
