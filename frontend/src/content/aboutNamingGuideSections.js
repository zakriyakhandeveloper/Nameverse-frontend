/**
 * Long-form About / naming guide: many short paragraphs under clear h2/h3 hierarchy for SEO and readability.
 */

const THEMES = [
  "Islamic and Quranic baby names",
  "Hindu and Sanskrit-inspired names",
  "Christian and biblical names",
  "Urdu and Arabic naming traditions",
  "modern and globally portable names",
  "pronunciation and everyday usability",
  "multicultural and blended families",
  "surname harmony and initials",
  "spiritual and virtue-based names",
  "trending lists versus timeless choices",
];

function parasFor(theme, variant) {
  const v = variant % 4;
  const t = theme;
  const blocks = [
    [
      `Parents researching ${t} often want more than popularity charts. Meaning, dignity, and family values should lead the conversation before aesthetics alone.`,
      `Start with two or three trusted references. When meanings align across sources, you gain confidence. When they conflict, dig into language family and historical usage.`,
      `Shortlisting early reduces stress. Keep a written list with notes on pronunciation and spelling so grandparents and siblings can rehearse the name comfortably.`,
    ],
    [
      `For ${t}, consider how the name ages from kindergarten to career. Names that feel charming on a baby should still sound professional on a resume.`,
      `If your household speaks more than one language, say the candidate name aloud in each. Friction-free pronunciation supports your child’s confidence in new settings.`,
      `Document the meaning you intend to pass down. Many families keep a one-line note in a baby book or digital folder so the story stays clear for the child later.`,
    ],
    [
      `Cultural respect matters when choosing ${t}. A meaningful name should reflect understanding, not surface trend-chasing borrowed from traditions outside your own without context.`,
      `Discuss nicknames and common shortenings before you finalize. Some families love flexible names; others prefer a single formal form used everywhere.`,
      `Check initials and monograms with the family surname. Small details prevent unintended acronyms that could distract from an otherwise beautiful choice.`,
    ],
    [
      `Balance uniqueness with clarity. ${t} can be distinctive yet still easy for teachers, doctors, and colleagues to pronounce and spell fairly on the first try.`,
      `Involve both parents in veto rules early. Agreeing on criteria—length, faith alignment, or honor names—prevents last-minute conflict during registration.`,
      `NameVerse focuses on practical guidance: origin notes, pronunciation tips, and context so your final pick feels intentional rather than rushed from a random generator.`,
    ],
  ];
  return blocks[v];
}

const H2_BLUEPRINTS = [
  {
    id: "meanings-origins-research",
    title: "Name Meanings, Origins, and Authentic Research",
    topicTitles: [
      "Why verified meanings matter",
      "Linguistic roots and spelling variants",
      "Cross-checking sources responsibly",
      "From shortlist to final decision",
      "Honoring tradition without stereotypes",
      "When meanings evolve over time",
    ],
  },
  {
    id: "faith-culture-values",
    title: "Faith, Culture, and Family Values in Naming",
    topicTitles: [
      "Islamic naming considerations",
      "Hindu and Sanskrit naming context",
      "Christian and biblical resonance",
      "Blended families and respectful choices",
      "Grandparents and extended family",
      "Passing values through a name",
    ],
  },
  {
    id: "pronunciation-spelling",
    title: "Pronunciation, Spelling, and Daily Usability",
    topicTitles: [
      "Classroom and workplace clarity",
      "Bilingual and multilingual homes",
      "Hyphens, diacritics, and legal documents",
      "Nickname planning",
      "Search and social visibility",
      "Teaching others to say it correctly",
    ],
  },
  {
    id: "trends-timeless",
    title: "Trending Names and Timeless Alternatives",
    topicTitles: [
      "Reading popularity data wisely",
      "Classic names with modern appeal",
      "Avoiding dated-sounding extremes",
      "Sibling name harmony",
      "Middle names as a bridge",
      "Revisiting family trees for inspiration",
    ],
  },
  {
    id: "surname-siblings",
    title: "Surname Fit, Siblings, and Full-Name Flow",
    topicTitles: [
      "Rhythm and syllable balance",
      "Initials and monograms",
      "Honor names and combinations",
      "Avoiding tongue-twisters",
      "Future-proofing the full legal name",
      "Testing the name in real sentences",
    ],
  },
  {
    id: "consultation-practical",
    title: "Practical Checklists and Consultation Support",
    topicTitles: [
      "Questions to ask before you decide",
      "How professional guidance helps",
      "Using NameVerse alongside family input",
      "Timing your decision in pregnancy",
      "After birth: gentle adjustments",
      "Keeping joy in the process",
    ],
  },
  {
    id: "identity-longterm",
    title: "Long-Term Identity, Confidence, and Belonging",
    topicTitles: [
      "Names as part of self-story",
      "Resilience and uncommon names",
      "Global travel and migration",
      "Digital identity and usernames",
      "Supporting your child’s questions",
      "When a name carries multiple heritages",
    ],
  },
  {
    id: "resources-next-steps",
    title: "Resources, Etiquette, and Next Steps",
    topicTitles: [
      "Using the NameVerse name directory",
      "Blog guides for deeper topics",
      "When to seek one-to-one consultation",
      "WhatsApp and quick questions",
      "Respecting privacy and cultural sensitivity",
      "Building your final shortlist",
    ],
  },
];

export function getAboutNamingGuideSections() {
  return H2_BLUEPRINTS.map((section, sIdx) => ({
    id: section.id,
    title: section.title,
    topics: section.topicTitles.map((topicTitle, tIdx) => {
      const theme = THEMES[(sIdx * 3 + tIdx) % THEMES.length];
      const variant = sIdx + tIdx * 7;
      return {
        id: `${section.id}-t${tIdx}`,
        title: topicTitle,
        paragraphs: parasFor(theme, variant),
      };
    }),
  }));
}

export const aboutNamingGuideHubTitle =
  "Baby Naming Knowledge Hub: Meanings, Traditions, and Practical Guidance";
