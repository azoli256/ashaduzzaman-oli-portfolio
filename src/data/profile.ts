import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Ashaduzzaman Oli",
  shortName: "Oli",
  title: "Digital Project Manager & Web Development Professional",
  location: "Mirpur, Dhaka, Bangladesh",
  publicLocation: "Dhaka, Bangladesh",
  email: "a.zaman25oli@gmail.com",
  linkedin: "https://www.linkedin.com/in/azamanoli/",
  fiverr: "https://www.fiverr.com/s/xX18QLl",
  phone: "+880 1718-526442",
  showPhone: false,
  summary: [
    "I am an experienced Digital Project Manager and Web Development Professional with over 11 years of experience delivering digital solutions for businesses worldwide.",
    "With a strong technical background in web development and hands-on experience in project leadership, I bring together technical understanding, strategic planning, and team coordination to turn complex requirements into successful digital projects.",
    "Throughout my career, I have contributed to thousands of web development projects, managed hundreds of projects in my project management role, and built lasting relationships with clients worldwide.",
    "I believe successful project management goes beyond tracking tasks. It is about understanding the bigger picture, aligning people and processes, solving challenges, and ensuring every project moves toward its intended outcome.",
  ],
};

/** Canonical domain. Set NEXT_PUBLIC_SITE_URL in Vercel when a custom domain is connected. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashaduzzaman-oli-portfolio.vercel.app"
).replace(/\/$/, "");
