/**
 * PLACEHOLDER CONTENT.
 *
 * These are written examples of the shape and length of quote the layout is
 * designed for. They are not real client words and no client has approved them.
 * Replace every entry with approved quotes and set `testimonialsArePlaceholder`
 * to false — the section shows a visible placeholder note until you do.
 */
export const testimonialsArePlaceholder = true;

export type Testimonial = {
  quote: string;
  attribution: string;
  context: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The rooms finally made sense. Everything we had been arguing about for months was settled in an afternoon, and none of it felt like a compromise.",
    attribution: "Client name",
    context: "Four-bedroom villa · Dubai",
  },
  {
    quote:
      "Our listing photographs went from something we tolerated to something we were happy to lead with. The difference was the furniture nobody noticed.",
    attribution: "Client name",
    context: "Property agent · Dubai Marina",
  },
  {
    quote:
      "We were handed keys to eleven empty rooms and no idea where to begin. Having one plan for the whole home removed the part we had been dreading.",
    attribution: "Client name",
    context: "Townhouse handover · Arabian Ranches",
  },
  {
    quote:
      "A single consultation changed what we bought. We spent less than planned and the rooms feel considered rather than assembled.",
    attribution: "Client name",
    context: "Apartment refresh · Jumeirah Village Circle",
  },
];
