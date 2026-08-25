# Cinematic scroll scene images

These five 16:9 images drive the homepage scroll sequence
(`src/components/CinematicScroll.tsx`).

| File | Scene |
|---|---|
| `pitch.webp` | Soccer pitch, golden hour |
| `park.webp` | Calisthenics park |
| `gym.webp` | Industrial gym |
| `hill.webp` | Hill sprints at sunrise |
| `miami.webp` | Miami penthouse at dusk |

If a file is missing, that scene falls back to the `gradient` defined in
`src/lib/scenes.ts`, so the section still looks deliberate rather than broken.

## How these were made

Generated with [Higgsfield](https://higgsfield.ai) using `soul_2` at
2048×1152, then converted to WebP at quality 82 (14.8 MB of PNG → 732 KB, a
95% saving with no visible loss at full-screen size).

Two prompt techniques hold the sequence together, both worth preserving if you
regenerate:

1. **A character bible** — the same physical description of the athlete,
   repeated verbatim in all five prompts.
2. **A grade string** — the same lens/light/color-grade sentence
   ("35mm anamorphic, warm golden hour backlight, teal and orange color grade,
   deep crushed shadows, film grain…"), also repeated verbatim.

Framing is deliberately backlit, in profile, or from behind, so the face is
never the hero. That is standard sports-photography language, it keeps a
generated person consistent across scenes, and it means swapping in real
photos later won't read as a different person appearing.

## Replacing with real photography

Drop replacements in with the same filenames, or point `src/lib/scenes.ts` at
new ones. Shoot or crop to 16:9 and match the framing note above. Use each
scene's `focal` field to control how the image crops on narrow mobile
viewports.

To re-convert new images to WebP:

```bash
# macOS/Linux with ImageMagick
for f in *.png *.jpg; do magick "$f" -quality 82 "${f%.*}.webp"; done
```
