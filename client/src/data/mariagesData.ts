import eventImage from '@assets/generated_images/Fine_dining_restaurant_1275a5b9.png';

export const mariagesPageData = {
  heroTitle: "Mariages de Prestige",
  heroSubtitle: "Votre jour le plus beau",
  heroImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920',
  content: `
    <div class="prose prose-lg">
      <p>Organisez votre mariage dans un cadre d'exception. Nos espaces modulables sont équipés pour des cérémonies mémorables.</p>
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
      id: 1,
      name: "Mariages de Prestige",
      subtitle: "Votre jour le plus beau",
      description: "Célébrez votre union dans un cadre d'exception avec nos services de mariage sur mesure. Du cocktail de réception au dîner de gala, chaque détail est pensé pour créer des souvenirs inoubliables.",
      image: eventImage,
      capacity: "20 - 200 invités",
      duration: "Journée complète ou weekend",
      equipment: [
        "Coordinateur de mariage dédié",
        "Choix de lieux de cérémonie",
        "Menu gastronomique personnalisé",
        "Décoration florale incluse",
        "Suite nuptiale offerte"
      ],
      features: [
        "Photographe professionnel disponible",
        "Service traiteur haut de gamme",
        "Orchestre ou DJ au choix"
      ],
      venues: ["La Terrasse Aile Droite", "Ravinala", "Toit de Tana", "Restaurant Île Rouge"]
    }
  ],
  cta: {
    title: "Planifions Votre Mariage",
    subtitle: "Notre équipe dédiée aux mariages vous accompagne de la conception à la réalisation",
    buttonText: "Demander un devis"
  }
};