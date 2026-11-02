/**
 * Smart TV Remote Control & Spatial Navigation Engine
 * Provides D-Pad (Arrow Keys), OK/Enter, Back button, and 10-foot UI spatial navigation
 */

import { soundAudio } from './audio';

export interface TVNavOptions {
  onBack?: () => void;
  onSelectSD?: () => void;
  onSelectDiniyah?: () => void;
  onToggleFullscreen?: () => void;
  onGoHome?: () => void;
}

export const isSmartTVBrowser = (): boolean => {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /SmartTV|Tizen|webOS|Web0S|Android TV|GoogleTV|HbbTV|CrKey|BRAVIA|AppleTV|Roku|NETTV|POV_TV|Viera/i.test(ua);
};

export class TVSpatialNavigator {
  private active = false;
  private options: TVNavOptions = {};

  constructor(options?: TVNavOptions) {
    if (options) this.options = options;
  }

  public setOptions(options: TVNavOptions) {
    this.options = { ...this.options, ...options };
  }

  public start() {
    if (this.active || typeof window === 'undefined') return;
    this.active = true;
    window.addEventListener('keydown', this.handleKeyDown, true);
  }

  public stop() {
    if (!this.active || typeof window === 'undefined') return;
    this.active = false;
    window.removeEventListener('keydown', this.handleKeyDown, true);
  }

  private getFocusableElements(): HTMLElement[] {
    const selector = [
      'button:not([disabled]):not([aria-hidden="true"])',
      'a[href]:not([aria-hidden="true"])',
      'input:not([disabled]):not([type="hidden"])',
      '[role="button"]:not([disabled]):not([aria-hidden="true"])',
      '[tabindex]:not([tabindex="-1"]):not([disabled])'
    ].join(', ');

    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

    // Filter to only visible elements
    return elements.filter(el => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0' &&
        rect.width > 0 &&
        rect.height > 0
      );
    });
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    // Check if user is typing in a text input (allow normal typing)
    const activeEl = document.activeElement as HTMLElement | null;
    const isTextInput = activeEl && (
      activeEl.tagName === 'INPUT' ||
      activeEl.tagName === 'TEXTAREA' ||
      activeEl.isContentEditable
    );

    // Common TV Remote Back KeyCodes (Tizen 10009, WebOS 461, Android 4, Esc 27, Backspace 8)
    const isBackKey =
      e.key === 'Escape' ||
      e.key === 'GoBack' ||
      e.key === 'BrowserBack' ||
      e.keyCode === 27 ||
      e.keyCode === 10009 ||
      e.keyCode === 461 ||
      (e.key === 'Backspace' && !isTextInput);

    if (isBackKey) {
      if (this.options.onBack) {
        e.preventDefault();
        soundAudio.playTvNavTick();
        this.options.onBack();
        return;
      }
    }

    // Number keys 1 and 2 for fast switching between Pelajaran SD and Diniyah
    if (!isTextInput) {
      if (e.key === '1' && this.options.onSelectSD) {
        e.preventDefault();
        this.options.onSelectSD();
        return;
      }
      if (e.key === '2' && this.options.onSelectDiniyah) {
        e.preventDefault();
        this.options.onSelectDiniyah();
        return;
      }
      if ((e.key === 'f' || e.key === 'F') && this.options.onToggleFullscreen) {
        e.preventDefault();
        this.options.onToggleFullscreen();
        return;
      }
      if ((e.key === 'h' || e.key === 'H') && this.options.onGoHome) {
        e.preventDefault();
        this.options.onGoHome();
        return;
      }
    }

    // Spatial Navigation for D-Pad Arrows
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      // If typing in input, let left/right move cursor unless up/down
      if (isTextInput && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        return;
      }

      e.preventDefault();
      this.moveFocus(e.key as 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight');
    }
  };

  public moveFocus(direction: 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight') {
    const focusables = this.getFocusableElements();
    if (focusables.length === 0) return;

    const current = document.activeElement as HTMLElement | null;

    // If nothing currently focused or active element is body, focus first visible item in main or nav
    if (!current || current === document.body || !focusables.includes(current)) {
      const target = focusables.find(el => el.closest('main') || el.closest('header')) || focusables[0];
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      soundAudio.playTvNavTick();
      return;
    }

    const currentRect = current.getBoundingClientRect();
    const currentCenter = {
      x: currentRect.left + currentRect.width / 2,
      y: currentRect.top + currentRect.height / 2
    };

    let bestCandidate: HTMLElement | null = null;
    let minDistance = Infinity;

    for (const candidate of focusables) {
      if (candidate === current) continue;

      const candRect = candidate.getBoundingClientRect();
      const candCenter = {
        x: candRect.left + candRect.width / 2,
        y: candRect.top + candRect.height / 2
      };

      const dx = candCenter.x - currentCenter.x;
      const dy = candCenter.y - currentCenter.y;

      let isDirectionallyValid = false;

      switch (direction) {
        case 'ArrowRight':
          isDirectionallyValid = dx > 8 && Math.abs(dy) < Math.abs(dx) * 2.2;
          break;
        case 'ArrowLeft':
          isDirectionallyValid = dx < -8 && Math.abs(dy) < Math.abs(dx) * 2.2;
          break;
        case 'ArrowDown':
          isDirectionallyValid = dy > 8 && Math.abs(dx) < Math.abs(dy) * 2.2;
          break;
        case 'ArrowUp':
          isDirectionallyValid = dy < -8 && Math.abs(dx) < Math.abs(dy) * 2.2;
          break;
      }

      if (isDirectionallyValid) {
        // Weighted distance metric favoring the primary movement axis
        let distance: number;
        if (direction === 'ArrowLeft' || direction === 'ArrowRight') {
          distance = Math.abs(dx) + Math.abs(dy) * 1.8;
        } else {
          distance = Math.abs(dy) + Math.abs(dx) * 1.8;
        }

        if (distance < minDistance) {
          minDistance = distance;
          bestCandidate = candidate;
        }
      }
    }

    // Fallback: If no candidate in strict cone, find closest element in that general half-plane
    if (!bestCandidate) {
      for (const candidate of focusables) {
        if (candidate === current) continue;
        const candRect = candidate.getBoundingClientRect();
        const candCenter = {
          x: candRect.left + candRect.width / 2,
          y: candRect.top + candRect.height / 2
        };

        const dx = candCenter.x - currentCenter.x;
        const dy = candCenter.y - currentCenter.y;

        const isHalfPlaneValid =
          (direction === 'ArrowRight' && dx > 0) ||
          (direction === 'ArrowLeft' && dx < 0) ||
          (direction === 'ArrowDown' && dy > 0) ||
          (direction === 'ArrowUp' && dy < 0);

        if (isHalfPlaneValid) {
          const dist = Math.hypot(dx, dy);
          if (dist < minDistance) {
            minDistance = dist;
            bestCandidate = candidate;
          }
        }
      }
    }

    if (bestCandidate) {
      bestCandidate.focus();
      bestCandidate.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      soundAudio.playTvNavTick();
    }
  }
}
