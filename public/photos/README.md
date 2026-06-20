# Photos

Drop your image files in this folder and reference them from
`src/data/tour.ts` as `/photos/your-file.jpg`.

For example, a file saved here as `rome.jpg` is referenced like:

```ts
photos: [{ src: "/photos/rome.jpg", caption: "The Colosseum at dawn." }]
```

If a referenced photo is missing, the app just hides it gracefully, so you can
wire up places first and add images later. `placeholder.svg` is the fallback
art and can be left as-is.
