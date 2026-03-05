# Image Assets

Organized image storage for the job tracker application.

## Directory Structure

```
public/images/
├── logos/        # Company logos, app logo
├── icons/        # UI icons, status icons
├── avatars/      # User avatars, profile pictures
└── screenshots/  # Design references, mockups
```

## Usage in Components

### Option 1: Next.js Image Component (Recommended)
```tsx
import Image from 'next/image'

<Image
  src="/images/logos/company-logo.png"
  alt="Company Logo"
  width={200}
  height={100}
  priority // Use for above-the-fold images
/>
```

### Option 2: Regular img tag (for simple cases)
```tsx
<img src="/images/icons/check.svg" alt="Check icon" />
```

## Best Practices

- ✅ Use WebP format for photos (better compression)
- ✅ Use SVG for icons and logos (scalable)
- ✅ Optimize images before adding (use tools like ImageOptim, Squoosh)
- ✅ Use descriptive filenames: `google-logo.svg` not `img1.svg`
- ✅ Keep file sizes small (< 200KB for most images)
- ✅ Use Next.js Image component for automatic optimization

## User-Uploaded Images

For user uploads (avatars, company logos from users):
- Use Supabase Storage (already configured)
- Don't store in `public/` (not version controlled for uploads)
- Store URLs in database, files in Supabase Storage bucket
