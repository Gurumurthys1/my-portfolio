# How to Add Your Character Image

## Step 1: Prepare Your Image

1. Get your character/profile image ready
2. Name it `hero-image.png` (or `.jpg`, `.webp`)
3. Recommended size: 500x500px or larger (square aspect ratio works best)

## Step 2: Add Image to Project

Place your image file in:
```
frontend/public/images/hero-image.png
```

The image will automatically appear on the home page!

## Alternative: Use a Different Image Name

If you want to use a different filename, update line 47 in `frontend/src/components/Hero.jsx`:

```jsx
src="/images/your-image-name.png"
```

## For About Section

Similarly, you can add an about-me image:
- Place image at: `frontend/public/images/about-image.png`
- It will be automatically used

## Tips

- Use PNG for images with transparency
- Use JPG for photographs
- Use WEBP for best compression
- Keep file size under 500KB for faster loading
