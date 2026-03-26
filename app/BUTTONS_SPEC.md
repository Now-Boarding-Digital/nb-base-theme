# Buttons Specification — Now Boarding Design System Kit

Canonical reference for all button-related components, their sizes, styles, states, and variations.

---

## 1. Buttons (Primary action buttons)

Text + optional icon. Rectangular with rounded corners.

### Sizes

| Size   | Height | Min width | Padding      | Radius | Font |
|--------|--------|-----------|--------------|--------|------|
| Large  | 56px   | 128px     | 16px 32px    | 12px   | 16px |
| Medium | 40px   | 64px      | 10px 24px    | 8px    | 14px |
| Small  | 32px   | 64px      | 8px 16px     | 6px    | 12px |

### Styles (visual variants)

| Style  | Background | Text      | Border   | Use case          |
|--------|-------------|-----------|----------|-------------------|
| Solid  | #006fff     | White     | #006fff  | Primary actions   |
| White  | White       | #0c65d9   | None     | Dark backgrounds  |
| Outline| Transparent | #006fff   | #006fff  | Secondary actions |

### Icon positions

| Value | Description        |
|-------|--------------------|
| none  | Text only          |
| left  | Icon before text   |
| right | Icon after text    |

### States

| State   | Behavior                          |
|---------|-----------------------------------|
| Default | Resting state                     |
| Hover   | Darker background / visual feedback |
| Disabled| 50% opacity, no pointer           |
| Loading | Spinner replaces text             |

---

## 2. Links (Text links)

Inline text links. No background by default.

### Sizes

| Size   | Font | Line height |
|--------|------|-------------|
| Large  | 16px | 24px        |
| Medium | 14px | 20px        |
| Small  | 12px | 16px        |

### Variations

| Variation | Values      | Description              |
|-----------|-------------|--------------------------|
| Icon      | none, left, right | Plus icon before/after text |
| Weight    | bold, regular     | Font weight              |

### States

| State   | Behavior                    |
|---------|-----------------------------|
| Default | Blue text (#0c65d9)         |
| Hover   | Underline, darker blue      |
| Disabled| 50% opacity, no pointer     |

---

## 3. Icon Buttons (Circular with plus icon)

Circular buttons with a plus (+) icon in the center. All variations use the same icon; the circle (background, border) and size change.

### Sizes

| Size   | Dimensions |
|--------|------------|
| Large  | 40×40px    |
| Medium | 32×32px    |
| Small  | 24×24px    |

*Figma also has XSmall (16×16) — not yet implemented.*

### Styles

| Style      | Background | Icon color | Use case              |
|------------|------------|------------|------------------------|
| Solid      | #006fff    | White      | Primary icon actions   |
| Outline    | Transparent| #006fff    | Secondary, bordered   |
| Transparent| Transparent| #006fff    | Tertiary, minimal      |
| White      | White      | #006fff    | Dark backgrounds       |

### States

| State   | Behavior                    |
|---------|-----------------------------|
| Default | Resting                    |
| Hover   | Darker / tinted background  |
| Disabled| 50% opacity                 |

*Figma has Active (pressed) — not yet implemented.*

---

## 4. Stacked Buttons (Full-width vertical)

Full-width buttons for vertical layouts (e.g. mobile, forms).

### Dimensions

- Width: 100% (min 64px)
- Height: 56px
- Radius: 12px

### Styles

| Style        | Background | Text      | Border   | Use case              |
|--------------|------------|-----------|----------|------------------------|
| Solid        | #006fff    | White     | #006fff  | Primary CTA            |
| Outline Grey | Transparent| #374151   | #d1d5db  | Secondary, neutral     |
| Grey         | #f3f4f6    | #374151   | #f3f4f6  | Tertiary, subtle       |
| Transparent  | Transparent| #006fff   | None     | Ghost, minimal         |
| White        | White      | #0c65d9   | White    | Dark backgrounds       |

### States

| State   | Behavior                    |
|---------|-----------------------------|
| Default | Resting                    |
| Hover   | Darker / tinted background  |
| Disabled| 50% opacity                 |

---

## 5. Login Buttons (Social / auth)

Wide buttons for authentication flows.

### Dimensions

- Width: 100% (max 398px, min 280px)
- Height: 56px
- Radius: 12px

### Types (providers)

| Provider | Label               | Icon style        |
|----------|---------------------|-------------------|
| google   | Continue with Google| Google logo       |
| apple    | Continue with Apple | Apple logo        |
| facebook | Continue with Facebook | Facebook logo  |
| default  | Continue with Email | Email icon        |

### States

| State   | Behavior                    |
|---------|-----------------------------|
| Default | Resting                    |
| Hover   | Slightly darker background  |
| Disabled| 50% opacity                 |

---

## 6. Dropdown Buttons (Select triggers)

Buttons that open dropdowns. Label + chevron.

### Sizes

| Size   | Height | Min width (default) | Icon-only size |
|--------|--------|---------------------|----------------|
| Large  | 40px   | 180px               | 40×40px        |
| Small  | 32px   | 160px               | 32×32px        |

### Variants

| Variant   | Description                    |
|-----------|--------------------------------|
| default   | Label + chevron                |
| icon-only| Chevron only (square)          |

### States

| State   | Behavior                          |
|---------|-----------------------------------|
| Default | Grey border, white background    |
| Hover   | Light grey background            |
| Filled  | Grey background, blue border     |
| Open    | Chevron rotated, blue border     |
| Disabled| 50% opacity                      |

---

## Summary matrix

| Component       | Sizes              | Styles/Types                    | States                    |
|-----------------|--------------------|---------------------------------|---------------------------|
| Button          | L, M, S            | Solid, White, Outline           | Default, Hover, Disabled, Loading |
| Link            | L, M, S            | Bold, Regular                    | Default, Hover, Disabled  |
| Icon Button     | L, M, S            | Solid, Outline, Transparent, White (circle + plus) | Default, Hover, Disabled |
| Stacked Button  | — (fixed)          | Solid, Outline Grey, Grey, Transparent, White | Default, Hover, Disabled |
| Login Button    | — (fixed)          | Google, Apple, Facebook, Default | Default, Hover, Disabled |
| Dropdown Button | L, S               | Default, Icon-only               | Default, Hover, Filled, Open, Disabled |
