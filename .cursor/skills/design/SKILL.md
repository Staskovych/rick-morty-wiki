---
name: design
description: Visual design system for Rick & Morty Wiki — colors, typography, component styles, Tailwind classes. Use when creating or styling any UI component.
---

# Design System — Rick & Morty Wiki

## Color Palette

- Primary: `#0b5ed7` (blue) — buttons, borders, accents, active links
- Background: `#ffffff` (white) — page background
- Text primary: `#212529` (dark) — headings, body text
- Text secondary: `#6c757d` (gray) — labels, secondary info

## Status Badge Colors

- Alive: `bg-green-500` text-white
- Dead: `bg-red-500` text-white
- Unknown: `bg-gray-500` text-white

## Navbar

- White background, bottom border
- Logo left: "Rick & Morty" dark + "WiKi" in primary blue, font-bold text-2xl
- Nav links right: Characters, Episode, Location
- Active link: primary blue color + underline border-bottom

## Character Card

- White background
- Border: 2px solid #0b5ed7, border-radius: 8px
- Image: full width, top of card, rounded top corners
- Status badge: absolute top-right corner
- Content padding: 12px
- Name: font-bold text-lg
- Last Location: label gray text-sm + value dark text-base

## Search Bar

- Centered, full section width
- Input: 60% width, border 2px solid #0b5ed7, rounded-lg, padding 10px 15px
- Button: primary blue background, white text, rounded-lg

## Filters Sidebar

- Left column, ~25% width
- Title "Filters" bold centered
- "Clear Filters" link in primary blue
- Accordion sections: Status, Species, Gender
- Filter buttons: outlined primary blue, toggle active state filled blue

## Typography

- Font: system default (sans-serif)
- Page title: text-3xl font-bold text-center
- Section labels: text-sm text-gray-500
- Card name: text-lg font-bold

## Layout

- Max width: 1200px, centered, horizontal padding 16px
- Characters grid: 3 columns desktop, 2 tablet, 1 mobile
- Filters + Grid: sidebar left 25%, content right 75%
