# Backgammon Game - Refactoring Plan

## Overview
Refactor the backgammon game application to:
- Convert from SCSS modules to pure Tailwind CSS
- Optimize images with Next.js `<Image />` component
- Maintain Lucide-React icons
- Keep local state management with React hooks
- Ensure strict TypeScript typing
- Improve accessibility and responsiveness

## Current Architecture Analysis

### Existing Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── globals.scss
│   └── gameplay/
│       ├── page.tsx (Main game page)
│       └── gameplay.module.scss
├── components/
│   ├── index.ts (Barrel export)
│   ├── button.tsx + button.module.scss
│   ├── gameBoard.tsx + gameBoard.module.scss
│   ├── playerAvatar.tsx + playerAvatar.module.scss
│   ├── toggle.tsx + toggle.module.scss
│   └── basicLayout.tsx + basicLayout.module.scss
├── hooks/
│   └── animationLoopHook.tsx
├── types/
│   ├── board.ts
│   └── index.ts
├── utils/
│   ├── animationFunctions.ts
│   ├── gameGeometry.ts
│   ├── gameLogic.ts
│   └── helpers.ts
└── variables/
    ├── dimensions.ts
    └── index.ts
```

### Issues Identified
1. **SCSS Modules**: Heavy reliance on `.module.scss` files
2. **Image Tags**: Using `<img>` instead of Next.js `<Image />`
3. **Mixed Styling**: Inline styles in JSX + SCSS modules + Tailwind
4. **Type Safety**: Some `any` types present, needs strict typing
5. **Accessibility**: Missing ARIA labels and semantic HTML in some components
6. **Responsiveness**: SCSS breakpoints not fully Tailwind-based

## Refactoring Phases

### Phase 1: Setup & Configuration
- [ ] Add Tailwind CSS config file (if missing)
- [ ] Add PostCSS config
- [ ] Install missing dependencies (if any)
- [ ] Set up TypeScript strict mode in tsconfig.json
- [ ] Create Tailwind custom utilities/colors file

### Phase 2: Component Refactoring (Priority Order)

#### 2.1 Button Component
- Remove `button.module.scss`
- Convert to pure Tailwind classes
- Maintain icon + label layout
- Add hover/active states with Tailwind
- Improve accessibility (aria-label, role)

#### 2.2 PlayerAvatar Component
- Convert hexagon styling to Tailwind
- Replace `<img>` with Next.js `<Image />`
- Add proper image sizing
- Improve semantic HTML
- Add ARIA labels

#### 2.3 Toggle/Switch Component
- Remove `toggle.module.scss`
- Convert to pure Tailwind
- Add accessibility features
- Ensure keyboard navigation

#### 2.4 BasicLayout Component
- Convert layout SCSS to Tailwind
- Maintain background image with optimized handling
- Use CSS Grid/Flexbox Tailwind utilities
- Add responsive breakpoints

#### 2.5 GameBoard Component
- Review and optimize existing styling
- Convert SCSS to Tailwind where possible
- Keep Three.js canvas as-is
- Optimize performance

#### 2.6 Gameplay Page
- Convert `gameplay.module.scss` to Tailwind
- Update component usage
- Improve layout responsiveness
- Add semantic HTML structure

### Phase 3: Image Optimization
- [ ] Replace all `<img>` tags with Next.js `<Image />`
- [ ] Set proper `width` and `height` props
- [ ] Add `alt` text to all images
- [ ] Optimize image sizes for different breakpoints
- [ ] Handle placeholder loading states

### Phase 4: TypeScript Improvements
- [ ] Remove all `any` types
- [ ] Add strict prop types to all components
- [ ] Create comprehensive type definitions
- [ ] Enable `strict: true` in tsconfig.json

### Phase 5: Accessibility & Semantic HTML
- [ ] Add ARIA labels to interactive elements
- [ ] Use semantic HTML (`<button>`, `<nav>`, `<section>`, etc.)
- [ ] Ensure keyboard navigation
- [ ] Add focus states for keyboard users
- [ ] Test with accessibility tools

### Phase 6: Responsiveness
- [ ] Define breakpoints in Tailwind config
- [ ] Test on mobile (320px), tablet (768px), desktop (1024px+)
- [ ] Use Tailwind responsive prefixes (sm:, md:, lg:, xl:)
- [ ] Verify layout flexibility

### Phase 7: Testing & Verification
- [ ] Run `npm run build` - verify no errors
- [ ] Test all interactive elements
- [ ] Verify responsive design
- [ ] Check browser compatibility
- [ ] Performance audit

## Color Palette (from current SCSS)
```
- Gold Primary: #d4af37
- Gold Gradient: #d4af37 → #aa8a2e
- Panel Background: rgba(28, 31, 46, 0.8)
- Button Action: #2a2d3e
- Dark Background: #0a0e14
- Blue: #3182ce
- Red: #e53e3e
```

## Typography (current)
```
- Font Family: Roboto, "Helvetica Neue", sans-serif
- Default Size: 14px
- Weights: 500, 700, 900
```

## Component Props Improvements Needed

### Button
```typescript
interface ButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  ariaLabel?: string;
}
```

### PlayerAvatar
```typescript
interface PlayerAvatarProps {
  name: string;
  balance: string;
  flag: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  color: 'blue' | 'red' | 'purple';
  align?: 'left' | 'right';
  ariaLabel?: string;
}
```

## Migration Checklist

- [ ] Phase 1: Setup & Configuration
- [ ] Phase 2: Component Refactoring
  - [ ] Button
  - [ ] PlayerAvatar
  - [ ] Toggle
  - [ ] BasicLayout
  - [ ] GameBoard
  - [ ] Gameplay Page
- [ ] Phase 3: Image Optimization
- [ ] Phase 4: TypeScript Improvements
- [ ] Phase 5: Accessibility
- [ ] Phase 6: Responsiveness
- [ ] Phase 7: Testing & Verification

## Notes
- All SCSS modules will be removed
- Tailwind CSS will be the single source of truth for styling
- Lucide-React icons will remain unchanged
- Game logic and Three.js canvas will be preserved
- State management will remain local (no Context/Zustand needed yet)
