// src/data/contactData.ts
export const contactData = {
  hero: {
    title: {
      fr: "Nous Contacter",
      en: "Contact Us"
    },
    description: {
      fr: "Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner",
      en: "Our team is here to answer all your questions and assist you"
    }
  },
  contactInfo: [
    {
      icon: "Phone",
      title: {
        fr: "Téléphone",
        en: "Phone"
      },
      details: [
        {
          fr: "+261 20 22 260 60",
          en: "+261 20 22 260 60"
        },
        {
          fr: "Disponible 24h/24",
          en: "Available 24/7"
        }
      ],
      action: {
        fr: "Appeler maintenant",
        en: "Call now"
      }
    },
    {
      icon: "Mail",
      title: {
        fr: "Email",
        en: "Email"
      },
      details: [
        {
          fr: "contact@carlton.mg",
          en: "contact@carlton.mg"
        },
        {
          fr: "Réponse sous 2h",
          en: "Response within 2h"
        }
      ],
      action: {
        fr: "Envoyer un email",
        en: "Send an email"
      }
    },
    {
      icon: "MapPin",
      title: {
        fr: "Adresse",
        en: "Address"
      },
      details: [
        {
          fr: "Rue Pierre Stibbe Anosy Po BOX 959",
          en: "Rue Pierre Stibbe Anosy Po BOX 959"
        },
        {
          fr: "Antananarivo 101, Madagascar",
          en: "Antananarivo 101, Madagascar"
        }
      ],
      action: {
        fr: "Voir sur la carte",
        en: "View on map"
      }
    },
    {
      icon: "Clock",
      title: {
        fr: "Horaires",
        en: "Hours"
      },
      details: [
        {
          fr: "Réception 24h/24",
          en: "Reception 24/7"
        },
        {
          fr: "Conciergerie toujours disponible",
          en: "Concierge always available"
        }
      ],
      action: {
        fr: "Plus d'infos",
        en: "More info"
      }
    }
  ],
  form: {
    title: {
      fr: "Envoyez-nous un Message",
      en: "Send us a Message"
    },
    subtitle: {
      fr: "Remplissez ce formulaire, nous vous répondrons rapidement",
      en: "Fill out this form, we will respond quickly"
    },
    departments: [
      { value: "reservation", label: { fr: "Réservations", en: "Reservations" } },
      { value: "restaurant", label: { fr: "Restaurants", en: "Restaurants" } },
      { value: "evenement", label: { fr: "Événements", en: "Events" } },
      { value: "concierge", label: { fr: "Conciergerie", en: "Concierge" } },
      { value: "spa", label: { fr: "Loisirs & Bien-être", en: "Leisure & Wellness" } },
      { value: "direction", label: { fr: "Direction", en: "Management" } },
      { value: "autre", label: { fr: "Autre demande", en: "Other request" } }
    ],
    fields: {
      firstName: {
        label: {
          fr: "Prénom *",
          en: "First Name *"
        },
        placeholder: {
          fr: "Votre prénom",
          en: "Your first name"
        },
        validation: {
          min: {
            fr: "Le prénom doit contenir au moins 2 caractères",
            en: "First name must contain at least 2 characters"
          }
        }
      },
      lastName: {
        label: {
          fr: "Nom *",
          en: "Last Name *"
        },
        placeholder: {
          fr: "Votre nom",
          en: "Your last name"
        },
        validation: {
          min: {
            fr: "Le nom doit contenir au moins 2 caractères",
            en: "Last name must contain at least 2 characters"
          }
        }
      },
      email: {
        label: {
          fr: "Email *",
          en: "Email *"
        },
        placeholder: {
          fr: "votre@email.com",
          en: "your@email.com"
        },
        validation: {
          email: {
            fr: "Veuillez saisir une adresse email valide",
            en: "Please enter a valid email address"
          }
        }
      },
      phone: {
        label: {
          fr: "Téléphone *",
          en: "Phone *"
        },
        placeholder: {
          fr: "+261 XX XX XXX XX",
          en: "+261 XX XX XXX XX"
        },
        validation: {
          min: {
            fr: "Le numéro de téléphone doit contenir au moins 8 chiffres",
            en: "Phone number must contain at least 8 digits"
          }
        }
      },
      subject: {
        label: {
          fr: "Sujet de votre demande *",
          en: "Subject of your request *"
        },
        placeholder: {
          fr: "Sélectionnez un sujet",
          en: "Select a subject"
        },
        validation: {
          min: {
            fr: "Veuillez sélectionner un sujet",
            en: "Please select a subject"
          }
        }
      },
      arrivalDate: {
        label: {
          fr: "Date d'arrivée",
          en: "Arrival Date"
        }
      },
      departureDate: {
        label: {
          fr: "Date de départ",
          en: "Departure Date"
        }
      },
      guests: {
        label: {
          fr: "Nombre d'invités",
          en: "Number of guests"
        },
        placeholder: {
          fr: "2",
          en: "2"
        }
      },
      message: {
        label: {
          fr: "Votre message *",
          en: "Your message *"
        },
        placeholder: {
          fr: "Décrivez votre demande en détail...",
          en: "Describe your request in detail..."
        },
        validation: {
          min: {
            fr: "Le message doit contenir au moins 10 caractères",
            en: "Message must contain at least 10 characters"
          }
        }
      }
    },
    submitButton: {
      fr: "Envoyer le message",
      en: "Send message"
    }
  },
  services: {
    title: {
      fr: "Nos Services",
      en: "Our Services"
    },
    subtitle: {
      fr: "À votre disposition pour un séjour parfait",
      en: "At your disposal for a perfect stay"
    },
    list: [
      {
        title: {
          fr: "Réservations",
          en: "Reservations"
        },
        description: {
          fr: "Chambres, restaurants, événements",
          en: "Rooms, restaurants, events"
        },
        icon: "Calendar"
      },
      {
        title: {
          fr: "Conciergerie",
          en: "Concierge"
        },
        description: {
          fr: "Excursions, transports, conseils",
          en: "Excursions, transportation, advice"
        },
        icon: "Users"
      },
      {
        title: {
          fr: "Transferts Aéroport",
          en: "Airport Transfers"
        },
        description: {
          fr: "Service de navette premium",
          en: "Premium shuttle service"
        },
        icon: "Plane"
      },
      {
        title: {
          fr: "Parking",
          en: "Parking"
        },
        description: {
          fr: "Service de parking sécurisé",
          en: "Secure parking service"
        },
        icon: "Car"
      }
    ]
  },
  practicalInfo: {
    title: {
      fr: "Informations Pratiques",
      en: "Practical Information"
    },
    arrival: {
      title: {
        fr: "Arrivée & Départ",
        en: "Arrival & Departure"
      },
      details: [
        {
          fr: "Check-in : 15h00",
          en: "Check-in: 3:00 PM"
        },
        {
          fr: "Check-out : 12h00",
          en: "Check-out: 12:00 PM"
        },
        {
          fr: "Early check-in/late check-out sur demande",
          en: "Early check-in/late check-out on request"
        }
      ]
    },
    airport: {
      title: {
        fr: "Aéroport",
        en: "Airport"
      },
      details: [
        {
          fr: "Distance : 30 minutes en voiture",
          en: "Distance: 30 minutes by car"
        },
        {
          fr: "Navette privée disponible",
          en: "Private shuttle available"
        },
        {
          fr: "Service de transfert VIP",
          en: "VIP transfer service"
        }
      ]
    },
    languages: {
      title: {
        fr: "Langues parlées",
        en: "Languages Spoken"
      },
      list: [
        { fr: "Français", en: "French" },
        { fr: "Anglais", en: "English" },
        { fr: "Malgache", en: "Malagasy" },
        { fr: "Italien", en: "Italian" }
      ]
    },
    location: {
      title: {
        fr: "Notre Emplacement",
        en: "Our Location"
      },
      subtitle: {
        fr: "Carlton Madagascar, au cœur d'Antananarivo",
        en: "Carlton Madagascar, in the heart of Antananarivo"
      },
      addressTitle: {
        fr: "Adresse complète",
        en: "Full Address"
      },
      address: {
        fr: "Rue Pierre Stibbe Anosy Po BOX 959<br/>Antananarivo 101, Madagascar",
        en: "Rue Pierre Stibbe Anosy Po BOX 959<br/>Antananarivo 101, Madagascar"
      },
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3823.8755892545847!2d47.52089897509746!3d-18.91384738248647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07e7637d2b2d3%3A0x4b9f0b1d3c6b4b5a!2sRue%20Pierre%20Stibbe%2C%20Antananarivo%2C%20Madagascar!5e0!3m2!1sen!2s!4v1632468352847!5m2!1sen!2s",
      mapTitle: {
        fr: "Emplacement de l'hôtel Carlton Madagascar",
        en: "Carlton Madagascar Hotel Location"
      },
      directionsButton: {
        fr: "Obtenir l'itinéraire",
        en: "Get directions"
      }
    }
  }
};