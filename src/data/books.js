import quietBetweenStars from "../assets/books/quiet-between-stars.png";
import thingsWeNeverSaid from "../assets/books/things-we-never-said.png";
import mapOfSomewhere from "../assets/books/map-of-somewhere.png";
import lastSunday from "../assets/books/last-sunday.png";
import lettersToTheMoon from "../assets/books/letters-to-the-moon.png";

export const books = [
  {
    id: "quiet-between-stars",
    title: "Quiet Between Stars",
    author: "Elara James",
    genre: "Science Fiction",
    cover: quietBetweenStars,

    description:
      "A breathtaking journey across galaxies, looking for home in the quietest corners of the universe.",

    about:
      "Far beyond the familiar edges of Earth, a lone traveler crosses forgotten worlds in search of a place that feels like home. Quiet Between Stars is a story about distance, belonging, and the strange comfort of finding yourself in the middle of nowhere.",

    moods: ["hopeful", "dreamy"],

    year: 2024,
    pages: 288,
    language: "English",
    readingTime: "5h 20m",

    whyRead: [
      "A slow, atmospheric journey through space",
      "A deeply human story about belonging",
      "Dreamy world-building with quiet emotional moments",
    ],

    featured: true,
  },

  {
    id: "things-we-never-said",
    title: "Things We Never Said",
    author: "Elara James",
    genre: "Romance",
    cover: thingsWeNeverSaid,

    description:
      "An emotional exploration of words left unspoken and the healing power of raw vulnerability.",

    about:
      "Some things are easier to leave unsaid. But when two people are forced to confront the years of silence between them, old memories begin to surface. Things We Never Said explores vulnerability, forgiveness, and everything that lives between what we feel and what we say.",

    moods: ["emotional", "bittersweet"],

    year: 2023,
    pages: 312,
    language: "English",
    readingTime: "5h 45m",

    whyRead: [
      "A tender story about emotional honesty",
      "Characters shaped by complicated memories",
      "A bittersweet exploration of letting go",
    ],

    featured: true,
  },

  {
    id: "map-of-somewhere",
    title: "A Map of Somewhere",
    author: "Elara James",
    genre: "Magical Realism",
    cover: mapOfSomewhere,

    description:
      "Lose yourself in streets that change overnight and maps that lead straight to your deepest memories.",

    about:
      "Every city has places we remember, and places that remember us. When a mysterious map begins revealing streets that shouldn't exist, one young woman follows it through a shifting city and into memories she thought she'd forgotten.",

    moods: ["strange", "dreamy"],

    year: 2022,
    pages: 264,
    language: "English",
    readingTime: "4h 50m",

    whyRead: [
      "A strange and dreamlike world",
      "A story built around memory and identity",
      "Unexpected turns around every corner",
    ],

    featured: true,
  },

  {
    id: "the-last-sunday",
    title: "The Last Sunday",
    author: "Elara James",
    genre: "Historical Fiction",
    cover: lastSunday,

    description:
      "A poignant window into a bygone era where a single afternoon alters generations.",

    about:
      "On an ordinary Sunday in a changing world, one family gathers without knowing that their lives are about to shift forever. The Last Sunday follows a single afternoon whose consequences echo across decades, connecting generations through memory, loss, and love.",

    moods: ["nostalgic", "reflective"],

    year: 2021,
    pages: 336,
    language: "English",
    readingTime: "6h 10m",

    whyRead: [
      "A richly atmospheric historical setting",
      "Generational stories woven together",
      "A reflective look at memory and change",
    ],

    featured: true,
  },

  {
    id: "letters-to-the-moon",
    title: "Letters to the Moon",
    author: "Elara James",
    genre: "Poetry",
    cover: lettersToTheMoon,

    description:
      "Midnight thoughts and delicate verses written to the only witness of our quietest longings.",

    about:
      "Written in the stillness of midnight, Letters to the Moon is a collection of poems about longing, solitude, tenderness, and the small moments that become memories. Each piece feels like a private letter sent into the night.",

    moods: ["soft", "dreamy"],

    year: 2024,
    pages: 176,
    language: "English",
    readingTime: "2h 30m",

    whyRead: [
      "Quiet poetry for slow evenings",
      "Short pieces that invite reflection",
      "A dreamy collection about ordinary feelings",
    ],

    featured: true,
  },
];