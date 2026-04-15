# Name Detail Page - Design System & UX Flow

## Visual Layout Overview

### Desktop Layout (1024px+)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         STICKY HEADER (top: 0)                              │
│  [Logo] NameVerse                        [Bookmark] [Like] [Menu]           │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                       HERO SECTION                                           │
│                                                                              │
│               [islamic] [boy] [arabic]                                      │
│                          ALI                                                │
│                "The Exalted, The Noble"                                     │
│                                                                              │
│           ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐              │
│           │    7    │  │   FRI    │  │ RUBY    │  │    7     │              │
│           │Lucky #  │  │ Lucky Day│  │ Stone   │  │Life Path │              │
│           └─────────┘  └──────────┘  └─────────┘  └──────────┘              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│      [Overview] [Meaning] [Numerology] [Traits] [Cultural]  ← Sticky       │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────┐  ┌──────────────────────────────┐
│                                  │  │                              │
│   MAIN CONTENT (2/3 width)       │  │   SIDEBAR (1/3 width)        │
│   ┌────────────────────────────┐ │  │ ┌──────────────────────────┐ │
│   │                            │ │  │ │     SHARE CARD (sticky)   │ │
│   │  Selected Tab Content      │ │  │ │                          │ │
│   │  (Overview by default)     │ │  │ │ [Facebook] [Twitter]     │ │
│   │                            │ │  │ │ [WhatsApp] [Copy Link]   │ │
│   │  Lorem ipsum dolor sit...  │ │  │ │                          │ │
│   │                            │ │  │ └──────────────────────────┘ │
│   │  Fields display based on   │ │  │                              │
│   │  selected tab              │ │  │ ┌──────────────────────────┐ │
│   │  - Gradients               │ │  │ │  RELATED NAMES           │ │
│   │  - Cards                   │ │  │ │                          │ │
│   │  - Icons                   │ │  │ │ [→] Muhammad Ali         │ │
│   │  - Proper spacing          │ │  │     Noble, respected...   │ │
│   │                            │ │  │                          │ │
│   │  Scrolls naturally         │ │  │ [→] Aliyah               │ │
│   │                            │ │  │     Exalted one...      │ │
│   │                            │ │  │                          │ │
│   │                            │ │  │ View All Islamic Names → │ │
│   │                            │ │  │                          │ │
│   └────────────────────────────┘ │  │ └──────────────────────────┘ │
│                                  │  │                              │
│  [Scroll-to-top button ∧]        │  │                              │
│  (appears after 400px scroll)    │  │                              │
│                                  │  │                              │
└──────────────────────────────────┘  └──────────────────────────────┘
```

### Mobile Layout (< 1024px)

```
┌────────────────────────────────┐
│  [Logo]        [Bookmark][Like]│
│               [Menu ≡]         │
└────────────────────────────────┘

┌────────────────────────────────┐
│      HERO SECTION              │
│      (full width)              │
│                                │
│     [islamic][boy][arabic]     │
│            ALI                 │
│   "The Exalted, The Noble"     │
│                                │
│   [7] [FRI] [RUBY] [7]        │
└────────────────────────────────┘

┌────────────────────────────────┐
│ [Overview][Meaning][Numer...] │ ← Scrollable tabs
│                    (swipeable) │
└────────────────────────────────┘

┌────────────────────────────────┐
│  MAIN CONTENT (full width)     │
│                                │
│  Tab content here...           │
│  - Full width                  │
│  - Optimized spacing           │
│  - Touch-friendly buttons      │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  SHARE CARD                    │
│                                │
│ [Facebook] [Twitter]           │
│ [WhatsApp] [Copy]              │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  RELATED NAMES                 │
│                                │
│ → Muhammad Ali                 │
│ → Aliyah                       │
│ → Amir Ali                     │
│                                │
│ View All Islamic Names →       │
│                                │
└────────────────────────────────┘
```

---

## Color Palette

### Primary Colors
```
Indigo:   #4F46E5  (from-indigo-600)
Purple:   #9333EA  (to-purple-600)
Blue:     #3B82F6  (from-blue-600)
```

### Gradient Combinations
```
Hero Background:
  from-indigo-50 via-white to-purple-50 (soft gradient)

Buttons:
  from-indigo-600 to-purple-600 (bold gradient)

Cards:
  from-indigo-50 to-purple-50 (light background)
```

### Social Media Colors
```
Facebook:  #1F2937 / #3B82F6
Twitter:   #0EA5E9
WhatsApp:  #10B981
```

### Status Colors
```
Success:  #10B981 (green)
Error:    #EF4444 (red)
Warning:  #F59E0B (amber)
Info:     #3B82F6 (blue)
```

---

## Typography

### Font Sizes

| Element | Size | Weight | Example |
|---------|------|--------|---------|
| Name | 2.25rem-3.5rem (36-56px) | 900 (black) | "ALI" |
| Meaning | 1.25rem-1.5rem (20-24px) | 600 (semibold) | Quick summary text |
| Heading | 1.125rem (18px) | 600 (semibold) | "Meaning", "Traits" |
| Body | 1rem (16px) | 400 (regular) | Description text |
| Small | 0.875rem (14px) | 400 (regular) | Captions, helpers |
| Tiny | 0.75rem (12px) | 500 (medium) | Badge text |

### Font Family
```
Primary: System fonts (Inter-equivalent)
Fallback: sans-serif
```

---

## Spacing System

### Base Unit: 4px (Tailwind default)

```
px-4  = 16px   (padding horizontal)
py-3  = 12px   (padding vertical)
gap-2 = 8px    (gaps between items)
gap-4 = 16px   (larger gaps)
gap-8 = 32px   (section gaps)
```

### Common Margins
```
Hero Section:   py-12 sm:py-16 (48 / 64px)
Main Content:   py-8 (32px)
Card Padding:   p-6 (24px)
Button:         py-3 px-4 (12 x 16px)
```

---

## Component Examples

### Hero Section
```
Height:     ~300-400px (desktop) / ~400-500px (mobile)
Background: Gradient (indigo to purple)
Content:    Centered vertically & horizontally
Badges:     3-4 small rounded pills
Name:       Large text, dark color
Meaning:    Medium text, gray color
Stats:      4 cards in a row (responsive)
```

### Tab Navigation
```
Height:     48-56px (sticky)
Position:   Sticky (top: 73px, below header)
Tabs:       5 items, horizontal scroll
Active:     Indigo bottom border + text
Inactive:   Gray text, no border
Icons:      4px width, left-aligned with label
```

### Content Card
```
Background: White or gradient
Border:     1px gray-200
Padding:    p-6 (24px)
Rounded:    2xl (16px border-radius)
Shadow:     None / lg (hover)
Transition: All 0.2s ease
```

### Button Styles

#### Primary Button
```
bg-gradient-to-r from-indigo-600 to-purple-600
text-white
rounded-lg / rounded-xl
px-4 py-3 / px-6 py-3
hover:shadow-lg
transition-all
```

#### Secondary Button
```
bg-gray-100 / bg-gray-200
text-gray-700
rounded-lg
px-4 py-3
hover:bg-gray-300
transition-all
```

#### Outline Button
```
border-2 border-indigo-600
text-indigo-600
bg-transparent
rounded-lg
px-4 py-3
hover:bg-indigo-50
```

---

## Content Sections

### Overview Tab
```
┌─────────────────────────────────┐
│ Quick Summary                   │
│ ─────────────────────────────── |
│ Lorem ipsum dolor sit...        │
│ (Short meaning highlighted)     │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Key Information Grid (2 cols)   │
│                                 │
│ ┌──────────┐  ┌──────────┐     │
│ │ Origin   │  │ Religion │     │
│ │ Arabic   │  │ Islamic  │     │
│ └──────────┘  └──────────┘     │
│                                 │
│ ┌──────────┐  ┌──────────┐     │
│ │ Gender   │  │ Category │     │
│ │ Male     │  │ [3 tags] │     │
│ └──────────┘  └──────────┘     │
└─────────────────────────────────┘
```

### Meaning Tab
```
┌─────────────────────────────────┐
│ Full Meaning                    │
│                                 │
│ [Long text content...]          │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Spiritual Meaning               │
│                                 │
│ [Spiritual text content...]     │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ In Other Languages              │
│                                 │
│ ┌─────────────┐  ┌────────────┐ │
│ │ Arabic      │  │ Urdu       │ │
│ │ علي          │  │ علی        │ │
│ │ Meaning...  │  │ Meaning... │ │
│ └─────────────┘  └────────────┘ │
│                                 │
│ ┌──────────────────────────────┐ │
│ │ Hindi                        │ │
│ │ अली                          │ │
│ │ Meaning...                   │ │
│ └──────────────────────────────┘ │
└─────────────────────────────────┘
```

### Numerology Tab
```
┌───────────────┐  ┌───────────────┐
│ Lucky Number  │  │ Life Path #   │
│                 │  │               │
│        7      │  │        7       │
│                 │  │               │
│ (Gradient bg)  │  │ (Gradient bg) │
└───────────────┘  └───────────────┘

┌───────────────┐  ┌───────────────┐
│ Lucky Day     │  │ Lucky Stone   │
│ Friday        │  │ Ruby          │
└───────────────┘  └───────────────┘

┌─────────────────────────────────┐
│ Lucky Colors                    │
│                                 │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐   │
│ │Red │ │Grn │ │Blu │ │Gold│   │
│ └────┘ └────┘ └────┘ └────┘   │
│  Red   Green  Blue   Gold      │
└─────────────────────────────────┘
```

### Traits Tab
```
┌─────────────────────────────────┐
│ Personality Traits              │
│                                 │
│ ┌──────────────┐ ┌────────────┐ │
│ │ 💭 Brave     │ │ 💭 Wise    │ │
│ └──────────────┘ └────────────┘ │
│                                 │
│ ┌──────────────┐ ┌────────────┐ │
│ │ 💭 Noble     │ │ 💭 Strong  │ │
│ └──────────────┘ └────────────┘ │
└─────────────────────────────────┘
```

### Cultural Tab
```
┌─────────────────────────────────┐
│ Famous People                   │
│                                 │
│ ⭐ Ali ibn Abi Talib           │
│ ⭐ Muhammad Ali                 │
│ ⭐ Ali (Prince of Persia)       │
│                                 │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Historical References           │
│                                 │
│ ├─ Ali ibn Abi Talib           │
│ │  7th century • Islamic History│
│                                 │
│ └─ Prophet Muhammad's cousin   │
│    Known for courage            │
└─────────────────────────────────┘
```

---

## Interactions & Animations

### Hover Effects

#### Card Hover
```css
transition: all 0.2s ease;
/* On hover */
shadow: 0 10px 25px rgba(0,0,0,0.1);
transform: translateY(-2px);
```

#### Button Hover
```css
transition: all 0.2s ease;
/* On hover */
.shadow-lg{ }
opacity: 0.9
```

#### Link/Tab Hover
```css
transition: color 0.2s ease;
color: from-indigo to-purple
text-decoration: underline (optional)
```

### Transitions

#### Tab Switch
```css
opacity: 0.5 → 1 (fade in)
transition: opacity 0.3s ease;
```

#### Scroll to Top
```css
animation: slideUp 0.3s ease;
opacity: 0 → 1
translateY: 20px → 0px
```

#### Mobile Menu
```css
animation: slideIn 0.2s ease;
from: translateX(100%) opacity(0)
to: translateX(0) opacity(1)
```

---

## Responsive Breakpoints

### Tailwind Breakpoints
```
sm:  640px   (< 640px: base styles)
md:  768px   
lg:  1024px  (≥1024px: desktop layout)
xl:  1280px
2xl: 1536px
```

### Layout Changes

#### < 640px (Mobile)
- Hero: 2xl text size (instead of 3xl)
- Stats: 2 per row (instead of 4)
- Layout: Full width content
- Sidebar: Below content
- Tabs: Scrollable horizontally

#### 640px - 1024px (Tablet)
- Hero: 3xl text size
- Stats: 3 per row
- Layout: Adapts
- Tabs: All visible

#### > 1024px (Desktop)
- Hero: Full 3xl+ size
- Stats: 4 per row
- Layout: 2/3 + 1/3 sidebar
- Tabs: All visible, sticky

---

## Accessibility

### ARIA Labels
```html
<button aria-label="Bookmark this name">
  <Bookmark />
</button>

<div role="navigation" aria-label="Name details">
  {tabs}
</div>

<div role="status" aria-live="polite">
  {loadingMessage}
</div>
```

### Keyboard Navigation
- Tab: Move through interactive elements
- Enter/Space: Activate buttons
- Arrow keys: Tab navigation (optional)

### Color Contrast
- Text: WCAG AA compliant (4.5:1 minimum)
- Interactive: Clear focus indicators

---

## Animation Timings

```javascript
Fade:         300ms ease
Slide:        300ms ease-out
Bounce:       500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)
Hover:        200ms ease
Transition:   150ms ease
```

---

## Dark Mode Support (Future)

```javascript
// Can be added to components
className={`
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-white
  border-gray-200 dark:border-gray-800
`}
```

---

## Performance Optimizations (Built-In)

- CSS Grid/Flexbox (no floats)
- will-change for animations
- Lazy loading for images
- Hardware acceleration for transforms
- requestAnimationFrame for smooth animations

---

**Design Version:** 1.0  
**Last Updated:** April 2025  
**Tailwind CSS:** v3+
