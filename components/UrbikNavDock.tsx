import React, { useState, useEffect } from 'react';
import { ambientSynth } from './UrbikAudioEngine';
import { VisualPreset } from './UrbikCanvas';
import { Volume2, VolumeX, Eye, Menu as MenuIcon, X, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

interface UrbikNavDockProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  visualPreset: VisualPreset;
  onVisualPresetChange: (preset: VisualPreset) => void;
  isContentClosed: boolean;
  onToggleContent: () => void;
}

export const UrbikNavDock: React.FC<UrbikNavDockProps> = ({
  activeTab,
  onTabChange,
  visualPreset,
  onVisualPresetChange,
  isContentClosed,
  onToggleContent,
}) => {
  const { auth } = useData();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisualMenuOpen, setIsVisualMenuOpen] = useState(false);
  const [audioBars, setAudioBars] = useState<number[]>([4, 8, 5, 11, 7]);

  // Audio equalizer animation when active
  useEffect(() => {
    let animId: any;
    if (isPlayingAudio) {
      const updateBars = () => {
        const freqData = ambientSynth.getFrequencyData();
        const bars = [
          Math.max(4, Math.floor((freqData[1] || 10) / 14)),
          Math.max(4, Math.floor((freqData[3] || 25) / 12)),
          Math.max(4, Math.floor((freqData[5] || 40) / 10)),
          Math.max(4, Math.floor((freqData[7] || 30) / 13)),
          Math.max(4, Math.floor((freqData[9] || 15) / 15)),
        ];
        setAudioBars(bars);
        animId = requestAnimationFrame(updateBars);
      };
      animId = requestAnimationFrame(updateBars);
    } else {
      setAudioBars([4, 6, 4, 7, 4]);
    }
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPlayingAudio]);

  const toggleAudio = () => {
    const status = ambientSynth.toggle();
    setIsPlayingAudio(status);
  };

  const handleTabClick = (tabId: string) => {
    if (isContentClosed) {
      onToggleContent();
    }
    onTabChange(tabId);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const presets: { id: VisualPreset; name: string }[] = [
    { id: 'particles', name: 'Constellation Mesh' },
    { id: 'waves', name: 'Cyber Matrix Wave' },
    { id: 'warp', name: 'Hyperspace Warp' },
  ];

  const cyclePreset = () => {
    const currentIndex = presets.findIndex(p => p.id === visualPreset);
    const nextIndex = (currentIndex + 1) % presets.length;
    onVisualPresetChange(presets[nextIndex].id);
  };

  return (
    <div className="bottom-dock">
      {/* Popover Menu Dialog */}
      {isMenuOpen && (
        <div className="ds-popup">
          <div className="ds-popup__head">
            <span className="font-mono text-xs uppercase text-[var(--ds-color-accent)] tracking-widest flex items-center gap-2">
              <Sparkles size={14} /> Quick Navigation
            </span>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="text-zinc-400 hover:text-white p-1"
            >
              <X size={16} />
            </button>
          </div>
          <div className="ds-popup__body">
            <ul className="ds-popup__list">
              <li>
                <button
                  onClick={() => handleTabClick('general')}
                  className="ds-popup__link w-full flex items-center justify-between"
                >
                  <span>00 / General Overview</span>
                  <span className="font-mono text-[10px] text-zinc-500">ABOUT & PROFILE</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('developer')}
                  className="ds-popup__link w-full flex items-center justify-between"
                >
                  <span>01 / Developer & Experience</span>
                  <span className="font-mono text-[10px] text-zinc-500">TECH STACK</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('projects')}
                  className="ds-popup__link w-full flex items-center justify-between"
                >
                  <span>02 / Featured Projects</span>
                  <span className="font-mono text-[10px] text-zinc-500">LIVE WORK</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('contact')}
                  className="ds-popup__link w-full flex items-center justify-between"
                >
                  <span>03 / Contact & Inquiries</span>
                  <span className="font-mono text-[10px] text-zinc-500">TERMINAL</span>
                </button>
              </li>
              <li className="pt-2 border-t border-[var(--ds-color-line)] mt-2">
                <Link
                  to={auth.isAuthenticated ? '/admin' : '/login'}
                  className="ds-popup__link flex items-center justify-between text-zinc-400 hover:text-[var(--ds-color-accent)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={14} />
                    {auth.isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}
                  </span>
                  <span className="font-mono text-[10px]">AUTH</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Visual Preset Selector Popover */}
      {isVisualMenuOpen && (
        <div className="ds-popup" style={{ maxWidth: '320px' }}>
          <div className="ds-popup__head">
            <span className="font-mono text-xs uppercase text-[var(--ds-color-accent)] tracking-widest flex items-center gap-2">
              <Eye size={14} /> Generative Visuals
            </span>
            <button 
              onClick={() => setIsVisualMenuOpen(false)}
              className="text-zinc-400 hover:text-white p-1"
            >
              <X size={16} />
            </button>
          </div>
          <div className="ds-popup__body">
            <div className="flex flex-col gap-2">
              {presets.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    onVisualPresetChange(p.id);
                    setIsVisualMenuOpen(false);
                  }}
                  className={`ds-popup__link w-full flex items-center justify-between ${
                    visualPreset === p.id ? 'border-[var(--ds-color-accent)] text-[var(--ds-color-accent)]' : ''
                  }`}
                >
                  <span>{p.name}</span>
                  {visualPreset === p.id && <span className="text-xs">●</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Dock Container */}
      <nav className="content__sub" aria-label="Content Navigation">
        {/* Extra Utility Row */}
        <div className="content__sub-row content__sub-row--extra">
          {/* Audio Synthesizer Button */}
          <button
            type="button"
            onClick={toggleAudio}
            className={`content__util-btn ${isPlayingAudio ? 'content__util-btn--active' : ''}`}
            title="Toggle Ambient Drone & Synth"
          >
            {isPlayingAudio ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span>Music</span>
            {/* Visualizer bars */}
            <div className="flex items-end gap-[2px] h-[12px] ml-1">
              {audioBars.map((height, i) => (
                <div
                  key={i}
                  className="w-[2px] bg-current transition-all duration-100"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </button>

          {/* Visuals Preset Switcher Button */}
          <button
            type="button"
            onClick={cyclePreset}
            onContextMenu={(e) => {
              e.preventDefault();
              setIsVisualMenuOpen(!isVisualMenuOpen);
            }}
            className="content__util-btn"
            title="Click to cycle visual preset, right-click for list"
          >
            <Eye size={15} />
            <span><span className="content__util-prefix">Visual: </span>{presets.find(p => p.id === visualPreset)?.name.split(' ')[0]}</span>
          </button>

          {/* Menu / Jump Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="content__util-btn"
            title="Open navigation menu"
          >
            <MenuIcon size={15} />
            <span>Menu</span>
          </button>
        </div>

        {/* Main Section Navigation Buttons */}
        <div className="content__sub-row content__sub-row--main">
          <button
            type="button"
            className={`content__menu-btn ${activeTab === 'general' ? 'content__menu-btn--active' : ''}`}
            onClick={() => handleTabClick('general')}
          >
            <span className="content__menu-btn-index">00</span>
            <span className="content__menu-btn-label">General</span>
          </button>

          <button
            type="button"
            className={`content__menu-btn ${activeTab === 'developer' ? 'content__menu-btn--active' : ''}`}
            onClick={() => handleTabClick('developer')}
          >
            <span className="content__menu-btn-index">01</span>
            <span className="content__menu-btn-label">Developer</span>
          </button>

          <button
            type="button"
            className={`content__menu-btn ${activeTab === 'projects' ? 'content__menu-btn--active' : ''}`}
            onClick={() => handleTabClick('projects')}
          >
            <span className="content__menu-btn-index">02</span>
            <span className="content__menu-btn-label">Projects</span>
          </button>

          <button
            type="button"
            className={`content__menu-btn ${activeTab === 'contact' ? 'content__menu-btn--active' : ''}`}
            onClick={() => handleTabClick('contact')}
          >
            <span className="content__menu-btn-index">03</span>
            <span className="content__menu-btn-label">Contact</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
