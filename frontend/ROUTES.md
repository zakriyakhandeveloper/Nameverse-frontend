# Nameverse API Routes Documentation

**Base URL:** `https://namverse-api.vercel.app`

**Version:** 1.0.0

**Rate Limiting:**
- 50 requests per day per IP address
- Unlimited for `nameverse.vercel.app` domain

---

## 📋 Table of Contents

1. [Root & Health](#root--health)
2. [API v1 Endpoints](#api-v1-endpoints)
3. [Legacy Endpoints](#legacy-endpoints)
4. [Error Responses](#error-responses)
5. [Testing](#testing)

---

## Root & Health

### GET `/`
**Welcome endpoint with API documentation**

**Response:**
```json
{
  "success": true,
  "name": "Nameverse API",
  "version": "1.0.0",
  "description": "World's best name meaning and story API with authentic research-backed data",
  "documentation": {
    "health": "GET /health",
    "warmup": "GET /warmup",
    "endpoints": [
      "GET /api/v1/names?religion=islamic&page=1&limit=50",
      "GET /api/v1/names/:religion/:slug",
      "GET /api/v1/filters/:religion",
      "GET /api/v1/search?q=search_term",
      "GET /api/religion/:religion",
      "GET /api/religion/:religion/filters",
      "GET /api/names/:religion/:slug"
    ]
  },
  "rateLimit": "50 requests per day per IP (unlimited for nameverse.vercel.app)"
}
```

**Example:**
```bash
curl https://namverse-api.vercel.app/
```

---

### GET `/health`
**Server health check**

**Response:**
```json
{
  "status": "healthy",
  "database": "connected",
  "time": "2025-12-10T09:30:00.000Z"
}
```

**Status Codes:**
- `200` - Server is healthy
- `503` - Server is unhealthy

**Example:**
```bash
curl https://namverse-api.vercel.app/health
```

---

### GET `/warmup`
**Warm up serverless function and database connection**

**Response:**
```json
{
  "status": "warm",
  "totalMs": 234
}
```

**Example:**
```bash
curl https://namverse-api.vercel.app/warmup
```

---

## API v1 Endpoints

### GET `/api/v1/names`
**Fetch names with pagination and filtering**

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `religion` | string | Yes | - | Religion: `islamic`, `christian`, `hindu` |
| `page` | number | No | 1 | Page number |
| `limit` | number | No | 50 | Items per page (max 100) |
| `gender` | string | No | - | Filter by gender: `male`, `female` |
| `origin` | string | No | - | Filter by origin (e.g., `Arabic`, `Hebrew`) |
| `startsWith` | string | No | - | Filter by starting letter (A-Z) |
| `search` | string | No | - | Search in name and meaning |
| `sort` | string | No | `asc` | Sort order: `asc`, `desc` |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Ahmad",
      "slug": "ahmad",
      "gender": "male",
      "origin": "Arabic",
      "short_meaning": "Highly praised",
      "meaning": "...",
      "pronunciation": "AH-mad"
    }
  ],
  "pagination": {
    "total": 5000,
    "page": 1,
    "limit": 50,
    "totalPages": 100
  }
}
```

**Examples:**
```bash
# Basic usage
curl "https://namverse-api.vercel.app/api/v1/names?religion=islamic"

# With filters
curl "https://namverse-api.vercel.app/api/v1/names?religion=islamic&gender=male&limit=10"

# With search
curl "https://namverse-api.vercel.app/api/v1/names?religion=islamic&search=ali"

# Starting with letter
curl "https://namverse-api.vercel.app/api/v1/names?religion=islamic&startsWith=A&limit=20"

# Pagination
curl "https://namverse-api.vercel.app/api/v1/names?religion=islamic&page=2&limit=50"
```

**Cache:** 5 minutes

---

### GET `/api/v1/names/:religion/:slug`
**Get single name details**

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `religion` | string | Yes | Religion: `islamic`, `christian`, `hindu` |
| `slug` | string | Yes | Name slug (lowercase, hyphenated) |

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Ahmad",
    "slug": "ahmad",
    "gender": "male",
    "origin": "Arabic",
    "short_meaning": "Highly praised",
    "meaning": "Detailed meaning of the name Ahmad...",
    "pronunciation": "AH-mad",
    "variations": ["Ahmed", "Ahmet"],
    "famous_people": ["Ahmad ibn Hanbal", "Ahmed Shah"]
  }
}
```

**Examples:**
```bash
curl "https://namverse-api.vercel.app/api/v1/names/islamic/ahmad"
curl "https://namverse-api.vercel.app/api/v1/names/christian/john"
curl "https://namverse-api.vercel.app/api/v1/names/hindu/arjun"
```

**Cache:** 1 hour

**Error Response (404):**
```json
{
  "success": false,
  "error": "Name not found"
}
```

---

### GET `/api/v1/filters/:religion`
**Get available filters for a religion**

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `religion` | string | Yes | Religion: `islamic`, `christian`, `hindu` |

**Response:**
```json
{
  "success": true,
  "totalNames": 5000,
  "filters": {
    "genders": ["male", "female"],
    "origins": ["Arabic", "Hebrew", "Persian", "Turkish"],
    "letters": ["A", "B", "C", "D", "E", "F", "G", ...]
  }
}
```

**Examples:**
```bash
curl "https://namverse-api.vercel.app/api/v1/filters/islamic"
curl "https://namverse-api.vercel.app/api/v1/filters/christian"
curl "https://namverse-api.vercel.app/api/v1/filters/hindu"
```

**Cache:** 1 hour

---

### GET `/api/v1/search`
**Search names across religions**

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `q` | string | Yes | - | Search query (min 2 characters) |
| `religion` | string | No | - | Filter by religion |
| `limit` | number | No | 20 | Results limit (max 100) |

**Response:**
```json
{
  "success": true,
  "query": "ali",
  "count": 50,
  "data": [
    {
      "_id": "...",
      "name": "Ali",
      "slug": "ali",
      "gender": "male",
      "origin": "Arabic",
      "short_meaning": "Noble, elevated",
      "religion": "islamic"
    }
  ]
}
```

**Examples:**
```bash
# Search all religions
curl "https://namverse-api.vercel.app/api/v1/search?q=ali"

# Search specific religion
curl "https://namverse-api.vercel.app/api/v1/search?q=ali&religion=islamic"

# Limit results
curl "https://namverse-api.vercel.app/api/v1/search?q=john&limit=5"
```

**Cache:** 1 minute

**Error Response (400):**
```json
{
  "success": false,
  "error": "Query must be 2+ chars"
}
```

---

## Legacy Endpoints

### GET `/api/religion/:religion`
**Legacy endpoint for fetching names**

⚠️ **Deprecated:** Use `/api/v1/names` instead

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `religion` | string | Yes | Religion: `islamic`, `christian`, `hindu` |

**Query Parameters:**
Same as `/api/v1/names`

**Response:**
```json
{
  "success": true,
  "source": "database",
  "religion": "islamic",
  "count": 50,
  "pagination": {
    "page": 1,
    "limit": 50,
    "totalCount": 5000,
    "totalPages": 100,
    "hasMore": true
  },
  "data": [...]
}
```

**Example:**
```bash
curl "https://namverse-api.vercel.app/api/religion/islamic?page=1&limit=20"
```

---

### GET `/api/religion/:religion/filters`
**Legacy endpoint for filters**

⚠️ **Deprecated:** Use `/api/v1/filters/:religion` instead

**Response:**
```json
{
  "success": true,
  "religion": "islamic",
  "totalNames": 5000,
  "filters": {
    "genders": [
      { "value": "male", "label": "Male", "count": 3000 },
      { "value": "female", "label": "Female", "count": 2000 }
    ],
    "origins": [
      { "origin": "Arabic", "count": 4000 },
      { "origin": "Persian", "count": 500 }
    ],
    "firstLetters": [
      { "letter": "A", "count": 500 },
      { "letter": "B", "count": 300 }
    ]
  }
}
```

**Example:**
```bash
curl "https://namverse-api.vercel.app/api/religion/islamic/filters"
```

---

### GET `/api/names/:religion/:slug`
**Legacy endpoint for single name**

⚠️ **Deprecated:** Use `/api/v1/names/:religion/:slug` instead

**Example:**
```bash
curl "https://namverse-api.vercel.app/api/names/islamic/ahmad"
```

---

### GET `/api/health`
**Legacy health endpoint**

Redirects to `/health` (301)

---

### GET `/api/v1/health`
**Legacy v1 health endpoint**

Redirects to `/health` (301)

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid religion"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Endpoint not found",
  "path": "/api/invalid",
  "availableEndpoints": [...]
}
```

or

```json
{
  "success": false,
  "error": "Name not found"
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "error": "Too many requests",
  "message": "Rate limit: 50 requests per day per IP. Unlimited for nameverse.vercel.app",
  "retryAfter": "24 hours"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal Server Error",
  "timestamp": "2025-12-10T09:30:00.000Z"
}
```

### 503 Service Unavailable
```json
{
  "status": "unhealthy",
  "error": "Database connection failed"
}
```

---

## Testing

### Quick Test (curl)
```bash
# Test health
curl https://namverse-api.vercel.app/health

# Test names endpoint
curl "https://namverse-api.vercel.app/api/v1/names?religion=islamic&limit=5"

# Test search
curl "https://namverse-api.vercel.app/api/v1/search?q=ali"

# Test single name
curl "https://namverse-api.vercel.app/api/v1/names/islamic/ahmad"
```

### Using HTTPie
```bash
# Install httpie: pip install httpie

# Test with pretty output
http https://namverse-api.vercel.app/health

# Test with query params
http GET "https://namverse-api.vercel.app/api/v1/names" religion==islamic limit==10

# Test search
http GET "https://namverse-api.vercel.app/api/v1/search" q==ali religion==islamic
```

### Using JavaScript/Fetch
```javascript
// Health check
const health = await fetch('https://namverse-api.vercel.app/health');
const healthData = await health.json();

// Fetch names
const names = await fetch('https://namverse-api.vercel.app/api/v1/names?religion=islamic&limit=10');
const namesData = await names.json();

// Search
const search = await fetch('https://namverse-api.vercel.app/api/v1/search?q=ali');
const searchData = await search.json();
```

---

## Response Caching

All successful GET responses include cache headers:

| Endpoint | Cache Duration |
|----------|---------------|
| `/health` | No cache |
| `/warmup` | No cache |
| `/api/v1/names` | 5 minutes |
| `/api/v1/names/:religion/:slug` | 1 hour |
| `/api/v1/filters/:religion` | 1 hour |
| `/api/v1/search` | 1 minute |

**Cache Headers:**
```
Cache-Control: public, s-maxage=300, stale-while-revalidate=600
```

---

## API Clients

### Official Clients
- **Frontend:** `@/lib/api/names` (Next.js/React)
- **Node.js:** Available in repository

### Example Integration
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://namverse-api.vercel.app/api',
  timeout: 10000,
});

// Fetch names
const { data } = await api.get('/v1/names', {
  params: { religion: 'islamic', limit: 20 }
});

// Search
const searchResults = await api.get('/v1/search', {
  params: { q: 'ali' }
});
```

---

## Notes

1. **Religion Values:** `islamic`, `christian`, `hindu` (case-insensitive)
2. **Slug Format:** Lowercase with hyphens (e.g., `ahmad`, `john-the-baptist`)
3. **Date Format:** ISO 8601 (e.g., `2025-12-10T09:30:00.000Z`)
4. **Pagination:** Default page=1, limit=50, max limit=100
5. **Search:** Minimum 2 characters
6. **CORS:** Enabled for all origins
7. **Compression:** Automatic gzip/deflate

---

## Support

- **API URL:** https://namverse-api.vercel.app
- **Frontend:** https://nameverse.vercel.app
- **GitHub:** https://github.com/zakriyakhandeveloper/Namverse
