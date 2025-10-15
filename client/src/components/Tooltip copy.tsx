// src/components/Tooltip.tsx
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface TooltipProps {
  children: React.ReactNode;
  frLabel: string;
  enLabel?: string;
  onSave?: (newFr: string, newEn: string) => void;
}

const Tooltip = ({ children, frLabel, enLabel = '', onSave }: TooltipProps) => {
  const token = localStorage.getItem('userToken');
  if (!token) {
    return <>{children}</>;
  }

  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState<'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'>('top-right');
  const [showModal, setShowModal] = useState(false);
  const [inputFr, setInputFr] = useState(frLabel);
  const [inputEn, setInputEn] = useState(enLabel);
  const triggerRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const HIDE_DELAY = 150; // ms

  // calc position tooltip small (reste local au trigger)
  const calculatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceTop = rect.top;
      const spaceBottom = window.innerHeight - rect.bottom;
      const spaceRight = window.innerWidth - rect.right;

      let newPos: typeof position = 'top-right';

      if (spaceTop < 60) {
        if (spaceBottom >= 60) {
          newPos = spaceRight >= 120 ? 'bottom-right' : 'bottom-left';
        } else {
          newPos = spaceRight >= 120 ? 'top-right' : 'top-left';
        }
      } else {
        newPos = spaceRight >= 120 ? 'top-right' : 'top-left';
      }

      if (newPos.startsWith('top') && spaceBottom >= 60 && spaceRight < 120) {
        newPos = 'bottom-left';
      }

      setPosition(newPos);
    }
  };

  const handleShow = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    calculatePosition();
    setShowTooltip(true);
  };

  const handleHide = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, HIDE_DELAY);
  };

  const handleTooltipMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleTooltipMouseLeave = () => {
    handleHide();
  };

  const handleSave = () => {
    if (onSave) onSave(inputFr, inputEn);
    setShowModal(false);
  };

  const handleCancel = () => {
    setInputFr(frLabel);
    setInputEn(enLabel);
    setShowModal(false);
  };

  const handleTooltipClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
    setShowModal(true);
  };

  // cleanup
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return '-top-8 right-0';
      case 'bottom-right':
        return 'bottom-[-8px] right-0 translate-y-full';
      case 'top-left':
        return '-top-8 left-0';
      case 'bottom-left':
        return 'bottom-[-8px] left-0 translate-y-full';
      default:
        return '-top-8 right-0';
    }
  };

  // Contenu du modal directement intégré (sans composant interne)
  const modalContent = showModal ? createPortal(
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998]"
        onClick={handleCancel}
        aria-hidden="true"
      />

      {/* Modal box centered */}
      <div
        role="dialog"
        aria-modal="true"
        className="fixed top-1/2 left-1/2 z-[9999] w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4"
      >
        <div className="relative bg-[#151821] p-6 rounded-xl border border-white/10 max-h-[80vh] overflow-y-auto shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Modifier l'élément</h3>
            <button
              onClick={handleCancel}
              className="p-1 text-white/70 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/80 mb-1">Text FR</label>
              <input
                key="input-fr" // Clé stable pour éviter tout remontage
                type="text"
                value={inputFr}
                onChange={(e) => setInputFr(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Text FR"
                autoFocus // Focus auto sur le premier champ
              />
            </div>
            <div>
              <label className="block text-sm text-white/80 mb-1">Text EN</label>
              <input
                key="input-en" // Clé stable pour éviter tout remontage
                type="text"
                value={inputEn}
                onChange={(e) => setInputEn(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Text EN"
              />
            </div>
            <div className="flex gap-3 pt-4 border-t border-white/10">
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-[#f2c451] text-black font-semibold rounded-lg hover:brightness-95 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Enregistrer
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 bg-white/10 text-white border border-white/10 rounded-lg hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  ) : null;

  return (
    <>
      <div className="relative inline-block group">
        <div
          ref={triggerRef}
          onMouseEnter={handleShow}
          onMouseLeave={handleHide}
        >
          {children}
        </div>

        {showTooltip && (
          <div
            className={`absolute ${getPositionClasses()} px-2 py-1 bg-black/90 text-white text-xs rounded whitespace-nowrap z-50 shadow-lg cursor-pointer hover:bg-black transition-colors`}
            onMouseEnter={handleTooltipMouseEnter}
            onMouseLeave={handleTooltipMouseLeave}
            onClick={handleTooltipClick}
          >
            Modifier
          </div>
        )}
      </div>

      {/* Portail directement dans le return (stable) */}
      {modalContent}
    </>
  );
};

export default Tooltip;