// Site-wide settings: SEO, contact details and social links.

// Public URL of the site. Set NEXT_PUBLIC_SITE_URL in production.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://devworld.example.com";

export const SITE_NAME = "Dev World";

export const SITE_TITLE = "Dev World — Premium Software Engineering & Digital Products";

export const SITE_DESCRIPTION =
  "Dev World designs and builds custom web, mobile, cloud, and AI products for ambitious companies — from MVP to enterprise scale.";

export const CONTACT = {
  phone: "+1 (555) 012-3456",
  phoneHref: "tel:+15550123456",
  email: "hello@devworld.example.com",
  emailHref: "mailto:hello@devworld.example.com",
  office: "148 Market St, San Francisco, CA",
};

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: "/images/icons/linkedin.svg", width: 18, height: 18 },
  { label: "X", href: "https://x.com", icon: "/images/icons/twitter.svg", width: 17, height: 17 },
  { label: "GitHub", href: "https://github.com", icon: "/images/icons/github.svg", width: 20, height: 20 },
];
