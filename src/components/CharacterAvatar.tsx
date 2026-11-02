import React from 'react';
import { CharacterConfig } from '../types';

interface CharacterAvatarProps {
  config: CharacterConfig;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  isSpeaking?: boolean;
  className?: string;
  showBadge?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  config,
  size = 'lg',
  isSpeaking = false,
  className = '',
  showBadge = false
}) => {
  // Generate unique prefix for SVG IDs to prevent cross-SVG gradient/clip conflicts
  const rawId = React.useId();
  const uid = 'ch_' + rawId.replace(/[^a-zA-Z0-9]/g, '');

  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-44 h-44',
    '2xl': 'w-56 h-56'
  };

  const headwearType = config.headwearType || 'hijab';
  const hijabColor = config.hijabColor || '#ffffff';
  const hijabStyle = config.hijabStyle || 'bergo_sekolah';
  const peciStyle = config.peciStyle || 'songkok_hitam';
  const hatStyle = config.hatStyle || 'topi_sd';
  const hairStyle = config.hairStyle || 'pendek_rapi';
  const hairColor = config.hairColor || '#1e293b';
  const peciColor =
    config.peciColor ||
    (peciStyle === 'songkok_hitam'
      ? '#0f172a'
      : peciStyle === 'kopiah_putih'
      ? '#ffffff'
      : '#047857');

  const mouthStyle = config.mouthExpression || 'sweet_smile';
  const blushStyle = config.blushStyle || 'rosy';
  const handPose = config.handPose || 'peace';
  const faceMark = config.faceMark || 'none';
  const eyeStyle = config.eyeExpression || 'star_eyes';
  const skinTone = config.skinTone || 'warm_peach';
  const auraEffect = config.auraEffect || 'none';

  // Preset outfit palettes
  const getOutfitColors = () => {
    switch (config.outfit) {
      case 'mi_hijau':
        return {
          primary: '#059669', // Emerald green
          secondary: '#ffffff',
          trim: '#047857',
          collar: '#ffffff',
          accent: '#fbbf24',
          label: 'MI Hijau'
        };
      case 'sd_merah':
        return {
          primary: '#ffffff', // White shirt
          secondary: '#dc2626', // Red SD
          trim: '#b91c1c',
          collar: '#dc2626',
          accent: '#dc2626',
          label: 'SD Merah'
        };
      case 'pramuka':
        return {
          primary: '#b45309', // Pramuka brown
          secondary: '#78350f',
          trim: '#92400e',
          collar: '#dc2626',
          accent: '#f59e0b',
          label: 'Pramuka'
        };
      case 'batik':
        return {
          primary: '#047857', // Batik emerald
          secondary: '#f59e0b',
          trim: '#065f46',
          collar: '#ffffff',
          accent: '#f59e0b',
          label: 'Batik'
        };
      case 'jas_lab':
        return {
          primary: '#f8fafc', // Lab coat white
          secondary: '#0284c7',
          trim: '#38bdf8',
          collar: '#0284c7',
          accent: '#0ea5e9',
          label: 'Jas Lab'
        };
      case 'baju_koko':
        return {
          primary: '#ffffff', // White koko
          secondary: '#047857', // Emerald trim
          trim: '#059669',
          collar: '#047857',
          accent: '#fbbf24',
          label: 'Baju Koko'
        };
      default:
        return {
          primary: '#ffffff',
          secondary: '#dc2626',
          trim: '#b91c1c',
          collar: '#dc2626',
          accent: '#dc2626',
          label: 'SD Merah'
        };
    }
  };

  const outfit = getOutfitColors();

  // Skin tone color schemes
  const getSkinPalette = () => {
    switch (skinTone) {
      case 'fair_pink':
        return {
          base: '#fee2e2',
          gradientStart: '#fff1f2',
          gradientEnd: '#fecdd3',
          outline: '#f43f5e',
          outlineOpacity: 0.35,
          nose: '#fb7185'
        };
      case 'honey_tan':
        return {
          base: '#fed7aa',
          gradientStart: '#fed7aa',
          gradientEnd: '#fba85f',
          outline: '#ea580c',
          outlineOpacity: 0.4,
          nose: '#ea580c'
        };
      case 'golden_warm':
        return {
          base: '#fde047',
          gradientStart: '#fef08a',
          gradientEnd: '#facc15',
          outline: '#d97706',
          outlineOpacity: 0.35,
          nose: '#b45309'
        };
      case 'warm_peach':
      default:
        return {
          base: '#ffedd5',
          gradientStart: '#fff7ed',
          gradientEnd: '#fed7aa',
          outline: '#f97316',
          outlineOpacity: 0.35,
          nose: '#fb923c'
        };
    }
  };

  const skin = getSkinPalette();

  const hijabBorderColor =
    hijabColor.toLowerCase() === '#ffffff' || hijabColor.toLowerCase() === '#fff'
      ? '#94a3b8'
      : '#334155';

  return (
    <div className={`relative inline-block select-none ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full drop-shadow-md transition-all duration-300 ${
          isSpeaking ? 'scale-105 animate-bounce' : 'hover:scale-103'
        }`}
      >
        <defs>
          <linearGradient id={`${uid}-skinGrad`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={skin.gradientStart} />
            <stop offset="100%" stopColor={skin.gradientEnd} />
          </linearGradient>

          <radialGradient id={`${uid}-blush`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fb7185" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fda4af" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`${uid}-eyeIris`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#090d16" />
            <stop offset="45%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>

          <radialGradient id={`${uid}-pedestal`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`${uid}-hijabShade`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={hijabColor} />
            <stop offset="100%" stopColor={hijabColor} stopOpacity="0.88" />
          </linearGradient>

          <linearGradient id={`${uid}-goldTrophy`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* 0. AURA EFFECT (BACKGROUND GLOW / SPARKLES) */}
        {auraEffect === 'stars' && (
          <g id="aura-stars" opacity="0.85">
            <polygon points="30,40 33,48 41,51 33,54 30,62 27,54 19,51 27,48" fill="#fbbf24" />
            <polygon points="170,45 172,51 178,53 172,55 170,61 168,55 162,53 168,51" fill="#f59e0b" />
            <polygon points="45,130 47,135 52,136 47,137 45,142 43,137 38,136 43,135" fill="#fde047" />
            <polygon points="160,125 162,130 167,131 162,132 160,137 158,132 153,131 158,130" fill="#fbbf24" />
            <circle cx="100" cy="20" r="3" fill="#fef08a" />
          </g>
        )}

        {auraEffect === 'sparkles' && (
          <g id="aura-sparkles" opacity="0.9">
            <path d="M 32 30 L 32 46 M 24 38 L 40 38" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 168 34 L 168 48 M 161 41 L 175 41" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
            <path d="M 24 110 L 24 122 M 18 116 L 30 116" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
            <path d="M 174 115 L 174 127 M 168 121 L 180 121" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            <circle cx="95" cy="18" r="3" fill="#c084fc" />
            <circle cx="115" cy="22" r="2.5" fill="#38bdf8" />
          </g>
        )}

        {auraEffect === 'rainbow' && (
          <g id="aura-rainbow" opacity="0.65">
            <path d="M 35 60 A 70 70 0 0 1 165 60" stroke="#f87171" strokeWidth="3" fill="none" />
            <path d="M 38 62 A 66 66 0 0 1 162 62" stroke="#fbbf24" strokeWidth="3" fill="none" />
            <path d="M 41 64 A 62 62 0 0 1 159 64" stroke="#34d399" strokeWidth="3" fill="none" />
            <path d="M 44 66 A 58 58 0 0 1 156 66" stroke="#60a5fa" strokeWidth="3" fill="none" />
          </g>
        )}

        {auraEffect === 'bubbles' && (
          <g id="aura-bubbles" opacity="0.75">
            <circle cx="35" cy="50" r="9" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="32" cy="46" r="2.5" fill="#ffffff" />
            <circle cx="168" cy="65" r="11" fill="#fce7f3" stroke="#f472b6" strokeWidth="1.5" />
            <circle cx="165" cy="60" r="3" fill="#ffffff" />
            <circle cx="30" cy="120" r="7" fill="#dcfce7" stroke="#34d399" strokeWidth="1.2" />
            <circle cx="170" cy="130" r="8" fill="#fef9c3" stroke="#facc15" strokeWidth="1.2" />
          </g>
        )}

        {auraEffect === 'music' && (
          <g id="aura-music" opacity="0.85">
            {/* Note 1 (♫) */}
            <path d="M 32 45 L 32 30 L 46 26 L 46 41 M 32 35 L 46 31" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse cx="28" cy="45" rx="5" ry="3.5" fill="#8b5cf6" transform="rotate(-15 28 45)" />
            <ellipse cx="42" cy="41" rx="5" ry="3.5" fill="#8b5cf6" transform="rotate(-15 42 41)" />
            {/* Note 2 (♪) */}
            <path d="M 166 45 L 166 28 Q 174 26 176 34" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse cx="162" cy="45" rx="5" ry="3.5" fill="#ec4899" transform="rotate(-15 162 45)" />
          </g>
        )}

        {/* 1. FLOATING PEDESTAL SHADOW */}
        <ellipse cx="100" cy="195" rx="34" ry="4" fill={`url(#${uid}-pedestal)`} />

        {/* 2. PETITE DRESS / OUTFIT BODY */}
        <g id="avatar-outfit-body">
          <path
            d="M 76 116 C 74 116 68 140 66 182 C 66 188 78 192 100 192 C 122 192 134 188 134 182 C 132 140 126 116 124 116 Z"
            fill={outfit.primary}
            stroke={outfit.trim}
            strokeWidth="2"
          />

          {/* Outfit details */}
          {config.outfit === 'mi_hijau' && (
            <g id="mi-details">
              <path d="M 94 118 L 100 135 L 106 118 Z" fill="#ffffff" />
              <circle cx="100" cy="144" r="2" fill="#fbbf24" />
              <circle cx="100" cy="156" r="2" fill="#fbbf24" />
              <circle cx="100" cy="168" r="2" fill="#fbbf24" />
            </g>
          )}

          {config.outfit === 'sd_merah' && (
            <g id="sd-details">
              {/* SD Merah Tie */}
              <path d="M 96 118 L 104 118 L 102 148 L 100 153 L 98 148 Z" fill="#dc2626" />
              <path d="M 68 178 Q 100 186 132 178 L 134 188 Q 100 194 66 188 Z" fill="#dc2626" />
            </g>
          )}

          {config.outfit === 'pramuka' && (
            <g id="pramuka-details">
              {/* Pramuka Hasduk */}
              <path d="M 88 118 L 100 138 L 112 118 Z" fill="#ffffff" stroke="#dc2626" strokeWidth="1.5" />
              <circle cx="100" cy="138" r="3" fill="#b45309" />
            </g>
          )}

          {config.outfit === 'batik' && (
            <g id="batik-details" opacity="0.8">
              <circle cx="88" cy="148" r="2.5" fill="#fbbf24" />
              <circle cx="112" cy="148" r="2.5" fill="#fbbf24" />
              <circle cx="100" cy="165" r="2.5" fill="#fbbf24" />
              <circle cx="94" cy="178" r="2" fill="#fbbf24" />
              <circle cx="106" cy="178" r="2" fill="#fbbf24" />
            </g>
          )}

          {config.outfit === 'jas_lab' && (
            <g id="lab-details">
              <rect x="114" y="142" width="12" height="15" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              <rect x="118" y="137" width="2" height="6" rx="0.5" fill="#0284c7" />
            </g>
          )}

          {config.outfit === 'baju_koko' && (
            <g id="koko-details">
              {/* Clean Koko Mandarin Collar & Gold/Green Embroidery strip */}
              <path d="M 98 118 L 102 118 L 102 170 L 98 170 Z" fill="#047857" opacity="0.85" />
              <circle cx="100" cy="128" r="1.8" fill="#fbbf24" />
              <circle cx="100" cy="142" r="1.8" fill="#fbbf24" />
              <circle cx="100" cy="156" r="1.8" fill="#fbbf24" />
              {/* Chest pocket embroidery */}
              <rect x="112" y="140" width="10" height="9" rx="1.5" fill="none" stroke="#047857" strokeWidth="1" />
            </g>
          )}
        </g>

        {/* 3. HEADWEAR BACK OR HAIR BACK */}
        {headwearType === 'hijab' ? (
          /* Hijab Back Hood */
          <g id="hijab-hood-back">
            <ellipse
              cx="100"
              cy="68"
              rx="46"
              ry="45"
              fill={hijabColor}
              stroke={hijabBorderColor}
              strokeWidth="2"
              strokeOpacity="0.35"
            />
          </g>
        ) : (
          /* Hair Back for Peci, Topi, or Rambut */
          <g id="hair-hood-back">
            <ellipse cx="100" cy="70" rx="38" ry="36" fill={hairColor} />
            {hairStyle === 'kuncir_kuda' && (
              /* High ponytail bun / tuft */
              <g id="ponytail-tuft">
                <path d="M 125 45 Q 155 35 152 68 Q 140 75 132 58 Z" fill={hairColor} />
                {/* Hair ribbon */}
                <ellipse cx="128" cy="46" rx="4.5" ry="4" fill="#f43f5e" />
              </g>
            )}
            {hairStyle === 'ikal_lucu' && (
              /* Curly side tufts */
              <g id="curly-tufts">
                <circle cx="62" cy="78" r="11" fill={hairColor} />
                <circle cx="138" cy="78" r="11" fill={hairColor} />
              </g>
            )}
          </g>
        )}

        {/* 4. NECK & COLLAR (when NOT hijab) OR HIJAB CHEST DRAPE */}
        {headwearType === 'hijab' ? (
          <g id="hijab-chest-drape">
            {hijabStyle === 'hijab_syari' ? (
              <path
                d="M 68 90 Q 58 108 58 128 Q 78 138 100 139 Q 122 138 142 128 Q 142 108 132 90 Q 100 96 68 90 Z"
                fill={hijabColor}
                stroke={hijabBorderColor}
                strokeWidth="2"
                strokeOpacity="0.4"
              />
            ) : hijabStyle === 'kerudung_rabbani' ? (
              <g>
                <path
                  d="M 72 90 Q 64 106 64 124 Q 82 131 100 132 Q 118 131 136 124 Q 136 106 128 90 Q 100 96 72 90 Z"
                  fill={hijabColor}
                  stroke={hijabBorderColor}
                  strokeWidth="2"
                  strokeOpacity="0.4"
                />
                <circle cx="130" cy="115" r="3.5" fill="#f43f5e" />
                <circle cx="130" cy="115" r="1.5" fill="#ffffff" />
              </g>
            ) : hijabStyle === 'pashmina_santri' ? (
              <g>
                <path
                  d="M 72 90 Q 64 106 64 124 Q 82 131 100 132 Q 118 131 136 124 Q 136 106 128 90 Q 100 96 72 90 Z"
                  fill={hijabColor}
                  stroke={hijabBorderColor}
                  strokeWidth="2"
                  strokeOpacity="0.4"
                />
                <path d="M 90 95 Q 100 110 116 124" stroke="#94a3b8" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
              </g>
            ) : (
              <path
                d="M 72 90 Q 64 106 64 124 Q 82 131 100 132 Q 118 131 136 124 Q 136 106 128 90 Q 100 96 72 90 Z"
                fill={hijabColor}
                stroke={hijabBorderColor}
                strokeWidth="2"
                strokeOpacity="0.4"
              />
            )}
          </g>
        ) : (
          /* Non-hijab: Cute clean neck and shirt collar */
          <g id="exposed-neck-collar">
            <path d="M 92 88 L 92 118 L 108 118 L 108 88 Z" fill={skin.base} />
            {/* White Collar flaps */}
            <path d="M 90 116 L 100 128 L 82 120 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <path d="M 110 116 L 100 128 L 118 120 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          </g>
        )}

        {/* 5. CUTE FACE BASE */}
        <g id="face-base">
          {headwearType === 'hijab' && (
            /* Inner Hijab Ciput */
            <path
              d="M 68 62 C 72 44 128 44 132 62 C 122 55 78 55 68 62 Z"
              fill="#e2e8f0"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
          )}

          {/* Face Oval */}
          <ellipse
            cx="100"
            cy="72"
            rx="32"
            ry="29"
            fill={skin.base}
            style={{ fill: `url(#${uid}-skinGrad)` }}
            stroke={skin.outline}
            strokeWidth="1.5"
            strokeOpacity={skin.outlineOpacity}
          />

          {headwearType === 'hijab' ? (
            /* Hijab Face Framing / Pet */
            <>
              <path
                d="M 68 62 C 67 76 72 92 84 94 C 94 95 106 95 116 94 C 128 92 133 76 132 62 C 128 50 72 50 68 62 Z"
                fill="none"
                stroke={hijabBorderColor}
                strokeWidth="2"
                strokeOpacity="0.4"
              />
              <path
                d="M 70 56 Q 100 46 130 56"
                stroke={hijabColor}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 70 56 Q 100 46 130 56"
                stroke={hijabBorderColor}
                strokeWidth="1.2"
                strokeOpacity="0.5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            /* Cute Hair Bangs (Fringe) on forehead when NOT hijab */
            <g id="front-hair-bangs">
              {hairStyle === 'belah_samping' ? (
                /* Side parted anime bangs */
                <path
                  d="M 68 60 Q 90 42 128 52 C 118 64 94 62 88 56 C 82 66 74 65 68 60 Z"
                  fill={hairColor}
                />
              ) : hairStyle === 'kuncir_kuda' ? (
                /* Sleek ponytail bangs */
                <path
                  d="M 70 58 Q 100 44 130 58 C 120 66 108 64 100 58 C 92 64 80 66 70 58 Z"
                  fill={hairColor}
                />
              ) : hairStyle === 'ikal_lucu' ? (
                /* Cute wavy bangs */
                <path
                  d="M 68 58 Q 80 48 90 56 Q 100 48 110 56 Q 120 48 132 58 C 125 66 100 66 68 58 Z"
                  fill={hairColor}
                />
              ) : (
                /* Short neat layered bangs */
                <path
                  d="M 68 60 Q 100 44 132 60 C 124 66 116 62 108 66 C 100 60 92 66 84 62 C 76 66 70 63 68 60 Z"
                  fill={hairColor}
                />
              )}
            </g>
          )}
        </g>

        {/* 5B. HEADWEAR TOP (PECI / TOPI / HAT OVER HEAD) */}
        {headwearType === 'peci' && (
          <g id="peci-headwear">
            {/* Songkok/Peci base shape */}
            <path
              d="M 66 48 C 68 28 132 28 134 48 L 132 58 C 112 55 88 55 68 58 Z"
              fill={peciColor}
              stroke="#334155"
              strokeWidth="1.2"
            />
            {/* Gold trim or ventilation holes */}
            {peciStyle === 'songkok_hitam' && (
              <path d="M 69 56 Q 100 53 131 56" stroke="#fbbf24" strokeWidth="1.2" fill="none" opacity="0.9" />
            )}
            {peciStyle === 'kopiah_putih' && (
              <path d="M 72 44 Q 100 40 128 44" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 2" fill="none" />
            )}
            {peciStyle === 'peci_hijau' && (
              <path d="M 69 55 Q 100 52 131 55" stroke="#fef08a" strokeWidth="1.5" fill="none" />
            )}
          </g>
        )}

        {headwearType === 'topi' && (
          <g id="topi-headwear">
            {hatStyle === 'topi_sd' ? (
              /* Topi SD Merah-Putih */
              <g id="topi-sd">
                {/* Red cap dome */}
                <path d="M 68 50 C 72 26 128 26 132 50 Z" fill="#dc2626" stroke="#b91c1c" strokeWidth="1" />
                {/* White front panel */}
                <path d="M 82 50 C 86 32 114 32 118 50 Z" fill="#ffffff" />
                {/* Golden Tut Wuri Logo Emblem */}
                <circle cx="100" cy="42" r="3" fill="#fbbf24" />
                {/* Red Visor Lidah Topi */}
                <path d="M 64 52 Q 100 46 136 52 Q 100 62 64 52 Z" fill="#b91c1c" />
              </g>
            ) : (
              /* Baret Pramuka Cokelat */
              <g id="baret-pramuka">
                <path d="M 64 48 C 66 28 140 32 142 50 C 120 54 80 54 64 48 Z" fill="#78350f" stroke="#451a03" strokeWidth="1.2" />
                {/* Pramuka Golden Badge */}
                <circle cx="82" cy="44" r="3.5" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
              </g>
            )}
          </g>
        )}

        {/* 6. FACIAL FEATURES */}
        <g id="facial-features">
          {/* A. BLUSH */}
          {blushStyle === 'hearts' && (
            <g id="blush-hearts">
              <path d="M 76 79 Q 73 75 70 78 Q 68 81 76 85 Q 84 81 82 78 Q 79 75 76 79 Z" fill="#fb7185" />
              <path d="M 124 79 Q 121 75 118 78 Q 116 81 124 85 Q 132 81 130 78 Q 127 75 124 79 Z" fill="#fb7185" />
            </g>
          )}

          {blushStyle === 'sparkles' && (
            <g id="blush-sparkles">
              <circle cx="77" cy="79" r="6" fill="#fb7185" opacity="0.65" />
              <circle cx="123" cy="79" r="6" fill="#fb7185" opacity="0.65" />
              <path d="M 77 75 L 77 83 M 73 79 L 81 79" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 123 75 L 123 83 M 119 79 L 127 79" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          )}

          {blushStyle === 'rosy' && (
            <g id="blush-rosy">
              <circle cx="77" cy="79" r="6.5" fill="#fb7185" opacity="0.65" />
              <circle cx="123" cy="79" r="6.5" fill="#fb7185" opacity="0.65" />
              <circle cx="75.5" cy="77.5" r="1.5" fill="#ffffff" opacity="0.9" />
              <circle cx="121.5" cy="77.5" r="1.5" fill="#ffffff" opacity="0.9" />
            </g>
          )}

          {blushStyle === 'none' && (
            <g id="blush-subtle">
              <circle cx="77" cy="80" r="4.5" fill="#fb923c" opacity="0.25" />
              <circle cx="123" cy="80" r="4.5" fill="#fb923c" opacity="0.25" />
            </g>
          )}

          {/* B. FACE MARKS */}
          {faceMark === 'freckles' && (
            <g id="face-freckles" opacity="0.75">
              <circle cx="74" cy="78" r="0.9" fill="#d97706" />
              <circle cx="77" cy="80" r="0.9" fill="#d97706" />
              <circle cx="80" cy="78" r="0.9" fill="#d97706" />
              <circle cx="120" cy="78" r="0.9" fill="#d97706" />
              <circle cx="123" cy="80" r="0.9" fill="#d97706" />
              <circle cx="126" cy="78" r="0.9" fill="#d97706" />
            </g>
          )}

          {faceMark === 'beauty_mark' && (
            <circle cx="108" cy="83" r="1.2" fill="#334155" />
          )}

          {faceMark === 'forehead_star' && (
            <g id="forehead-star" transform="translate(100, 55)">
              <polygon points="0,-3.5 1.2,-1 3.5,-1 1.8,0.8 2.5,3.2 0,1.8 -2.5,3.2 -1.8,0.8 -3.5,-1 -1.2,-1" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
            </g>
          )}

          {faceMark === 'cheek_patch' && (
            /* Cute anime medical patch/bandage on left cheek */
            <g id="cheek-patch" transform="translate(74, 80) rotate(-15)">
              <rect x="-4" y="-2.5" width="8" height="5" rx="1" fill="#fde047" stroke="#d97706" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="0.9" fill="#f43f5e" />
            </g>
          )}

          {/* C. EYEBROWS */}
          <path d="M 74 59 Q 82 55 90 58" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 110 58 Q 118 55 126 59" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />

          {/* D. EYES */}
          {eyeStyle === 'smile' ? (
            <g id="eyes-smile">
              <path d="M 74 70 Q 83 61 92 70" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M 108 70 Q 117 61 126 70" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M 92 68 L 95 65" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
              <path d="M 108 68 L 105 65" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : eyeStyle === 'happy' ? (
            <g id="eyes-happy">
              <ellipse cx="83" cy="69" rx="7.2" ry="8.8" fill={`url(#${uid}-eyeIris)`} />
              <ellipse cx="83" cy="69" rx="7.2" ry="8.8" stroke="#0f172a" strokeWidth="1.5" />
              <ellipse cx="81.2" cy="66.5" rx="3.2" ry="3.6" fill="#ffffff" />
              <circle cx="85.5" cy="72" r="1.8" fill="#38bdf8" />
              <circle cx="81.5" cy="73" r="1.1" fill="#ffffff" />
              <path d="M 75 66 Q 83 62 91 66" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M 91 65 L 94 62" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 109 70 Q 117 61 125 70" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M 109 68 L 106 65" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : eyeStyle === 'star_eyes' ? (
            <g id="eyes-starry">
              <ellipse cx="83" cy="69" rx="7.5" ry="9" fill="#0f172a" />
              <polygon points="83,63 84.8,67 89,69 84.8,71 83,75 81.2,71 77,69 81.2,67" fill="#fbbf24" />
              <circle cx="80.5" cy="65.5" r="2.2" fill="#ffffff" />
              <circle cx="85.5" cy="72" r="1" fill="#ffffff" />
              <path d="M 75 66 Q 83 61 91 66" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 91 65 L 94 62" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />

              <ellipse cx="117" cy="69" rx="7.5" ry="9" fill="#0f172a" />
              <polygon points="117,63 118.8,67 123,69 118.8,71 117,75 115.2,71 111,69 115.2,67" fill="#fbbf24" />
              <circle cx="114.5" cy="65.5" r="2.2" fill="#ffffff" />
              <circle cx="119.5" cy="72" r="1" fill="#ffffff" />
              <path d="M 109 66 Q 117 61 125 66" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 109 65 L 106 62" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : eyeStyle === 'determined' ? (
            /* Determined/Spirited Anime Eyes (Semangat Juara 🔥) */
            <g id="eyes-determined">
              <path d="M 75 65 L 91 68" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" />
              <ellipse cx="84" cy="70" rx="7" ry="8" fill="#0f172a" />
              <polygon points="84,66 86,70 84,74 82,70" fill="#f59e0b" />
              <circle cx="82" cy="68" r="2" fill="#ffffff" />

              <path d="M 125 65 L 109 68" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" />
              <ellipse cx="116" cy="70" rx="7" ry="8" fill="#0f172a" />
              <polygon points="116,66 118,70 116,74 114,70" fill="#f59e0b" />
              <circle cx="114" cy="68" r="2" fill="#ffffff" />
            </g>
          ) : eyeStyle === 'gentle_round' ? (
            <g id="eyes-round">
              <circle cx="83" cy="69" r="8" fill="#0f172a" />
              <path d="M 75 66 Q 83 62 91 66" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <ellipse cx="81.5" cy="66.5" rx="3.5" ry="3.5" fill="#ffffff" />
              <circle cx="85.5" cy="72" r="2.2" fill="#38bdf8" />
              <circle cx="81" cy="73.5" r="1.3" fill="#ffffff" />

              <circle cx="117" cy="69" r="8" fill="#0f172a" />
              <path d="M 109 66 Q 117 62 125 66" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <ellipse cx="115.5" cy="66.5" rx="3.5" ry="3.5" fill="#ffffff" />
              <circle cx="119.5" cy="72" r="2.2" fill="#38bdf8" />
              <circle cx="115" cy="73.5" r="1.3" fill="#ffffff" />
            </g>
          ) : (
            <g id="eyes-sparkle">
              <ellipse cx="83" cy="69" rx="7.2" ry="8.8" fill={`url(#${uid}-eyeIris)`} />
              <ellipse cx="83" cy="69" rx="7.2" ry="8.8" stroke="#0f172a" strokeWidth="1.5" />
              <ellipse cx="81.2" cy="66.5" rx="3.2" ry="3.8" fill="#ffffff" />
              <circle cx="85.5" cy="72" r="2" fill="#38bdf8" />
              <circle cx="80.5" cy="73.5" r="1.2" fill="#ffffff" />
              <path d="M 75 66 Q 83 62 91 66" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M 91 65 L 94 62" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />

              <ellipse cx="117" cy="69" rx="7.2" ry="8.8" fill={`url(#${uid}-eyeIris)`} />
              <ellipse cx="117" cy="69" rx="7.2" ry="8.8" stroke="#0f172a" strokeWidth="1.5" />
              <ellipse cx="115.2" cy="66.5" rx="3.2" ry="3.8" fill="#ffffff" />
              <circle cx="119.5" cy="72" r="2" fill="#38bdf8" />
              <circle cx="114.5" cy="73.5" r="1.2" fill="#ffffff" />
              <path d="M 109 66 Q 117 62 125 66" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M 109 65 L 106 62" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* E. NOSE */}
          <circle cx="100" cy="76" r="1.5" fill={skin.nose} opacity="0.8" />

          {/* F. MOUTH */}
          {isSpeaking ? (
            <g id="mouth-speaking">
              <ellipse cx="100" cy="84" rx="5.5" ry="5" fill="#e11d48" stroke="#be123c" strokeWidth="1.2" />
              <path d="M 96 84 Q 100 87 104 84" fill="#fda4af" />
            </g>
          ) : mouthStyle === 'cat_mouth' ? (
            <path
              d="M 93 81.5 Q 96.5 85 100 82.5 Q 103.5 85 107 81.5"
              stroke="#e11d48"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          ) : mouthStyle === 'laugh_happy' ? (
            <g id="mouth-laugh">
              <path d="M 93 80.5 Q 100 91 107 80.5 Z" fill="#e11d48" stroke="#be123c" strokeWidth="1.5" />
              <path d="M 94.5 82 Q 100 84 105.5 82" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="100" cy="88" r="3.2" fill="#fda4af" />
            </g>
          ) : mouthStyle === 'cool_smirk' ? (
            <g id="mouth-smirk">
              <path d="M 96 83 Q 102 85 107 80" stroke="#e11d48" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            </g>
          ) : mouthStyle === 'shy_smile' ? (
            <g id="mouth-shy">
              <path d="M 95 83 Q 100 87 105 83" stroke="#e11d48" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            <g id="mouth-sweet">
              <path d="M 93 81.5 Q 100 88 107 81.5" stroke="#e11d48" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              <path d="M 95 82.5 Q 100 87 105 82.5" fill="#fda4af" opacity="0.6" />
            </g>
          )}
        </g>

        {/* 7. ARMS & HANDS */}
        <g id="expressive-hands">
          {handPose === 'peace' ? (
            <g id="hand-peace">
              <path d="M 76 118 Q 58 130 52 145" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="50" cy="142" r="5" fill={skin.base} stroke={skin.outline} strokeWidth="1" strokeOpacity={0.3} />
              <path d="M 48 139 L 45 129" stroke={skin.base} strokeWidth="3" strokeLinecap="round" />
              <path d="M 52 139 L 55 129" stroke={skin.base} strokeWidth="3" strokeLinecap="round" />

              <path d="M 124 118 Q 135 135 128 162" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="127" cy="164" r="5" fill={skin.base} stroke={skin.outline} strokeWidth="1" strokeOpacity={0.3} />
            </g>
          ) : handPose === 'waving' ? (
            <g id="hand-waving">
              <path d="M 76 118 Q 65 135 72 162" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="73" cy="164" r="5" fill={skin.base} stroke={skin.outline} strokeWidth="1" strokeOpacity={0.3} />

              <path d="M 124 118 Q 142 125 148 140" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="150" cy="138" r="5.5" fill={skin.base} stroke={skin.outline} strokeWidth="1" strokeOpacity={0.3} />
              <path d="M 158 134 Q 161 138 158 142" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          ) : handPose === 'holding_book' ? (
            <g id="hand-book">
              <path d="M 76 118 Q 70 142 88 155" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <path d="M 124 118 Q 130 142 112 155" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <rect x="88" y="146" width="24" height="18" rx="2" fill="#047857" stroke="#fbbf24" strokeWidth="1" />
              <rect x="91" y="148" width="8" height="14" fill="#ffffff" opacity="0.95" />
              <rect x="101" y="148" width="8" height="14" fill="#ffffff" opacity="0.95" />
              <path d="M 100 146 L 100 164" stroke="#fbbf24" strokeWidth="1" />
              <circle cx="88" cy="155" r="4" fill={skin.base} />
              <circle cx="112" cy="155" r="4" fill={skin.base} />
            </g>
          ) : handPose === 'thumbs_up' ? (
            /* Thumbs Up Pose 👍 */
            <g id="hand-thumbs-up">
              <path d="M 76 118 Q 62 135 60 160" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="63" cy="162" r="5" fill={skin.base} stroke={skin.outline} strokeWidth="1" strokeOpacity={0.3} />

              <path d="M 124 118 Q 140 128 142 144" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="143" cy="144" r="5.5" fill={skin.base} />
              {/* Upward thumb */}
              <path d="M 143 144 L 143 134" stroke={skin.base} strokeWidth="3.5" strokeLinecap="round" />
            </g>
          ) : handPose === 'holding_trophy' ? (
            /* Holding Trophy Pose 🏆 */
            <g id="hand-trophy">
              <path d="M 76 118 Q 72 138 88 152" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <path d="M 124 118 Q 128 138 112 152" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              {/* Golden Trophy Cup */}
              <path d="M 92 140 C 92 154 108 154 108 140 Z" fill={`url(#${uid}-goldTrophy)`} stroke="#d97706" strokeWidth="1" />
              <rect x="97" y="152" width="6" height="5" fill="#d97706" />
              <rect x="94" y="157" width="12" height="4" rx="1" fill="#78350f" />
              {/* Trophy Handles */}
              <path d="M 92 142 C 86 142 86 148 92 148" stroke="#f59e0b" strokeWidth="1.2" fill="none" />
              <path d="M 108 142 C 114 142 114 148 108 148" stroke="#f59e0b" strokeWidth="1.2" fill="none" />
              <circle cx="88" cy="150" r="4" fill={skin.base} />
              <circle cx="112" cy="150" r="4" fill={skin.base} />
            </g>
          ) : handPose === 'holding_pencil' ? (
            /* Holding pencil & notepad ✏️ */
            <g id="hand-pencil">
              <path d="M 76 118 Q 65 135 78 155" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <rect x="76" y="148" width="14" height="18" rx="1.5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
              <circle cx="78" cy="155" r="4" fill={skin.base} />

              <path d="M 124 118 Q 135 135 118 152" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="118" cy="152" r="4" fill={skin.base} />
              {/* Yellow pencil in hand */}
              <line x1="114" y1="144" x2="124" y2="158" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
              <polygon points="113,143 112,141 115,142" fill="#0f172a" />
            </g>
          ) : (
            <g id="hand-polite">
              <path d="M 76 118 Q 63 135 60 162" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <path d="M 124 118 Q 137 135 140 162" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="65" cy="164" r="5" fill={skin.base} stroke={skin.outline} strokeWidth="1" strokeOpacity={0.3} />
              <circle cx="135" cy="164" r="5" fill={skin.base} stroke={skin.outline} strokeWidth="1" strokeOpacity={0.3} />
            </g>
          )}
        </g>

        {/* 8. ACCESSORIES */}
        <g id="cute-accessories">
          {config.accessory === 'glasses' && (
            /* Round red cute glasses */
            <g id="cute-glasses">
              <circle cx="83" cy="69" r="10.5" fill="none" stroke="#e11d48" strokeWidth="2.4" />
              <circle cx="117" cy="69" r="10.5" fill="none" stroke="#e11d48" strokeWidth="2.4" />
              <path d="M 93.5 69 Q 100 67 106.5 69" stroke="#e11d48" strokeWidth="2.4" fill="none" />
              <path d="M 78 65 L 81 63" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M 112 65 L 115 63" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
            </g>
          )}

          {config.accessory === 'glasses_smart' && (
            /* Modern rectangular smart glasses */
            <g id="smart-glasses">
              <rect x="73" y="62" width="20" height="14" rx="2" fill="none" stroke="#0f172a" strokeWidth="2.2" />
              <rect x="107" y="62" width="20" height="14" rx="2" fill="none" stroke="#0f172a" strokeWidth="2.2" />
              <line x1="93" y1="69" x2="107" y2="69" stroke="#0f172a" strokeWidth="2.2" />
              <line x1="77" y1="64" x2="81" y2="64" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          )}

          {config.accessory === 'sunglasses' && (
            /* Cool dark sunglasses */
            <g id="cool-sunglasses">
              <path d="M 72 63 L 94 63 L 92 77 L 74 77 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              <path d="M 106 63 L 128 63 L 126 77 L 108 77 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              <line x1="94" y1="65" x2="106" y2="65" stroke="#0f172a" strokeWidth="2.5" />
              {/* Gloss line */}
              <line x1="76" y1="66" x2="88" y2="74" stroke="#ffffff" strokeWidth="1.2" opacity="0.75" />
              <line x1="110" y1="66" x2="122" y2="74" stroke="#ffffff" strokeWidth="1.2" opacity="0.75" />
            </g>
          )}

          {config.accessory === 'bow' && (
            <g id="cute-bow" transform="translate(128, 54)">
              <circle cx="0" cy="0" r="3.2" fill="#f43f5e" />
              <path d="M 0 0 L -7 -5 L -7 5 Z" fill="#fb7185" stroke="#f43f5e" strokeWidth="0.8" />
              <path d="M 0 0 L 7 -5 L 7 5 Z" fill="#fb7185" stroke="#f43f5e" strokeWidth="0.8" />
            </g>
          )}

          {config.accessory === 'star_pin' && (
            <g id="cute-star-pin" transform="translate(76, 114)">
              <polygon
                points="0,-6 1.8,-1.8 6,-1.8 2.5,1.5 3.8,6 0,3 -3.8,6 -2.5,1.5 -6,-1.8 -1.8,-1.8"
                fill="#fbbf24"
                stroke="#d97706"
                strokeWidth="1"
              />
            </g>
          )}

          {config.accessory === 'medal' && (
            /* Gold champion medal on chest */
            <g id="chest-medal" transform="translate(100, 134)">
              {/* Red-White Ribbon */}
              <path d="M -8 -16 L 0 0 L 8 -16" stroke="#dc2626" strokeWidth="3" fill="none" />
              <path d="M -5 -16 L 0 0 L 5 -16" stroke="#ffffff" strokeWidth="2" fill="none" />
              {/* Gold Medal Coin */}
              <circle cx="0" cy="4" r="6" fill={`url(#${uid}-goldTrophy)`} stroke="#d97706" strokeWidth="1" />
              <polygon points="0,1 1.2,3 3.5,3 1.8,4.5 2.5,7 0,5.5 -2.5,7 -1.8,4.5 -3.5,3 -1.2,3" fill="#ffffff" />
            </g>
          )}

          {config.accessory === 'backpack' && (
            /* School backpack strap over shoulder */
            <g id="backpack-straps">
              <path d="M 72 118 Q 64 135 68 170" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 128 118 Q 136 135 132 170" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>
          )}

          {config.accessory === 'badge_prestasi' && (
            /* Golden achievement award ribbon */
            <g id="badge-prestasi" transform="translate(76, 128)">
              <circle cx="0" cy="0" r="4.5" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
              <path d="M -2 4 L -4 11 L 0 9 L 4 11 L 2 4 Z" fill="#2563eb" />
              <polygon points="0,-2.5 0.8,-0.8 2.5,-0.8 1.2,0.4 1.8,2.2 0,1.2 -1.8,2.2 -1.2,0.4 -2.5,-0.8 -0.8,-0.8" fill="#ffffff" />
            </g>
          )}

          {config.accessory === 'pencil' && (
            <g id="cute-pencil" transform="translate(138, 132) rotate(-12)">
              <rect x="0" y="0" width="4" height="18" rx="0.5" fill="#fbbf24" stroke="#d97706" strokeWidth="0.7" />
              <polygon points="0,0 2,-4 4,0" fill="#fde68a" />
              <polygon points="0.8,-1.5 2,-4 3.2,-1.5" fill="#0f172a" />
            </g>
          )}
        </g>
      </svg>

      {/* Optional Name Badge */}
      {showBadge && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-emerald-800 text-white font-bold text-[9px] px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap border border-emerald-600">
          {config.name || 'Siswa'}
        </div>
      )}
    </div>
  );
};
