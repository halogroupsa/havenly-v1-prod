import { img } from "@/lib/images";

export type Service = {
  slug: string;
  title: string;
  /* Search-facing title and description. The on-page hero stays in the
     studio's voice; these carry the phrase the page is meant to rank for
     (keywords_planner/page_keyword_map.csv). */
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  hero: string;
  summary: string;
  image: string;
  imageAlt: string;
  /* A separate portrait crop for the homepage tiles. `image` stays landscape
     because the services index and the service page headers both use it. */
  tile: string;
  tileAlt: string;
  audience: string;
  introduction: string[];
  outcomes: { title: string; text: string }[];
  paths: { title: string; label: string; text: string }[];
  included: string[];
  process: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "home-staging",
    title: "Home staging",
    seoTitle: "Home Staging Dubai: Vacant, Occupied & Show Homes",
    seoDescription:
      "Home staging in Dubai for villas and apartments going to market: vacant, occupied and show-home staging, with furniture supplied, then collected.",
    eyebrow: "FOR SALE, RENT & SHOW HOMES",
    hero: "Help people see themselves at home.",
    summary:
      "A considered staging plan for vacant or lived-in properties, shaped around the market, the rooms and the way people move through them.",
    image: "/images/villa.webp",
    imageAlt:
      "Sunlit villa living room styled with linen seating, warm timber and garden views",
    tile: img.tileStaging,
    tileAlt:
      "Styled villa living room, photographed upright with a calm foreground",
    audience: "Homeowners · Landlords · Agents · Developers",
    introduction: [
      "An empty room asks buyers to work too hard. A busy one can hide the space they came to see. We find the balance: enough warmth and purpose to make every room easy to understand, with enough restraint for someone else to imagine their life there.",
      "As a home staging studio in Dubai, we can work with a vacant property, edit and complement what is already there, or focus on the rooms that will carry the listing. The recommendation is shaped after we understand the property, audience and campaign.",
    ],
    outcomes: [
      {
        title: "A clearer sense of space",
        text: "Layouts show scale, circulation and how each room can be used without crowding the architecture.",
      },
      {
        title: "A stronger first impression",
        text: "A cohesive visual story helps the photography, viewing experience and property presentation work together.",
      },
      {
        title: "One considered handover",
        text: "The agreed furniture, delivery, placement and final styling are coordinated as one scope.",
      },
    ],
    paths: [
      {
        label: "EMPTY PROPERTY",
        title: "Vacant staging",
        text: "Furniture and finishing layers bring proportion, function and warmth to the rooms that matter most.",
      },
      {
        label: "LIVED-IN HOME",
        title: "Occupied staging",
        text: "We edit, reposition and complement existing pieces so the home feels calm, spacious and ready to show.",
      },
      {
        label: "BEFORE THE CAMERA",
        title: "Listing-day styling",
        text: "A focused finishing pass for photography, from sightlines and surfaces to textiles and small details.",
      },
    ],
    included: [
      "Property walkthrough and project brief",
      "Priority-room and circulation plan",
      "Furniture and styling direction",
      "Sourcing or staging inventory proposal",
      "Delivery and installation coordination",
      "Final styling and handover review",
    ],
    process: [
      {
        title: "Read the property",
        text: "We review its architecture, condition, location, audience and route to market.",
      },
      {
        title: "Set the direction",
        text: "You receive a tailored scope for the right rooms, pieces and level of styling.",
      },
      {
        title: "Install with care",
        text: "We coordinate access, placement and the final details around the agreed schedule.",
      },
      {
        title: "Ready to present",
        text: "The property is handed back composed and ready for its next planned step.",
      },
    ],
    faqs: [
      {
        question: "Do you stage both vacant and occupied homes?",
        answer:
          "Yes. Vacant staging introduces furniture and styling, while occupied staging begins with what is already in the home. We recommend the right level after seeing the space.",
      },
      {
        question: "Can we stage only the main rooms?",
        answer:
          "Yes. A focused scope can prioritise the entrance, living area, dining space and primary bedroom, or another set of rooms that best supports the property presentation.",
      },
      {
        question: "Is listing photography included?",
        answer:
          "Photography can be discussed as part of the project scope. We confirm what is included in your proposal, along with any access and styling requirements for shoot day.",
      },
      {
        question: "How much does home staging cost in Dubai?",
        answer:
          "The price follows the number of rooms, how much furniture the property needs and how long the staging stays in place. A focused scope for the main rooms costs far less than a whole villa. Send the property and your listing date and we will return a clear scope and fee before anything is booked.",
      },
      {
        question: "Do we buy the staging furniture, or is it rented?",
        answer:
          "Staging furniture is supplied for the campaign and collected afterwards, so you are not left owning pieces chosen for a buyer. If you would rather keep the furniture, furnishing and styling is the better fit.",
      },
    ],
  },
  {
    slug: "furnishing-styling",
    title: "Furnishing & styling",
    seoTitle: "Furniture Packages & Interior Styling in Dubai",
    seoDescription:
      "Furnishing and interior styling for Dubai apartments, villas and holiday homes. Whole-home furniture packages sourced, delivered, placed and styled.",
    eyebrow: "FOR NEW HOMES & INVESTMENT PROPERTIES",
    hero: "From empty rooms to a complete home.",
    summary:
      "A cohesive furnishing plan, sourced and brought together around the property, your priorities and the way the home needs to work.",
    image: "/images/bedroom.webp",
    imageAlt:
      "Quiet bedroom with oatmeal upholstery, natural linen and warm walnut details",
    tile: img.tileFurnishing,
    tileAlt:
      "Furnished bedroom in oatmeal and walnut, photographed upright",
    audience: "Homeowners · Landlords · Holiday-home operators",
    introduction: [
      "Furnishing a home is rarely about finding one good sofa. Scale, lead times, room-to-room continuity and the practical layers all have to work together. As interior stylists in Dubai, we turn those decisions into one clear plan.",
      "The result can be personal and lived-in, or composed for a rental audience. Either way, each piece earns its place through comfort, proportion and how it supports the whole space.",
    ],
    outcomes: [
      {
        title: "A home that belongs together",
        text: "Furniture, lighting, rugs, art and accessories follow one restrained direction from room to room.",
      },
      {
        title: "Choices made with context",
        text: "Selections respond to room dimensions, everyday use, durability and the character of the property.",
      },
      {
        title: "Less to coordinate",
        text: "The approved scheme, ordering, delivery, placement and finishing details are managed as one project.",
      },
    ],
    paths: [
      {
        label: "A HOME OF YOUR OWN",
        title: "Move-in furnishing",
        text: "A personal, comfortable scheme built around your routines, the pieces you love and how you want to live.",
      },
      {
        label: "READY TO LET",
        title: "Rental-ready furnishing",
        text: "A durable, welcoming interior for long stays, with a clear inventory and practical everyday layers.",
      },
      {
        label: "A LIGHTER TOUCH",
        title: "Styling refresh",
        text: "New textiles, lighting, art and placement decisions bring a home into balance without starting again.",
      },
    ],
    included: [
      "Discovery call and site assessment",
      "Room layouts and design direction",
      "Furniture, lighting and textile selection",
      "Sourcing and order coordination",
      "Delivery and installation planning",
      "Accessories, styling and final handover",
    ],
    process: [
      {
        title: "Understand your brief",
        text: "We map the rooms, how they will be used, your priorities, timeline and investment range.",
      },
      {
        title: "Build the scheme",
        text: "Layouts, finishes and selections are brought into a coherent proposal for your review.",
      },
      {
        title: "Source and coordinate",
        text: "Approved pieces move into ordering, delivery planning and any required substitutions.",
      },
      {
        title: "Settle every detail",
        text: "Furniture is placed and the final layers are styled before the home is handed over.",
      },
    ],
    faqs: [
      {
        question: "Can you work within a defined investment range?",
        answer:
          "Yes. Share the property, rooms and priorities with us. We use that context to recommend a realistic scope and make the trade-offs visible before sourcing begins.",
      },
      {
        question: "Can I keep some of my existing furniture?",
        answer:
          "Absolutely. We assess the pieces you want to keep, then shape the layout and new selections around what fits the direction and the room.",
      },
      {
        question: "Do you furnish holiday homes?",
        answer:
          "We welcome holiday-home and Airbnb briefs. The proposal can account for guest comfort, durability, practical essentials and a consistent presentation for listing imagery.",
      },
      {
        question: "Do you offer furniture packages for apartments in Dubai?",
        answer:
          "Yes, as a complete furnishing scope rather than a fixed catalogue bundle. Whether it is a studio, a one-bedroom apartment or a villa, the package is specified for that property's rooms, audience and budget, then delivered, placed and styled together.",
      },
      {
        question: "What does a furniture package cover for each apartment size?",
        answer:
          "A studio package covers sleeping, living and dining in one room, with storage that keeps the floor clear. A one-bedroom adds the bedroom as its own room, and a two-bedroom adds a second bedroom, often set up as a guest room or study. A villa package runs room by room, including the majlis, terraces and staff quarters where needed. Every package includes lighting, rugs, textiles and the everyday essentials, and is scoped for the specific property before it is priced.",
      },
    ],
  },
  {
    slug: "design-consultation",
    title: "Design consultation",
    seoTitle: "Interior Design Consultation in Dubai",
    seoDescription:
      "One-to-one interior design consultation in Dubai for apartments and villas: layout, palette, furniture and what to change first, in person or remotely.",
    eyebrow: "FOR CLARITY BEFORE YOU COMMIT",
    hero: "A clear direction for the space you have.",
    summary:
      "Focused professional guidance on layout, palette, furniture and the decisions that will make the greatest difference.",
    image: "/images/dining.webp",
    imageAlt:
      "Warm apartment dining area with walnut table, oatmeal chairs and natural daylight",
    tile: img.tileConsultation,
    tileAlt:
      "Apartment dining area in daylight, photographed upright",
    audience: "Homeowners · New buyers · People planning a refresh",
    introduction: [
      "Sometimes a room does not need a full redesign. It needs a better layout, a calmer palette, the right scale of furniture or an experienced eye on what to change first.",
      "An interior design consultation brings those decisions into focus. We listen, walk through your Dubai apartment or villa and leave you with practical direction you can act on with confidence.",
    ],
    outcomes: [
      {
        title: "Decisions in the right order",
        text: "We identify the moves with the most impact before you spend time or money on the smaller details.",
      },
      {
        title: "A room that works better",
        text: "Layout and scale recommendations improve circulation, comfort and the way the space is used.",
      },
      {
        title: "A direction you can follow",
        text: "A concise set of recommendations gives your next choices a clear visual and practical foundation.",
      },
    ],
    paths: [
      {
        label: "ONE ROOM",
        title: "Room reset",
        text: "A focused review of layout, furniture scale, lighting, colour and the details holding the room back.",
      },
      {
        label: "BEFORE YOU BUY",
        title: "Selection review",
        text: "Bring shortlisted furniture, finishes or plans and get a professional view before you commit.",
      },
      {
        label: "A NEW BEGINNING",
        title: "Home direction",
        text: "Set a coherent palette and design language to guide a new home one room at a time.",
      },
    ],
    included: [
      "Pre-consultation questions and image review",
      "Focused visit or remote working session",
      "Layout and furniture-scale guidance",
      "Palette, material and lighting direction",
      "Prioritised recommendations",
      "A concise written follow-up",
    ],
    process: [
      {
        title: "Share the challenge",
        text: "Send the room, measurements where available, reference images and the decisions on your mind.",
      },
      {
        title: "Walk through it together",
        text: "We look at the space in context and test the strongest options against your priorities.",
      },
      {
        title: "Set the priorities",
        text: "The discussion becomes a clear sequence of changes, purchases and things worth keeping.",
      },
      {
        title: "Move forward clearly",
        text: "You receive the agreed direction in a practical format you can return to as you make changes.",
      },
    ],
    faqs: [
      {
        question: "Is a consultation suitable for one room?",
        answer:
          "Yes. A single room is often ideal for a focused session, especially when you need help with layout, proportion, colour or a shortlist of purchases.",
      },
      {
        question: "Can the consultation happen remotely?",
        answer:
          "Some briefs can work remotely with clear photographs, measurements and a video walkthrough. We confirm whether an in-person visit would serve the space better.",
      },
      {
        question: "Can the consultation become a full furnishing project?",
        answer:
          "Yes. If the scope grows, we can discuss moving into a furnishing and styling proposal rather than leaving you to coordinate the next stage alone.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function serviceHref(slug: string) {
  return `/services/${slug}/`;
}

/**
 * Cross-service content: how the three offers differ and which one fits a given
 * situation. It lives beside the services rather than inside them because every
 * entry is a comparison — it only means anything in relation to the other two.
 */
export const serviceGuide: Record<
  string,
  {
    waMessage: string;
    bestWhen: string;
    typicalScope: string;
    youKeep: string;
    rightIf: string[];
    considerInstead: { text: string; slug: string };
  }
> = {
  "home-staging": {
    waMessage:
      "Hello Havenly, I'd like to talk about staging a property for market.",
    bestWhen: "The property is going to market",
    typicalScope: "The rooms that carry the listing",
    youKeep: "Furniture is staged for the campaign, then collected",
    rightIf: [
      "You have a sale or rental campaign with a date attached",
      "The property is empty, part-furnished, or full of a life that is mid-move",
      "Listing photography is booked or about to be",
    ],
    considerInstead: {
      text: "If the furniture should stay in the home afterwards, furnishing & styling is the closer fit.",
      slug: "furnishing-styling",
    },
  },
  "furnishing-styling": {
    waMessage:
      "Hello Havenly, I'd like to talk about furnishing my property.",
    bestWhen: "The home is being lived in or let",
    typicalScope: "Whole home, or room by room",
    youKeep: "Everything specified is bought and stays with the property",
    rightIf: [
      "You have handover keys and empty rooms",
      "You are furnishing for long lets, holiday stays or your own family",
      "You want one coherent direction rather than a series of separate purchases",
    ],
    considerInstead: {
      text: "If the property is being sold rather than lived in, home staging is usually the better investment.",
      slug: "home-staging",
    },
  },
  "design-consultation": {
    waMessage:
      "Hello Havenly, I'd like to book a design consultation.",
    bestWhen: "The decisions are not made yet",
    typicalScope: "One room, or a direction for the whole home",
    youKeep: "A written direction you can act on at your own pace",
    rightIf: [
      "You would rather do the work yourself with a professional view first",
      "You have a shortlist and want a second opinion before committing",
      "A room is not working and you cannot name the reason",
    ],
    considerInstead: {
      text: "If you already know you want the whole project handled, start with furnishing & styling instead.",
      slug: "furnishing-styling",
    },
  },
};
