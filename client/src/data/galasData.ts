import eventImage from '@assets/generated_images/Fine_dining_restaurant_1275a5b9.png';

export const galasPageData = {
  heroTitle: "Galas & Soirées de Prestige",
  heroSubtitle: "Élégance et raffinement",
  heroImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920',
  content: `
    <div class="prose prose-lg">
      <p>Organisez vos galas dans un cadre d'exception. Nos espaces modulables sont équipés des dernières technologies pour des soirées mémorables.</p>
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
      id: 4,
      name: "Lancements & Galas",
      subtitle: "Événements d'exception",
      description: "Pour vos lancements de produits, galas de charité ou réceptions officielles, nous offrons le cadre prestigieux et les services haut de gamme nécessaires à votre succès.",
      image: eventImage,
      capacity: "50 - 400 invités",
      duration: "Soirée ou journée",
      equipment: [
        "Scénographie personnalisée",
        "Éclairage professionnel",
        "Sonorisation complète",
        "Service de sécurité"
      ],
      features: [
        "Vestiaire et accueil VIP",
        "Buffets ou dîners assis",
        "Bar à cocktails premium",
        "Relations presse si demandé"
      ],
      venues: ["Toit de Tana", "La Terrasse Aile Droite", "Ravinala", "Executive Boardroom"]
    }
  ],
  cta: {
    title: "Créons Votre Événement de Prestige",
    subtitle: "Discutons de votre projet pour un événement inoubliable",
    buttonText: "Organiser Mon Gala"
  }
};