import { ReactNode } from 'react';

// Fonction utilitaire pour styliser les ampersands, gérer les sauts de ligne et les balises <v> et <e>
export const formatAmpersand = (text: string | undefined | null): ReactNode => {
  if (!text) return null;

  // D'abord, diviser sur "(-)" pour insérer des sauts de ligne
  const lineParts = text.split(/\(\-\)/g);

  const formattedLines: ReactNode[] = [];
  lineParts.forEach((linePart, lineIndex) => {
    if (lineIndex > 0) {
      formattedLines.push(<br key={`br-${lineIndex}`} />);
    }
    if (linePart.trim()) {
      const formattedLine = formatInline(linePart, false);
      formattedLines.push(formattedLine);
    }
  });

  return <>{formattedLines}</>;
};

// Fonction helper pour formater le texte inline (gérer "&", les balises <v>...</v> et <e>...</e>)
// skipAmpersand: si true, désactive le styling des "&" dans ce contenu
const formatInline = (text: string, skipAmpersand: boolean = false): ReactNode => {
  const elements: ReactNode[] = [];
  let lastIndex = 0;
  let i = 0;

  while (i < text.length) {
    let found = false;

    // Vérifier pour "&" (seulement si !skipAmpersand)
    if (!skipAmpersand && text[i] === '&') {
      if (i > lastIndex) {
        elements.push(text.substring(lastIndex, i));
      }
      elements.push(<span key={`amp-${elements.length}`} className="ampersand">&</span>);
      lastIndex = i + 1;
      i++;
      found = true;
    }
    // Vérifier pour l'ouverture de balise <v>
    else if (i + 2 < text.length && text.substring(i, i + 3) === '<v>') {
      // Chercher la fermeture </v>
      const closeIndex = text.indexOf('</v>', i + 3);
      if (closeIndex !== -1) {
        if (i > lastIndex) {
          elements.push(text.substring(lastIndex, i));
        }
        const content = text.substring(i + 3, closeIndex);
        const formattedContent = formatInline(content, false); // Parse normalement pour <v>
        elements.push(
          <span key={`v-${elements.length}`} className="ampersand">
            {formattedContent}
          </span>
        );
        lastIndex = closeIndex + 4; // Après </v>
        i = lastIndex;
        found = true;
      } else {
        // Si pas de fermeture, traiter comme texte normal
        i++;
      }
    }
    // Vérifier pour l'ouverture de balise <e>
    else if (i + 2 < text.length && text.substring(i, i + 3) === '<e>') {
      // Chercher la fermeture </e>
      const closeIndex = text.indexOf('</e>', i + 3);
      if (closeIndex !== -1) {
        if (i > lastIndex) {
          elements.push(text.substring(lastIndex, i));
        }
        const content = text.substring(i + 3, closeIndex);
        const formattedContent = formatInline(content, true); // Parse en sautant le styling des "&"
        elements.push(formattedContent); // Pas de wrap, juste le contenu
        lastIndex = closeIndex + 4; // Après </e>
        i = lastIndex;
        found = true;
      } else {
        // Si pas de fermeture, traiter comme texte normal
        i++;
      }
    }

    if (!found) {
      i++;
    }
  }

  // Ajouter le texte restant
  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return <>{elements}</>;
};