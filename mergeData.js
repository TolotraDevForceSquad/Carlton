// mergeData.js
import fs from "fs";
import path from "path";

const files = [
  "client/src/data/bienEtreLoisirsData.ts",
  "client/src/data/celebrationsData.ts",
  "client/src/data/chambresData.ts",
  "client/src/data/contactData.ts",
  "client/src/data/contactSectionData.ts",
  "client/src/data/corporateData.ts",
  "client/src/data/decouvrirAntananarivoData.ts",
  "client/src/data/evenementsData.ts",
  "client/src/data/footerData.ts",
  "client/src/data/galasData.ts",
  "client/src/data/galerieData.ts",
  "client/src/data/heroSectionData.ts",
  "client/src/data/homeData.ts",
  "client/src/data/loisirsData.ts",
  "client/src/data/mainNavData.ts",
  "client/src/data/mariagesData.ts",
  "client/src/data/offresData.ts",
  "client/src/data/restaurantsData.ts",
  "client/src/data/restaurantShowcaseData.ts",
  "client/src/data/roomsShowcaseData.ts",
  "client/src/data/servicesBoutiquesData.ts",
  "client/src/data/spaLeisureData.ts",
];

let mergedContent = "# 📦 Contenu combiné des fichiers data\n\n";

for (const file of files) {
  const filePath = path.resolve(file);
  const content = fs.readFileSync(filePath, "utf-8");
  mergedContent += `\n\n---\n## ${path.basename(file)}\n\n\`\`\`ts\n${content}\n\`\`\`\n`;
}

fs.writeFileSync("allData.md", mergedContent);
console.log("✅ Fichier 'allData.md' créé avec succès !");
