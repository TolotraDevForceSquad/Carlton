// Fonction utilitaire pour styliser les ampersands
export const formatAmpersand = (text: string | undefined | null) => {
  if (!text || !text.includes('&')) return text;
  
  const parts = text.split('&');
  if (parts.length === 1) return text;
  
  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && <span className="ampersand">&</span>}
        </span>
      ))}
    </>
  );
};