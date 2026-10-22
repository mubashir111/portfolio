import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface MediaViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: {
    src: string;
    title: string;
    caption?: string;
    link?: string;
    tags?: string[];
  } | null;
}

export const MediaViewerModal: React.FC<MediaViewerModalProps> = ({ isOpen, onClose, media }) => {
  if (!isOpen || !media) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-[#131515] border border-[var(--ds-color-line)] shadow-2xl overflow-hidden"
        style={{ boxShadow: '0 0 35px rgba(211, 255, 63, 0.15)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--ds-color-line)] bg-[#0b0d0d]">
          <div>
            <span className="font-mono text-xs text-[var(--ds-color-accent)] tracking-widest uppercase">
              PREVIEW / INSPECT
            </span>
            <h3 className="text-lg font-bold text-white tracking-wide">{media.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Media Preview */}
        <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
          <img 
            src={media.src} 
            alt={media.title} 
            className="max-h-[65vh] w-auto max-w-full object-contain"
          />
        </div>

        {/* Caption & Actions */}
        <div className="p-6 bg-[#101212] border-t border-[var(--ds-color-line)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            {media.caption && (
              <p className="text-sm text-zinc-300 mb-2 leading-relaxed">{media.caption}</p>
            )}
            {media.tags && media.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {media.tags.map(t => (
                  <span key={t} className="font-mono text-[10px] uppercase px-2 py-0.5 border border-zinc-700 text-zinc-400 bg-black/40">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
          {media.link && (
            <a 
              href={media.link} 
              target="_blank" 
              rel="noreferrer"
              className="terminal-btn self-start md:self-center shrink-0"
            >
              VISIT LIVE SITE <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
