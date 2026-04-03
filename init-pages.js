const { pages } = require('./lib/db');

const initialPages = [
  {
    title: "About Us",
    slug: "about",
    content: {
      hero: {
        headline: "Building Trust, Delivering Impact",
        subheadline: "We exist to transform charitable intentions into real, completed infrastructure that serves communities for generations to come."
      },
      mission: {
        title: "Our Mission",
        text: "To simplify charity construction by managing end-to-end projects for donors, ensuring every dollar is used wisely, transparently, and effectively to create lasting infrastructure that transforms communities."
      },
      vision: {
        title: "Our Vision",
        text: "A world where charitable construction is trusted, accessible, and impactful - where every donor can confidently build infrastructure that creates opportunity, dignity, and lasting change for generations."
      }
    },
    published: true
  }
];

initialPages.forEach(p => {
  try {
    pages.create(p);
    console.log(`Created page: ${p.title}`);
  } catch (e) {
    console.error(`Failed to create page ${p.title}:`, e.message);
  }
});
