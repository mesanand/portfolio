// Projects. Source: docs/overhaul/07-ANSWERS.md section 3
// (overrides 04-CONTENT-INVENTORY.md section 3).
// At most three `featured: true`; those show on Home.
// CUT per 07: Backyard, bitsdime, Simple-Quiz-Game, Ask Vida.
import type { ProjectInput } from "./schemas";

export const projects: ProjectInput[] = [
  {
    id: "chordly",
    name: "Chordly",
    tagline: "Three AI models that write chord progressions.",
    description:
      "Compares three ways to generate chord progressions: a Markov chain, a PyTorch LSTM, and a genetic algorithm scored on corpus transition probabilities. Output renders to MIDI and audio with music21 and FluidSynth, behind a FastAPI backend and a Streamlit app for side-by-side comparison.",
    year: 2026,
    tags: ["ml", "ai"],
    stack: ["Python", "PyTorch", "FastAPI", "Streamlit", "music21", "FluidSynth"],
    links: {
      repo: "https://github.com/Sadfahlsdj/CS4100-Project",
      video: "https://youtu.be/r7bYgrsZ570",
    },
    outcome: "CS 4100 (Artificial Intelligence) final project. Project manager for a team of four.",
  },
  {
    id: "inquisiv",
    name: "Inquisiv",
    tagline: "Automated market research for dropshipping stores.",
    description:
      "Finds trending products by scraping and ML, reads customer sentiment with NLP, generates ad copy, and puts it all on an analytics dashboard so e-commerce sellers can scale faster.",
    year: 2025,
    tags: ["ml", "web", "hackathon"],
    stack: [
      "React",
      "Flask",
      "Playwright",
      "BeautifulSoup",
      "PyTorch",
      "scikit-learn",
      "NLTK",
      "Matplotlib",
    ],
    links: {
      repo: "https://github.com/Sadfahlsdj/Finhacks_2025",
      devpost: "https://devpost.com/software/inquisiv",
    },
    outcome:
      "Won two tracks at FinHacks 2025: Inclusive Innovator Award and Best Web/App Dev Hack.",
    featured: true,
  },
  {
    id: "trackntrip",
    name: "TrackNTrip",
    tagline: "ML-optimized road trips.",
    description:
      "Picks the cheapest gas stops along a route by weighing fuel price against detour and time, estimates CO2, and adds AI landmark storytelling and a leaderboard so sustainable driving is a game.",
    year: 2025,
    tags: ["ml", "hackathon"],
    stack: ["React", "Flask", "Leaflet.js", "XGBoost", "scikit-learn", "SHAP", "osmnx", "Llama"],
    links: {
      repo: "https://github.com/Sadfahlsdj/Hack_Beanpot_2025",
      devpost: "https://devpost.com/software/trackntrip",
    },
    outcome: "Built at HackBeanPot 2025.",
    featured: true,
  },
  {
    id: "campus-nutrition-assistant",
    name: "Campus Nutrition Assistant",
    tagline: "Dining hall menus, scraped and scored.",
    description:
      "Scrapes Northeastern's dining hall menus and uses an LLM to build balanced daily meal plans around a student's dietary needs.",
    year: 2024,
    tags: ["ai", "hackathon"],
    stack: ["Python", "OpenAI API", "Playwright"],
    links: {
      // TODO(mehr): the repo in 07 (github.com/Sadfahlsdj/wafflehacks_june_2024) returns 404; is it private or renamed? Add `repo` once it is public.
      devpost: "https://devpost.com/software/campus-nutrition-assistant",
    },
    outcome: "Honorable Mention, Student Food Insecurity track, WaffleHacks 2024.",
    featured: true,
  },
  {
    id: "cosint",
    name: "Cosint",
    tagline: "A REST API matching students to co-ops.",
    description:
      "REST API and dashboard that connects students and employers for co-op search. Built as the final project for CS 3200 (Database Design) at Northeastern.",
    // TODO(mehr): year 2024 is a best guess from the repo; fix if wrong.
    year: 2024,
    tags: ["api", "data"],
    stack: ["FastAPI", "SQL", "Streamlit", "Docker"],
    links: {
      repo: "https://github.com/EhlOps/cosint",
      video: "https://www.youtube.com/watch?v=xzaVzXxL7mE",
    },
    outcome: "CS 3200 final project.",
  },
  {
    id: "pistachio",
    name: "Pistachio",
    tagline: "A commute app for the Northeastern Verizon Campus Challenge.",
    description:
      "Concept and pitch for a campus commute app, our team's entry in the Northeastern Verizon Campus Challenge.",
    year: 2025,
    tags: ["web"],
    stack: [],
    links: {
      video: "https://www.youtube.com/watch?v=5Y9aCHEExkU",
    },
  },
];
