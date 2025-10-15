// src/data/contactSectionData.ts
export const contactSectionData = {
  header: {
    title: "Contactez-nous",
    description: "Notre équipe dédiée est à votre disposition pour vous accompagner dans l'organisation de votre séjour d'exception."
  },
  form: {
    title: "Demande d'information",
    subtitle: "Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais.",
    fields: {
      name: { label: "Nom complet *", placeholder: "Votre nom" },
      email: { label: "Email *", placeholder: "votre@email.com" },
      phone: { label: "Téléphone", placeholder: "+261 XX XX XXX XX" },
      subject: { label: "Sujet", placeholder: "Choisir un sujet" },
      options: [
        { value: "reservation", label: "Réservation" },
        { value: "information", label: "Information générale" },
        { value: "event", label: "Événement privé" },
        { value: "restaurant", label: "Restaurant" },
        { value: "spa", label: "Spa & Bien-être" },
        { value: "other", label: "Autre" }
      ],
      message: { label: "Message *", placeholder: "Décrivez votre demande..." }
    },
    submitButton: "Envoyer le message"
  },
  contactInfo: [
    {
      icon: "MapPin",
      title: "Adresse",
      details: ["Rue Pierre Stibbe Anosy", "101 Antananarivo, Madagascar"]
    },
    {
      icon: "Phone",
      title: "Téléphone",
      details: ["+261 20 22 260 60", "Service 24h/24"]
    },
    {
      icon: "Mail",
      title: "Email",
      details: ["contact@carlton.mg", "reservation@carlton.mg"]
    },
    {
      icon: "Clock",
      title: "Réception",
      details: ["24h/24 - 7j/7", "Conciergerie disponible"]
    }
  ],
  location: {
    title: "Notre localisation",
    description: "Carte interactive Google Maps",
    address: "Rue Pierre Stibbe Anosy, Antananarivo",
    button: "Ouvrir dans Google Maps"
  },
  quickActions: [
    {
      icon: "Phone",
      title: "Appeler maintenant",
      subtitle: "Service 24h/24"
    },
    {
      icon: "MessageCircle",
      title: "Chat en direct",
      subtitle: "Réponse immédiate"
    }
  ]
};