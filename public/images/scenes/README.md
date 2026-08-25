# Cinematic scroll scene images

The homepage scroll sequence (`src/components/CinematicScroll.tsx`) expects
five 16:9 images in this folder:

| File | Scene |
|---|---|
| `pitch.png` | Soccer pitch, golden hour |
| `park.png` | Calisthenics park |
| `gym.png` | Industrial gym |
| `hill.png` | Hill sprints at sunrise |
| `miami.png` | Miami penthouse at dusk |

Until these files exist, each scene falls back to the `gradient` defined in
`src/lib/scenes.ts`, so the section still looks deliberate rather than broken.

## Downloading the generated renders

These were generated with Higgsfield (`soul_2`, 2048×1152). Run from the
repo root:

```bash
cd public/images/scenes

curl -L -o pitch.png "https://d8j0ntlcm91z4.cloudfront.net/user_3BrcNyRFGEGZEEKLE2IPkapGU9e/hf_20260825_230807_b2c70ac5-3fea-426b-8bee-25fdbcfdff4b.png"
curl -L -o park.png  "https://d8j0ntlcm91z4.cloudfront.net/user_3BrcNyRFGEGZEEKLE2IPkapGU9e/hf_20260825_230807_b337ee05-fbf3-4a34-8c7b-5a8681004c7f.png"
curl -L -o gym.png   "https://d8j0ntlcm91z4.cloudfront.net/user_3BrcNyRFGEGZEEKLE2IPkapGU9e/hf_20260825_230807_55f9be0f-850b-4faa-ae64-888a737a67e6.png"
curl -L -o hill.png  "https://d8j0ntlcm91z4.cloudfront.net/user_3BrcNyRFGEGZEEKLE2IPkapGU9e/hf_20260825_230807_aaeec6bb-e1d8-4760-b55d-7084ac7794c5.png"
curl -L -o miami.png "https://d8j0ntlcm91z4.cloudfront.net/user_3BrcNyRFGEGZEEKLE2IPkapGU9e/hf_20260825_230807_dc0d1251-243b-4c90-bafa-e63dbc3a776b.png"
```

These CloudFront links are tied to the Higgsfield account that generated them
and may expire — download them sooner rather than later, or re-download from
the Higgsfield dashboard.

## Recommended: convert to WebP

Five full-screen PNGs is a lot of bytes. Converting roughly halves the page
weight with no visible quality loss:

```bash
# macOS/Linux with ImageMagick
for f in *.png; do magick "$f" -quality 82 "${f%.png}.webp"; done
```

Then update the `image` paths in `src/lib/scenes.ts` to `.webp`.

## Replacing with real photography

When you have real photos of yourself, just drop them in with these
filenames (or point `src/lib/scenes.ts` at new ones). Shoot or crop to 16:9,
and favour backlit / profile / from-behind framing — that's what the current
grade and text placement are composed around. Use the `focal` field per scene
to control how each image crops on mobile.
