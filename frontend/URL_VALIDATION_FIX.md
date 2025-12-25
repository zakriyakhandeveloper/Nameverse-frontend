# URL Validation & Sanitization Fix

## Problem
URLs with invalid slug patterns like `/names/islamic/-zakiya` (leading hyphens) were causing errors and not being handled properly.

## Solution Implemented

### 1. **Slug Validation Utility** (`src/lib/utils/slugValidation.js`)
Created comprehensive slug validation and sanitization functions:

- `sanitizeSlug(slug)` - Removes leading/trailing hyphens and underscores
- `isValidSlug(slug)` - Validates slug format (only a-z, 0-9, single hyphens/underscores)
- `validateAndSanitizeSlug(slug)` - Combined validation and sanitization
- `isSingleLetter(slug)` - Checks if slug is a single letter (for letter pages)

**Rules:**
- ✅ Valid: `zakiya`, `muhammad-ali`, `name_123`
- ❌ Invalid: `-zakiya`, `name--test`, `name_`, `name@123`, `--test--`

### 2. **Individual Name Page** (`src/app/names/[religion]/[slug]/page.jsx`)
Added validation in both `generateMetadata` and page component:

```javascript
const sanitizedSlug = validateAndSanitizeSlug(slug);
if (!sanitizedSlug) {
  return notFound(); // Returns 404
}
```

**Handles:**
- Sanitizes valid slugs with minor issues (removes leading/trailing hyphens)
- Returns 404 for completely invalid slugs
- Uses sanitized slug for all API calls and canonical URLs

### 3. **Letter Pages** (`src/app/names/[religion]/letter/[letter]/page.jsx`)
Added letter validation:

```javascript
if (!letter || !/^[a-zA-Z]$/.test(letter)) {
  return notFound();
}
```

**Ensures:**
- Letter must be a single alphabetic character (A-Z)
- Rejects numbers, special characters, or multiple characters

### 4. **Global Middleware** (`middleware.js`)
Created middleware for URL sanitization and redirection:

**Features:**
- Automatically redirects invalid slugs to sanitized versions (301 redirect)
- Normalizes letter case in letter page URLs
- Removes trailing slashes
- Passes truly invalid URLs to page handlers for 404

**Examples:**
- `/names/islamic/-zakiya` → **301 redirect** → `/names/islamic/zakiya`
- `/names/islamic/name--test` → **404** (invalid pattern)
- `/names/islamic/zakiya_` → **301 redirect** → `/names/islamic/zakiya`
- `/names/islamic/letter/A` → **301 redirect** → `/names/islamic/letter/a`

## Test Cases

### ✅ Valid URLs (Allowed)
```
✓ /names/islamic/zakiya
✓ /names/islamic/muhammad-ali
✓ /names/christian/john_paul
✓ /names/hindu/krishna123
✓ /names/islamic/letter/a
✓ /names/islamic/letter/z
```

### 🔄 Sanitizable URLs (Auto-Redirected)
```
/names/islamic/-zakiya        → 301 → /names/islamic/zakiya
/names/islamic/name_          → 301 → /names/islamic/name
/names/islamic/_name          → 301 → /names/islamic/name
/names/islamic/--name--       → 404 (invalid even after sanitization)
/names/islamic/letter/A       → 301 → /names/islamic/letter/a
```

### ❌ Invalid URLs (404 Error)
```
✗ /names/islamic/name--test   (multiple consecutive hyphens)
✗ /names/islamic/name@123     (special characters)
✗ /names/islamic/---          (only hyphens)
✗ /names/islamic/letter/ab    (multiple letters)
✗ /names/islamic/letter/1     (number)
✗ /names/islamic/letter/@     (special character)
```

## How to Test

### Manual Testing:
1. Try accessing: `https://nameverse.vercel.app/names/islamic/-zakiya`
   - Should redirect to: `https://nameverse.vercel.app/names/islamic/zakiya`

2. Try accessing: `https://nameverse.vercel.app/names/islamic/name--test`
   - Should show 404 page

3. Try accessing: `https://nameverse.vercel.app/names/islamic/letter/A`
   - Should redirect to: `https://nameverse.vercel.app/names/islamic/letter/a`

### Automated Testing:
```bash
# Test valid URLs
curl -I https://nameverse.vercel.app/names/islamic/zakiya
# Expected: 200 OK

# Test sanitizable URLs
curl -I https://nameverse.vercel.app/names/islamic/-zakiya
# Expected: 301 Redirect to /names/islamic/zakiya

# Test invalid URLs
curl -I https://nameverse.vercel.app/names/islamic/name--test
# Expected: 404 Not Found
```

## SEO Benefits

1. **Clean URLs**: Automatically redirects to clean, SEO-friendly URLs
2. **404 for Invalid**: Properly returns 404 for genuinely invalid URLs
3. **Canonical URLs**: All metadata uses sanitized slugs
4. **No Duplicate Content**: 301 redirects prevent duplicate content issues
5. **Robots Meta**: Invalid pages have `robots: { index: false, follow: false }`

## Files Modified/Created

### Created:
- ✅ `src/lib/utils/slugValidation.js` - Validation utility
- ✅ `middleware.js` - Global URL sanitization middleware
- ✅ `URL_VALIDATION_FIX.md` - This documentation

### Modified:
- ✅ `src/app/names/[religion]/[slug]/page.jsx` - Added slug validation
- ✅ `src/app/names/[religion]/letter/[letter]/page.jsx` - Added letter validation

## Deployment

After deploying these changes:
1. All invalid URLs will be handled properly
2. Sanitizable URLs will redirect to clean versions
3. Truly invalid URLs will return 404
4. No more errors for URLs like `/names/islamic/-zakiya`

## Maintenance

To add validation to other dynamic routes in the future:
1. Import validation functions from `@/lib/utils/slugValidation`
2. Validate params before using them
3. Return `notFound()` for invalid params
4. Use sanitized values for API calls and URLs
