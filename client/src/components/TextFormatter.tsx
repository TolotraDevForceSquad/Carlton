import React from 'react';

interface TextFormatterProps {
  text: any;
  className?: string;
}

// Fonction qui stylise les "&" et les "ou"
const formatText = (text: string) => {
  // 1️⃣ Remplace les "&" par un span stylisé
  let formatted = text.replace(
    /&/g,
    '<span class="text-yellow-500 font-semibold">&amp;</span>'
  );

  // 2️⃣ Stylise les mots "ou" isolés (espacés ou entourés de ponctuation)
  formatted = formatted.replace(
    /\bou\b/gi,
    '<span class="text-yellow-500 font-semibold">ou</span>'
  );

  return formatted;
};

const TextFormatter: React.FC<TextFormatterProps> = ({ text, className }) => {
  let displayText: string;

  if (typeof text === 'string') {
    displayText = text;
  } else if (typeof text === 'number') {
    displayText = text.toString();
  } else {
    displayText = String(text || '');
  }

  const parts = displayText.split('(-)').filter(part => part.trim().length > 0);

  if (parts.length === 1) {
    return (
      <span
        className={className}
        dangerouslySetInnerHTML={{ __html: formatText(displayText) }}
      />
    );
  }

  return (
    <div className={`space-y-2 ${className || ''}`}>
      {parts.map((part, i) => (
        <p
          key={i}
          className="leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatText(part.trim()) }}
        />
      ))}
    </div>
  );
};

export default TextFormatter;