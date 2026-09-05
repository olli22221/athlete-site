# Media

The homepage looks for these. While they are missing the hero falls back to a
marked placeholder frame — it never renders a broken video or an empty box.

| File | Used for | Notes |
|---|---|---|
| `hero.mp4` | The full-screen opener | 8–15 s, silent, loops seamlessly. Shoot or crop it **vertical-safe**: the centre third has to work on a phone. |
| `hero-poster.jpg` | First paint + the fallback when a browser will not autoplay | Same framing as the first video frame, or the video looks like it jumps. |
| `feature.mp4` | The scroll section below the hero | Longer, 15–30 s. A race or a session, not a talking head. |

Then point `siteConfig.media` at them in `src/lib/site-config.ts`:

```ts
media: {
  heroVideo: "/media/hero.mp4",
  heroPoster: "/media/hero-poster.jpg",
  featureVideo: "/media/feature.mp4",
},
```

## Keep them small

A hero video is the first thing every visitor downloads. Aim for **under 4 MB**;
past that, phones on mobile data see a poster image for several seconds.

```bash
ffmpeg -i source.mov -t 12 -an \
  -vf "scale=1920:-2" -c:v libx264 -crf 30 -preset slow -movflags +faststart \
  hero.mp4

ffmpeg -i hero.mp4 -frames:v 1 -q:v 3 hero-poster.jpg
```

`-an` strips the audio track: the hero is muted anyway, so the bytes are waste.
`+faststart` moves the index to the front so playback can begin before the file
has finished downloading.
