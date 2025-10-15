import eventImage from '@assets/generated_images/Fine_dining_restaurant_1275a5b9.png';

export const corporatePageData = {
  heroTitle: "Événements Corporate",
  heroSubtitle: "Espaces professionnels d'exception",
  heroImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920',
  content: `
    <div class="prose prose-lg">
      <p>Organisez vos événements corporate dans un cadre d'exception. Nos espaces modulables sont équipés des dernières technologies pour des réunions productives et mémorables.</p>
      <h2>Pourquoi choisir nos services ?</h2>
      <ul>
        <li>Service impeccable et personnalisé</li>
        <li>Équipements high-tech inclus</li>
        <li>Emplacements variés pour tous les formats</li>
      </ul>
    </div>
  `,
  sections: [
    {
      id: 2,
      name: "Événements Corporate",
      subtitle: "Excellence professionnelle",
      description: "Organisez vos séminaires, conférences et événements d'entreprise dans nos espaces modulables équipés des dernières technologies. Un service impeccable pour des réunions réussies.",
      image: eventImage,
      capacity: "10 - 300 participants",
      duration: "Demi-journée à 3 jours",
      equipment: [
        "Salles modulables équipées",
        "Matériel audiovisuel inclus",
        "Connexion Wi-Fi haut débit",
        "Service de restauration adapté"
      ],
      features: [
        "Équipe technique dédiée",
        "Parking réservé",
        "Service de conciergerie",
        "Chambres à tarif préférentiel"
      ],
      venues: ["Executive Boardroom", "Ravinala", "Toit de Tana", "La Terrasse Aile Droite"]
    }
  ],
  cta: {
    title: "Organisons Votre Événement",
    subtitle: "Contactez-nous pour discuter de vos besoins et créer un événement sur mesure",
    buttonText: "Demander un Devis"
  }
};