// src/data/contactData.ts
export const contactData = {
  heroTitle: "Nous Contacter",
  heroDescription: "Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner",
  contactInfo: [
    {
      icon: "Phone",
      title: "Téléphone",
      details: ["+261 20 22 260 60", "Disponible 24h/24"],
      action: "Appeler maintenant"
    },
    {
      icon: "Mail",
      title: "Email",
      details: ["contact@carlton.mg", "Réponse sous 2h"],
      action: "Envoyer un email"
    },
    {
      icon: "MapPin",
      title: "Adresse",
      details: ["Rue Pierre Stibbe Anosy Po BOX 959", "Antananarivo 101, Madagascar"],
      action: "Voir sur la carte"
    },
    {
      icon: "Clock",
      title: "Horaires",
      details: ["Réception 24h/24", "Conciergerie toujours disponible"],
      action: "Plus d'infos"
    }
  ],
  form: {
    title: "Envoyez-nous un Message",
    subtitle: "Remplissez ce formulaire, nous vous répondrons rapidement",
    departments: [
      { value: "reservation", label: "Réservations" },
      { value: "restaurant", label: "Restaurants" },
      { value: "evenement", label: "Événements" },
      { value: "concierge", label: "Conciergerie" },
      { value: "spa", label: "Loisirs & Bien-être" },
      { value: "direction", label: "Direction" },
      { value: "autre", label: "Autre demande" }
    ],
    submitButton: "Envoyer le message"
  },
  services: [
    {
      title: "Réservations",
      description: "Chambres, restaurants, événements",
      icon: "Calendar"
    },
    {
      title: "Conciergerie",
      description: "Excursions, transports, conseils",
      icon: "Users"
    },
    {
      title: "Transferts Aéroport",
      description: "Service de navette premium",
      icon: "Plane"
    },
    {
      title: "Parking",
      description: "Service de parking sécurisé",
      icon: "Car"
    }
  ],
  practicalInfo: {
    arrivalTitle: "Arrivée & Départ",
    arrivalDetails: ["Check-in : 15h00", "Check-out : 12h00", "Early check-in/late check-out sur demande"],
    airportTitle: "Aéroport",
    airportDetails: ["Distance : 30 minutes en voiture", "Navette privée disponible", "Service de transfert VIP"],
    languagesTitle: "Langues parlées",
    languages: ["Français", "Anglais", "Malgache", "Italien"],
    locationTitle: "Notre Emplacement",
    locationSubtitle: "Carlton Madagascar, au cœur d'Antananarivo",
    address: "Rue Pierre Stibbe Anosy Po BOX 959<br/>Antananarivo 101, Madagascar",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3823.8755892545847!2d47.52089897509746!3d-18.91384738248647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07e7637d2b2d3%3A0x4b9f0b1d3c6b4b5a!2sRue%20Pierre%20Stibbe%2C%20Antananarivo%2C%20Madagascar!5e0!3m2!1sen!2s!4v1632468352847!5m2!1sen!2s",
    directionsButton: "Obtenir l'itinéraire"
  }
};