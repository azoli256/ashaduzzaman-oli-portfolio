export type Testimonial = {
  quote: string;
  author: string;
  source: "Fiverr" | "LinkedIn" | "Direct";
  /** Must be a genuine, owner-approved review. */
  approved: boolean;
};

/**
 * Add REAL, owner-approved review excerpts here. Entries are only shown when
 * approved === true. Leave empty until genuine excerpts are supplied.
 */
export const testimonials: Testimonial[] = [];
