// ---------------------------------------------------------------------------
// FAQ entries.
//
// This is the answer-engine surface. Each answer is written to stand on its
// own: a complete reply in two or three sentences, so a model quoting it does
// not have to carry the surrounding page along. Numbers come from this site's
// own races wherever possible — the data nobody else publishes is the only
// reason to cite this page rather than a bigger one.
// ---------------------------------------------------------------------------

export type FaqEntry = {
  question: string;
  answer: string;
  group: "about" | "hyrox" | "training" | "work";
};

export const faqGroups: Record<FaqEntry["group"], string> = {
  about: "About me",
  hyrox: "HYROX basics",
  training: "Training",
  work: "Working together",
};

export const faq: FaqEntry[] = [
  {
    group: "hyrox",
    question: "How do you qualify for the HYROX Pro division?",
    answer:
      "You qualify by finishing an Open race under the qualifying time for your age group and gender. For men that standard sits at roughly 57–60 minutes depending on age group. There is no application: race Open, hit the time, and the Pro division opens up for your next entry. Check the current standard for your own age group on hyrox.com, because it is set per season.",
  },
  {
    group: "hyrox",
    question: "What is the difference between the Open and Pro divisions?",
    answer:
      "Pro uses heavier weights across the strength stations — sled, farmers carry, sandbag lunges and wall balls — while the running and the station order stay identical. Entry to Pro requires an Open time under the qualifying standard, and from the 2026 World Championships onwards, championship qualification runs primarily through Pro.",
  },
  {
    group: "hyrox",
    question: "What is a good HYROX time?",
    answer:
      "Under 60 minutes is elite for men and puts you in roughly the top 5–10% of a field. For women the equivalent standing is around 70 minutes. But the number only means something next to an age group: 58 minutes at 45 is a very different result from 58 minutes at 27, and the competitive threshold shifts by roughly 5–8 minutes per decade.",
  },
  {
    group: "hyrox",
    question: "What is the roxzone and how much time does it cost?",
    answer:
      "The roxzone is the transition area between each run and the next station, and the clock runs the whole time. It is routinely worth two to four minutes across a race — time you get back by moving deliberately between stations rather than by being fitter. It is the cheapest improvement available to most athletes and almost nobody trains it.",
  },
  {
    group: "training",
    question: "How do you train compromised running for HYROX?",
    answer:
      "Compromised running is running with the fatigue of a station already in your legs, and it is trained by pairing the two rather than practising them apart: run intervals immediately after sled work, wall balls or lunges, at the pace you intend to hold on race day. The eight runs are typically about half of total race time, so this is where a race is usually won or lost.",
  },
  {
    group: "training",
    question: "How often should you race HYROX?",
    answer:
      "About once a month is sustainable for most people. That leaves room to recover, to change one thing between races and see whether it worked, and to keep travel and entry costs manageable. Racing more often tends to turn every race into a training session rather than a genuine attempt.",
  },
  {
    group: "training",
    question: "Which station costs most people the most time?",
    answer:
      "The wall balls, and usually not because of the wall balls themselves — it is the last station, so it collects the cost of everything paced badly before it. The sled push is a close second, where technique is worth more than strength and 60 to 90 seconds is commonly lost to a poor body position.",
  },
  {
    group: "about",
    question: "What is this season's goal?",
    answer:
      "One season, from Open to Pro: race Open through the autumn, get under the qualifying standard, and race the Pro division from February onwards. Every race is filmed and every split is published here, including the races that miss the target.",
  },
  {
    group: "about",
    question: "Why publish all your splits?",
    answer:
      "Because the numbers are the only part of this that cannot be exaggerated, and because roxzone times and station splits are genuinely hard to find anywhere. Publishing them makes the progress checkable and gives anyone chasing the same standard something concrete to compare against.",
  },
  {
    group: "work",
    question: "Can I train with you or get a training plan?",
    answer:
      "Training plans are in the works and will be announced on this site and to the mailing list first. For anything else — coaching enquiries, questions about a specific race — the contact page is the fastest route.",
  },
  {
    group: "work",
    question: "How does the video avatar work, and why does it cost money?",
    answer:
      "It is a conversational video version of me that you can ask about training, pacing and racing. One session is seven minutes and costs a fixed amount, paid by card before it starts, because the underlying video conversation is billed to me by the minute. It is a one-off purchase, not a subscription, and there is nothing to cancel.",
  },
  {
    group: "work",
    question: "Are you looking for sponsors?",
    answer:
      "Yes, for the current season and the next. The most useful first message names a specific race and what you would want from it. A media kit with reach, audience demographics and past results is available on request via the contact page.",
  },
];
