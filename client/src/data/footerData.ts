// src/data/footerData.ts
export const footerData = {
  hotel: {
    title: "Carlton Madagascar",
    description: "L'art de vivre à la française au cœur d'Antananarivo. Un hôtel 5 étoiles où luxe et raffinement créent une expérience inoubliable.",
    newsletter: {
      title: "Newsletter",
      description: "Recevez nos offres exclusives et actualités",
      placeholder: "Votre email",
      button: "S'abonner"
    }
  },
  sections: [
    {
      title: "L'Hôtel",
      links: [
        { label: "À propos", href: "/about" },
        { label: "Histoire", href: "/history" },
        { label: "Récompenses", href: "/awards" },
        { label: "Emplois", href: "/careers" }
      ]
    },
    {
      title: "Services",
      links: [
        { label: "Chambres & Suites", href: "/chambres" },
        { label: "Restaurants", href: "/restaurants" },
        { label: "Spa & Bien-être", href: "/spa" },
        { label: "Événements", href: "/evenements" }
      ]
    },
    {
      title: "Informations",
      links: [
        { label: "Conditions générales", href: "/terms" },
        { label: "Politique de confidentialité", href: "/privacy" },
        { label: "Plan du site", href: "/sitemap" },
        { label: "FAQ", href: "/faq" }
      ]
    }
  ],
  contact: {
    address: {
      title: "Adresse",
      details: ["Rue Pierre Stibbe Anosy", "101 Antananarivo, Madagascar"]
    },
    phone: {
      title: "Téléphone",
      details: "+261 20 22 260 60"
    },
    email: {
      title: "Email",
      details: "contact@carlton.mg"
    },
    reception: {
      title: "Réception",
      details: "24h/24 - 7j/7"
    }
  },
  bottom: {
    copyright: "© 2025 Carlton Madagascar. Tous droits réservés.",
    rating: "★★★★★ Hôtel 5 étoiles",
    follow: "Suivez-nous :"
  },
  social: [
    { icon: "Facebook", href: "#", label: "Facebook" },
    { icon: "Instagram", href: "#", label: "Instagram" },
    { icon: "Twitter", href: "#", label: "Twitter" },
    { icon: "Linkedin", href: "#", label: "LinkedIn" }
  ],
  logos: {
    iPrefer: "@assets/I Prefer_logo_white_H_LARGE_1758205962584.png",
    preferredLifestyle: "@assets/Preferred Lifestyle LOGO LARGE_black_1758205962584.png"
  }
};