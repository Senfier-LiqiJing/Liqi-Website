Subject: Final UI Polish: Fix Readability & Enhance Section Titles

Context:
We have implemented glassmorphism cards with golden borders on a dynamic blue background. However, we need to address two critical visual issues: poor text readability due to low contrast, and plain section titles that don't match the premium aesthetic.

New Requirements & Implementation Details:

1. FIX: Readability on Glass Cards (Crucial)

Problem: The current glass effect is too transparent. The light blue background bleeds through too much, making regular-weight text (like course lists) difficult to read.

Solution: Increase the opacity of the white background layer of the cards.

CSS Requirement: Update the card's background style. Instead of a low opacity (like 0.2), use a higher opacity to create a "frostier" look that provides better contrast for the text.

Change to: background: rgba(255, 255, 255, 0.65); (adjust between 0.6 and 0.7 until readable).

Keep: backdrop-filter: blur(12px);

2. ENHANCE: Section Titles ("Academic History" & "Publications")

Problem: The current titles look plain and disconnected from the golden card design.

Solution: Apply a Golden Gradient Text Effect to the main section titles so they match the card borders.

CSS Requirement for H1/H2 titles:

Font: Use Inter or Poppins.

Weight: 800 (Extra Bold) (The gradient needs thick strokes to be visible).

Size: Increase size significantly (e.g., 2.5rem or 3rem).

Effect: Apply a golden linear gradient to the text itself.

Reference CSS snippet for title:

CSS
background: linear-gradient(to right, #C5A059, #FFD700, #FDB931, #C5A059);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
display: inline-block; /* Important for the clip to work nicely */
(Note: Keep the emoji icons if desired, but ensure they are separate elements so they don't get the golden text effect applied to them.)

Summary of Visual Goals:

Cards: Whiter, sharper, easier to read text on top, while still looking like glass.

Titles: Big, bold, and shining with a golden gradient texture.