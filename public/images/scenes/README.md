# Cinematic scroll scene images

These five 16:9 images drive the homepage scroll sequence
(`src/components/CinematicScroll.tsx`).

| File | Scene |
|---|---|
| `box.webp` | The box — rig, barbells, morning light |
| `sled.webp` | Hyrox sled push |
| `class.webp` | Group class, wall balls in unison |
| `engine.webp` | Ski ergs / rowing conditioning |
| `race.webp` | Race day finish |

If a file is missing, that scene falls back to the `gradient` defined in
`src/lib/scenes.ts`, so the section still looks deliberate rather than broken.

## Downloading the generated renders

Generated with [Higgsfield](https://higgsfield.ai) using `soul_2` at
2048×1152. Run from the repo root:

```bash
cd public/images/scenes
B=https://d8j0ntlcm91z4.cloudfront.net/user_3BrcNyRFGEGZEEKLE2IPkapGU9e

curl -L -o box.png   "$B/hf_20260829_133421_b8f20b3b-b8ab-4d08-8dd2-dd15197233fc.png"
curl -L -o sled.png  "$B/hf_20260829_133421_1fd7e06c-7bd1-4ee5-ae26-d1bd4ae6bfcb.png"
curl -L -o class.png "$B/hf_20260829_133540_4646c238-91a8-4bd3-9d04-a7531bb46c5a.png"
curl -L -o engine.png "$B/hf_20260829_133421_c99af26b-f730-4f2e-be1d-a686b3bbb1b5.png"
curl -L -o race.png  "$B/hf_20260829_133421_2f13f4b3-5315-4b0f-8131-6f927abfb440.png"
```

These CloudFront links are tied to the Higgsfield account that generated them
and may expire — download them sooner rather than later.

## Then convert to WebP (important)

Five full-screen PNGs is ~15 MB and will wreck mobile load times. Converting
drops that to well under 1 MB with no visible loss:

```bash
# macOS/Linux with ImageMagick
for f in *.png; do magick "$f" -quality 82 "${f%.png}.webp"; done
rm *.png
```

`src/lib/scenes.ts` already points at the `.webp` filenames.

## Prompt technique

Two things hold the sequence together, worth preserving if you regenerate:

1. **A grade string** — the same lens/light/colour sentence ("35mm anamorphic,
   warm key light against cool shadow, teal and orange colour grade, deep
   crushed shadows, volumetric haze, film grain…"), repeated verbatim in all
   five prompts.
2. **Scene variety over hero framing** — these are gym scenes, not portraits of
   one person, so the sequence sells the room and the community rather than an
   individual. That is deliberate for a gym brand.

## Replacing with real photography

Drop replacements in with the same filenames, or point `src/lib/scenes.ts` at
new ones. Shoot or crop to 16:9. Use each scene's `focal` field to control how
the image crops on narrow mobile viewports.

Real photos of your actual gym and members will always outperform generated
imagery here — treat these as a placeholder that lets you launch.
