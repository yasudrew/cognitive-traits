import type { ReactElement } from "react";
import type { CategoryId, TypeId } from "@/lib/content";

export const CharacterSVG = ({ type, size = 120 }: { type: TypeId; size?: number }) => {
  const s = size;
  const chars: Record<TypeId, ReactElement> = {
    camera: (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="32" r="18" fill="#D94F3B" opacity="0.15"/>
        <circle cx="60" cy="32" r="14" fill="#D94F3B" opacity="0.3"/>
        <circle cx="60" cy="30" r="12" fill="#F5D0C5"/>
        <circle cx="56" cy="28" r="1.5" fill="#333"/><circle cx="64" cy="28" r="1.5" fill="#333"/>
        <ellipse cx="60" cy="33" rx="3" ry="1.5" fill="#E8A090"/>
        <path d="M48 26c0-8 5-14 12-14s12 6 12 14" fill="#8B4513" opacity="0.8"/>
        <rect x="50" y="44" width="20" height="28" rx="6" fill="#D94F3B" opacity="0.8"/>
        <rect x="32" y="48" width="18" height="5" rx="2.5" fill="#F5D0C5"/>
        <rect x="70" y="48" width="18" height="5" rx="2.5" fill="#F5D0C5"/>
        <rect x="30" y="42" width="12" height="10" rx="2" stroke="#D94F3B" strokeWidth="2" fill="none"/>
        <rect x="78" y="42" width="12" height="10" rx="2" stroke="#D94F3B" strokeWidth="2" fill="none"/>
        <rect x="52" y="72" width="7" height="22" rx="3" fill="#444"/><rect x="61" y="72" width="7" height="22" rx="3" fill="#444"/>
        <ellipse cx="55" cy="96" rx="6" ry="3" fill="#666"/><ellipse cx="65" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
    "3d": (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="32" r="18" fill="#C87620" opacity="0.1"/>
        <circle cx="60" cy="30" r="12" fill="#F5D0C5"/>
        <circle cx="56" cy="28" r="1.5" fill="#333"/><circle cx="64" cy="28" r="1.5" fill="#333"/>
        <path d="M57 34 Q60 36 63 34" stroke="#C87620" strokeWidth="1.2" fill="none"/>
        <path d="M48 26c0-7 5-13 12-13s12 6 12 13" fill="#3A3A3A"/>
        <rect x="50" y="44" width="20" height="28" rx="6" fill="#C87620" opacity="0.8" transform="rotate(-3 60 58)"/>
        <line x1="50" y1="50" x2="28" y2="42" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <line x1="70" y1="52" x2="92" y2="58" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <g transform="translate(18,30)"><path d="M0 8 L8 4 L16 8 L16 16 L8 20 L0 16Z" fill="#C87620" opacity="0.2" stroke="#C87620" strokeWidth="1"/><path d="M0 8 L8 12 L16 8" fill="none" stroke="#C87620" strokeWidth="0.8"/><path d="M8 12 L8 20" stroke="#C87620" strokeWidth="0.8"/></g>
        <rect x="51" y="72" width="7" height="22" rx="3" fill="#444" transform="rotate(3 54 83)"/><rect x="62" y="72" width="7" height="22" rx="3" fill="#444" transform="rotate(-5 65 83)"/>
        <ellipse cx="54" cy="96" rx="6" ry="3" fill="#666"/><ellipse cx="67" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
    fantasy: (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="32" r="18" fill="#2968B0" opacity="0.08"/>
        <circle cx="60" cy="32" r="12" fill="#F5D0C5"/>
        <circle cx="57" cy="29" r="1.5" fill="#333"/><circle cx="65" cy="29" r="1.5" fill="#333"/>
        <ellipse cx="60" cy="35" rx="2.5" ry="1" fill="#E8A090"/>
        <path d="M47 28c0-8 6-15 13-15s13 7 13 15" fill="#5C3317"/><path d="M73 28c2 3 2 8 0 12" stroke="#5C3317" strokeWidth="3" fill="none"/>
        <rect x="50" y="46" width="20" height="28" rx="6" fill="#2968B0" opacity="0.8"/>
        <line x1="50" y1="52" x2="38" y2="60" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <line x1="70" y1="50" x2="80" y2="38" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/><circle cx="80" cy="36" r="3" fill="#F5D0C5"/>
        <circle cx="88" cy="24" r="3" fill="#2968B0" opacity="0.15"/><circle cx="94" cy="16" r="5" fill="#2968B0" opacity="0.15"/><circle cx="100" cy="8" r="8" fill="#2968B0" opacity="0.12"/>
        <rect x="52" y="74" width="7" height="20" rx="3" fill="#444"/><rect x="61" y="74" width="7" height="20" rx="3" fill="#444"/>
        <ellipse cx="55" cy="96" rx="6" ry="3" fill="#666"/><ellipse cx="65" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
    dictionary: (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="32" r="18" fill="#6D4ABA" opacity="0.08"/>
        <circle cx="60" cy="30" r="12" fill="#F5D0C5"/>
        <circle cx="56" cy="28" r="1.5" fill="#333"/><circle cx="64" cy="28" r="1.5" fill="#333"/>
        <circle cx="56" cy="28" r="5" stroke="#6D4ABA" strokeWidth="1.2" fill="none" opacity="0.6"/><circle cx="64" cy="28" r="5" stroke="#6D4ABA" strokeWidth="1.2" fill="none" opacity="0.6"/>
        <line x1="61" y1="27" x2="59" y2="27" stroke="#6D4ABA" strokeWidth="1" opacity="0.6"/>
        <path d="M57 34 Q60 35 63 34" stroke="#B08080" strokeWidth="1" fill="none"/>
        <path d="M48 25c0-7 5-13 12-13s12 6 12 13" fill="#2A1A0A"/>
        <rect x="50" y="44" width="20" height="28" rx="6" fill="#6D4ABA" opacity="0.8"/>
        <line x1="50" y1="52" x2="34" y2="56" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/><line x1="70" y1="52" x2="78" y2="56" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <rect x="26" y="48" width="14" height="18" rx="2" fill="white" stroke="#6D4ABA" strokeWidth="1.2"/>
        <line x1="29" y1="53" x2="37" y2="53" stroke="#6D4ABA" strokeWidth="0.8" opacity="0.4"/><line x1="29" y1="56" x2="37" y2="56" stroke="#6D4ABA" strokeWidth="0.8" opacity="0.4"/><line x1="29" y1="59" x2="35" y2="59" stroke="#6D4ABA" strokeWidth="0.8" opacity="0.4"/>
        <rect x="52" y="72" width="7" height="22" rx="3" fill="#444"/><rect x="61" y="72" width="7" height="22" rx="3" fill="#444"/>
        <ellipse cx="55" cy="96" rx="6" ry="3" fill="#666"/><ellipse cx="65" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
    radio: (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="32" r="18" fill="#178F5E" opacity="0.08"/>
        <circle cx="60" cy="30" r="12" fill="#F5D0C5"/>
        <circle cx="56" cy="28" r="1.5" fill="#333"/><circle cx="64" cy="28" r="1.5" fill="#333"/>
        <ellipse cx="60" cy="34" rx="3" ry="2" fill="#E8A090"/>
        <path d="M48 26c0-8 5-14 12-14s12 6 12 14" fill="#1A1A1A"/>
        <rect x="50" y="44" width="20" height="28" rx="6" fill="#178F5E" opacity="0.8"/>
        <line x1="50" y1="52" x2="36" y2="62" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/><line x1="70" y1="48" x2="74" y2="36" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <path d="M76 30 Q82 30 82 26" stroke="#178F5E" strokeWidth="1.5" fill="none" opacity="0.3"/><path d="M78 34 Q86 34 86 28" stroke="#178F5E" strokeWidth="1.5" fill="none" opacity="0.25"/><path d="M80 38 Q90 38 90 30" stroke="#178F5E" strokeWidth="1.5" fill="none" opacity="0.2"/>
        <rect x="52" y="72" width="7" height="22" rx="3" fill="#444"/><rect x="61" y="72" width="7" height="22" rx="3" fill="#444"/>
        <ellipse cx="55" cy="96" rx="6" ry="3" fill="#666"/><ellipse cx="65" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
    sound: (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="32" r="18" fill="#0E8A8A" opacity="0.08"/>
        <circle cx="60" cy="30" r="12" fill="#F5D0C5"/>
        <circle cx="56" cy="28" r="1.5" fill="#333"/><circle cx="64" cy="28" r="1.5" fill="#333"/>
        <path d="M57 33 Q60 35 63 33" stroke="#C08070" strokeWidth="1" fill="none"/>
        <path d="M48 26c0-8 5-14 12-14s12 6 12 14" fill="#6B3A2A"/>
        <path d="M44 28 Q44 14 60 14 Q76 14 76 28" stroke="#0E8A8A" strokeWidth="2.5" fill="none"/>
        <rect x="40" y="26" width="6" height="10" rx="3" fill="#0E8A8A"/><rect x="74" y="26" width="6" height="10" rx="3" fill="#0E8A8A"/>
        <rect x="50" y="44" width="20" height="28" rx="6" fill="#0E8A8A" opacity="0.8"/>
        <line x1="50" y1="50" x2="38" y2="64" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/><line x1="70" y1="50" x2="82" y2="64" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <g transform="translate(84,18)" opacity="0.35"><circle cx="0" cy="6" r="2" fill="#0E8A8A"/><line x1="2" y1="6" x2="2" y2="-2" stroke="#0E8A8A" strokeWidth="1"/><path d="M2-2 Q6-4 4 0" fill="#0E8A8A"/></g>
        <g transform="translate(92,10)" opacity="0.25"><circle cx="0" cy="6" r="2" fill="#0E8A8A"/><line x1="2" y1="6" x2="2" y2="-2" stroke="#0E8A8A" strokeWidth="1"/><path d="M2-2 Q6-4 4 0" fill="#0E8A8A"/></g>
        <rect x="52" y="72" width="7" height="22" rx="3" fill="#444"/><rect x="61" y="72" width="7" height="22" rx="3" fill="#444"/>
        <ellipse cx="55" cy="96" rx="6" ry="3" fill="#666"/><ellipse cx="65" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
  };
  return chars[type];
};

export const CategoryIcon = ({ type, size = 40 }: { type: CategoryId; size?: number }) => {
  if (type === "visual") return (<svg viewBox="0 0 40 40" width={size} height={size} fill="none"><circle cx="20" cy="20" r="16" fill="#D94F3B" opacity="0.1"/><ellipse cx="20" cy="20" rx="11" ry="8" stroke="#D94F3B" strokeWidth="1.8" fill="none"/><circle cx="20" cy="20" r="3.5" fill="#D94F3B" opacity="0.6"/><circle cx="20" cy="20" r="1.5" fill="#D94F3B"/></svg>);
  if (type === "verbal") return (<svg viewBox="0 0 40 40" width={size} height={size} fill="none"><circle cx="20" cy="20" r="16" fill="#2968B0" opacity="0.1"/><rect x="12" y="10" width="16" height="20" rx="2" stroke="#2968B0" strokeWidth="1.8" fill="none"/><line x1="15" y1="15" x2="25" y2="15" stroke="#2968B0" strokeWidth="1.2" opacity="0.5"/><line x1="15" y1="19" x2="25" y2="19" stroke="#2968B0" strokeWidth="1.2" opacity="0.5"/><line x1="15" y1="23" x2="21" y2="23" stroke="#2968B0" strokeWidth="1.2" opacity="0.5"/></svg>);
  return (<svg viewBox="0 0 40 40" width={size} height={size} fill="none"><circle cx="20" cy="20" r="16" fill="#178F5E" opacity="0.1"/><path d="M13 16 Q13 10 20 10 Q27 10 27 16" stroke="#178F5E" strokeWidth="1.8" fill="none"/><rect x="11" y="15" width="4" height="7" rx="2" fill="#178F5E" opacity="0.5"/><rect x="25" y="15" width="4" height="7" rx="2" fill="#178F5E" opacity="0.5"/><path d="M15 28 Q15 32 20 32 Q25 32 25 28" stroke="#178F5E" strokeWidth="1.2" fill="none" opacity="0.4"/><line x1="20" y1="22" x2="20" y2="28" stroke="#178F5E" strokeWidth="1.2" opacity="0.4"/></svg>);
};
