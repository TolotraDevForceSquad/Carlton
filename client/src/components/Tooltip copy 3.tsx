// src/components/Tooltip.tsx
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

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
  const [position, setPosition] = useState<Position | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [inputFr, setInputFr] = useState(frLabel);
  const [inputEn, setInputEn] = useState(enLabel);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const LONG_PRESS_DELAY = 500; // ms

  const cancelPendingShow = () => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left button for long press
    cancelPendingShow();
    const pos: Position = { x: e.clientX, y: e.clientY };
    showTimeoutRef.current = setTimeout(() => {
      setPosition(pos);
      setShowTooltip(true);
    }, LONG_PRESS_DELAY);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    cancelPendingShow();
  };

  const handleMouseLeave = () => {
    cancelPendingShow();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    cancelPendingShow(); // Cancel any pending long press
    const pos: Position = { x: e.clientX, y: e.clientY };
    setPosition(pos);
    setShowTooltip(true);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      showTooltip &&
      tooltipRef.current &&
      triggerRef.current &&
      !tooltipRef.current.contains(e.target as Node) &&
      !triggerRef.current.contains(e.target as Node)
    ) {
      setShowTooltip(false);
      setPosition(null);
    }
  };

  const handleTooltipClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
    setPosition(null);
    setShowModal(true);
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

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      cancelPendingShow();
    };
  }, []);

  // Document click listener for hiding tooltip
  useEffect(() => {
    if (showTooltip) {
      document.addEventListener('click', handleDocumentClick);
    }
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [showTooltip]);

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
              <textarea
                key="input-fr" // Clé stable pour éviter tout remontage
                value={inputFr}
                onChange={(e) => setInputFr(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-vertical min-h-[100px]"
                placeholder="Text FR"
                autoFocus // Focus auto sur le premier champ
              />
            </div>
            <div>
              <label className="block text-sm text-white/80 mb-1">Text EN</label>
              <textarea
                key="input-en" // Clé stable pour éviter tout remontage
                value={inputEn}
                onChange={(e) => setInputEn(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-vertical min-h-[100px]"
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
      <div
        ref={triggerRef}
        className="relative"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onContextMenu={handleContextMenu}
      >
        {children}

        {showTooltip && position && (
          <div
            ref={tooltipRef}
            style={{
              position: 'fixed' as const,
              left: position.x,
              top: position.y,
              zIndex: 50,
            }}
            className="px-2 py-1 bg-black/90 text-white text-xs rounded whitespace-nowrap shadow-lg cursor-pointer hover:bg-black transition-colors"
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

interface ImageTooltipProps {
  children: React.ReactNode;
  imageUrl: string;
  onSave?: (newImageUrl: string) => void;
}

const ImageTooltip = ({ children, imageUrl, onSave }: ImageTooltipProps) => {
  const token = localStorage.getItem('userToken');
  if (!token) {
    return <>{children}</>;
  }

  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('url');
  const [inputUrl, setInputUrl] = useState(imageUrl);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const LONG_PRESS_DELAY = 500; // ms

  const cancelPendingShow = () => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left button for long press
    cancelPendingShow();
    const pos: Position = { x: e.clientX, y: e.clientY };
    showTimeoutRef.current = setTimeout(() => {
      setPosition(pos);
      setShowTooltip(true);
    }, LONG_PRESS_DELAY);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    cancelPendingShow();
  };

  const handleMouseLeave = () => {
    cancelPendingShow();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    cancelPendingShow(); // Cancel any pending long press
    const pos: Position = { x: e.clientX, y: e.clientY };
    setPosition(pos);
    setShowTooltip(true);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      showTooltip &&
      tooltipRef.current &&
      triggerRef.current &&
      !tooltipRef.current.contains(e.target as Node) &&
      !triggerRef.current.contains(e.target as Node)
    ) {
      setShowTooltip(false);
      setPosition(null);
    }
  };

  const handleTooltipClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(undefined);
    setInputUrl(imageUrl);
    setMode('url');
    setShowTooltip(false);
    setPosition(null);
    setShowModal(true);
  };

  const handleSave = async () => {
    let newUrl = '';
    try {
      if (mode === 'upload' && selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        newUrl = data.fileUrl;
      } else if (mode === 'url' && inputUrl) {
        const res = await fetch(inputUrl);
        if (!res.ok) throw new Error('Failed to fetch image');
        const contentType = res.headers.get('content-type') || '';
        let ext = '.jpg';
        if (contentType.includes('png')) ext = '.png';
        else if (contentType.includes('jpeg') || contentType.includes('jpg')) ext = '.jpg';
        const urlParts = inputUrl.split('/').pop()?.split('?')[0] || 'image';
        const filename = `${urlParts}${ext}`;
        const blob = await res.blob();
        const formData = new FormData();
        formData.append('file', blob, filename);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
        if (!uploadRes.ok) throw new Error('Upload failed');
        const data = await uploadRes.json();
        newUrl = data.fileUrl;
      } else {
        return; // Nothing to save
      }
      if (onSave) onSave(newUrl);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving image:', error);
      // Could add toast/error handling here
    }
  };

  const handleCancel = () => {
    setSelectedFile(undefined);
    setInputUrl(imageUrl);
    setMode('url');
    setShowModal(false);
  };

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      cancelPendingShow();
    };
  }, []);

  // Document click listener for hiding tooltip
  useEffect(() => {
    if (showTooltip) {
      document.addEventListener('click', handleDocumentClick);
    }
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [showTooltip]);

  const isSaveDisabled = mode === 'upload' ? !selectedFile : !inputUrl;

  // Contenu du modal pour image
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
            <h3 className="text-lg font-semibold text-white">Modifier l'image</h3>
            <button
              onClick={handleCancel}
              className="p-1 text-white/70 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={mode === 'upload'}
                  onChange={() => setMode('upload')}
                  className="text-yellow-400"
                />
                <span className="text-sm text-white/80">Upload fichier</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={mode === 'url'}
                  onChange={() => setMode('url')}
                  className="text-yellow-400"
                />
                <span className="text-sm text-white/80">URL</span>
              </label>
            </div>

            {mode === 'upload' && (
              <div>
                <label className="block text-sm text-white/80 mb-1">Sélectionner une image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || undefined)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white file:bg-white/10 file:border-white/10 file:text-white file:rounded file:px-3 file:py-1 file:mr-2 file:cursor-pointer"
                />
                {selectedFile && <p className="text-xs text-green-400 mt-1">{selectedFile.name}</p>}
              </div>
            )}

            {mode === 'url' && (
              <div>
                <label className="block text-sm text-white/80 mb-1">URL de l'image</label>
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="https://example.com/image.jpg"
                  autoFocus
                />
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-white/10">
              <button
                onClick={handleSave}
                disabled={isSaveDisabled}
                className="flex-1 px-4 py-2 bg-[#f2c451] text-black font-semibold rounded-lg hover:brightness-95 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
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

  const clonedChild = React.Children.only(children) as React.ReactElement<any>;
  const childProps = {
    ...clonedChild.props,
    ref: triggerRef,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
    onContextMenu: handleContextMenu,
    className: clonedChild.props.className
      ? `${clonedChild.props.className} relative`
      : 'relative',
  };

  return (
    <>
      {React.cloneElement(clonedChild, childProps)}

      {showTooltip && position && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed' as const,
            left: position.x,
            top: position.y,
            zIndex: 100,
          }}
          className="px-2 py-1 bg-black/90 text-white text-xs rounded whitespace-nowrap shadow-lg cursor-pointer hover:bg-black transition-colors"
          onClick={handleTooltipClick}
        >
          Modifier image
        </div>
      )}

      {/* Portail directement dans le return (stable) */}
      {modalContent}
    </>
  );
};

export { Tooltip, ImageTooltip };
export default Tooltip;