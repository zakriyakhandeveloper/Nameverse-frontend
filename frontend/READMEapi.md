# NameVerse Backend API

A high-performance Node.js/Express backend for the NameVerse application with Redis caching, MongoDB integration, and comprehensive rate limiting.

## 📁 Project Structure

```
backend/
├── src/                          # Main application source code
│   ├── app.js                   # Express app configuration & middleware
│   ├── server.js                # Server entry point
│   ├── config/
│   │   ├── database.js          # MongoDB connection & configuration
│   │   └── redis.js             # Redis client setup
│   ├── routes/
│   │   ├── index.js             # Route aggregator
│   │   ├── names.js             # Name endpoints (Islamic, Hindu, Christian)
│   │   ├── stories.js           # Story/blog endpoints
│   │   ├── articles.js          # Article endpoints
│   │   ├── search.js            # Global search endpoints
│   │   └── religion.js          # Dynamic religion filter endpoints
│   ├── middleware/
│   │   └── errorHandler.js      # Global error handling
│   ├── utils/
│   │   └── logger.js            # Winston logger configuration
│   └── models/                  # MongoDB schemas (imported from root)
├── routes/                       # Legacy route files (being migrated)
├── models/                       # MongoDB schemas
├── package.json                  # Dependencies & scripts
├── .env.example                  # Environment variables template
└── README.md                     # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- MongoDB (local or cloud)
- Redis (optional, for caching)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/nameverse
   REDIS_URL=redis://localhost:6379
   ALLOWED_ORIGINS=http://localhost:3000,https://nameverse.vercel.app
   ```

3. **Start the server:**
   ```bash
   # Development (with auto-reload)
   npm run dev
   
   # Production
   npm start
   ```

The server will run on `http://localhost:3000` by default.

## 📚 API Endpoints

### Health Check
```
GET /health
GET /api/health
```
Returns server status (exempt from rate limiting).

### Names API

#### Get All Names
```
GET /api/names?religion=islamic&limit=20&page=1
```
Query parameters:
- `religion`: islamic, christian, hindu
- `limit`: Results per page (max 100)
- `page`: Page number
- `gender`: Filter by gender
- `origin`: Filter by origin
- `language`: Filter by language
- `category`: Filter by category
- `alphabet`: Filter by first letter
- `luckyDay`: Filter by lucky day
- `luckyColor`: Filter by lucky color
- `luckyStone`: Filter by lucky stone

#### Get Names by Letter
```
GET /api/name/letter/:letter?religion=islamic&page=1&perPage=150
```

#### Get Name by Slug
```
GET /api/names/:religion/:slug
```

#### Get Names by Category
```
GET /api/category/:religion/:category?page=1&perPage=20
```

#### Get Names by Gender
```
GET /api/gender/:gender/:religion?page=1&perPage=50
```

#### Get Names by Origin
```
GET /api/origin/:religion/:origin?page=1&perPage=50
```

#### Get Names by Language
```
GET /api/language/:religion/:language?page=1&perPage=50
```

#### Get Trending Names
```
GET /api/trending?religion=global&page=1&limit=20
```

#### Search Names
```
GET /api/search?q=ali&religion=islamic&limit=50
```

#### Get Filter Options
```
GET /api/filters
```
Returns available filter options for all religions.

#### Get Religion Filters
```
GET /api/religion/:religion/filters
```
Returns available filters for a specific religion.

### Stories API

#### Get All Stories
```
GET /api/stories?page=1&limit=30
```

#### Get Trending Stories
```
GET /api/stories/trending?limit=10
```

#### Get New Stories
```
GET /api/stories/new?limit=10
```

#### Get Stories by Category
```
GET /api/stories/category/:category?page=1&limit=20
```

#### Get Stories by Tags
```
GET /api/stories/tags?tags=France,Medieval&page=1&limit=20
```

#### Search Stories
```
GET /api/stories/search?q=adventure
```

#### Get Story by Slug
```
GET /api/stories/:locale/:slug
```

#### Get Story Chapter
```
GET /api/stories/:locale/chapter/:chapterId
```

#### Increment Story Views
```
PUT /api/stories/:slug/view
```

### Articles API

#### Get All Articles
```
GET /api/articles?page=1&limit=12&category=&status=published&sort=newest
```

#### Get Latest Articles
```
GET /api/articles/latest?limit=10
```

#### Get Article Categories
```
GET /api/articles/categories
```

#### Get Articles by Category
```
GET /api/articles/category/:category?limit=10
```

#### Search Articles
```
GET /api/articles/search?q=query
```

#### Get Article by Slug
```
GET /api/articles/:slug
```

#### Create Article (Admin)
```
POST /api/articles
```

#### Update Article (Admin)
```
PUT /api/articles/:id
```

#### Delete Article (Admin)
```
DELETE /api/articles/:id
```

## ⚙️ Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `NODE_ENV` | development | Environment (development/production) |
| `MONGODB_URI` | mongodb://localhost:27017/nameverse | MongoDB connection string |
| `REDIS_URL` | redis://localhost:6379 | Redis connection string |
| `RATE_LIMIT_WINDOW_MS` | 86400000 | Rate limit window (24 hours) |
| `RATE_LIMIT_MAX` | 50 | Max requests per IP per window |
| `ALLOWED_ORIGINS` | http://localhost:3000,https://nameverse.vercel.app | CORS allowed origins |

### Rate Limiting

**Default Behavior:**
- `https://nameverse.vercel.app`: **Unlimited requests**
- All other origins: **50 requests per day (24 hours)**
- Rate limit is tracked per IP address
- Health check endpoints are exempt

**How it works:**
- The middleware checks the `referer` and `origin` headers
- If either contains `nameverse.vercel.app`, unlimited access is granted
- All other requests are limited to 50 per 24-hour window

### Caching Strategy

The backend uses **multi-layer caching** for optimal performance:

1. **In-Memory Cache (NodeCache)**
   - TTL: 5 minutes (configurable)
   - Fastest response times
   - Cleared on server restart

2. **Redis Cache**
   - TTL: Varies by endpoint (15 min - 24 hours)
   - Persistent across restarts
   - Shared across multiple server instances

3. **HTTP Cache Headers**
   - 5-minute public cache for list endpoints
   - 24-hour cache for single item endpoints

**Cache Keys:**
```
all_names:base64(params)
names_by_letter:base64(params)
name_by_slug:base64(params)
search_names:base64(params)
filters:religion
trending_names:base64(params)
```

## 🔧 Development

### Available Scripts

```bash
# Start server (production)
npm start

# Start with auto-reload (development)
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Adding New Routes

1. Create a new file in `src/routes/`:
   ```javascript
   const express = require('express');
   const router = express.Router();
   
   router.get('/', async (req, res) => {
     // Your logic here
   });
   
   module.exports = router;
   ```

2. Import and mount in `src/routes/index.js`:
   ```javascript
   const myRouter = require('./myroute');
   router.use('/myroute', myRouter);
   ```

### Caching in Routes

Use the cache utility from `routes/names.js`:

```javascript
const { cacheResponse, generateCacheKey } = require('../utils/cache');

const cacheKey = generateCacheKey('my_endpoint', { param1, param2 });
const data = await cacheResponse(cacheKey, async () => {
  // Fetch data from database
  return await Model.find({});
}, 3600); // 1 hour TTL
```

## 📊 Monitoring

### Logs

Logs are stored in the `logs/` directory:
- `logs/error.log` - Error logs only
- `logs/combined.log` - All logs

### Health Check

Monitor server health:
```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-12-05T11:40:00.000Z",
  "environment": "development"
}
```

## 🔐 Security

- **Helmet.js**: Security headers (XSS, CSRF, etc.)
- **CORS**: Configurable origin restrictions
- **Rate Limiting**: Per-IP request throttling
- **Input Validation**: Query parameter validation
- **Error Handling**: Secure error messages (no stack traces in production)

## 📦 Dependencies

### Core
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `redis` - Redis client
- `ioredis` - Redis client (alternative)

### Middleware & Security
- `cors` - CORS handling
- `helmet` - Security headers
- `express-rate-limit` - Rate limiting
- `compression` - Response compression

### Utilities
- `dotenv` - Environment variables
- `winston` - Logging
- `morgan` - HTTP request logging
- `node-cache` - In-memory caching

### Development
- `nodemon` - Auto-reload
- `eslint` - Code linting
- `prettier` - Code formatting
- `jest` - Testing framework

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running:
```bash
# macOS
brew services start mongodb-community

# Windows
net start MongoDB

# Linux
sudo systemctl start mongod
```

### Redis Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:6379
```
**Solution:** Ensure Redis is running (optional, app works without it):
```bash
# macOS
brew services start redis

# Windows
redis-server

# Linux
sudo systemctl start redis-server
```

### Rate Limit Exceeded
```
429 Too many requests from this IP, please try again tomorrow.
```
**Solution:** 
- Wait 24 hours for the limit to reset, OR
- Use `https://nameverse.vercel.app` origin for unlimited access

## 📝 License

ISC

## 👤 Author

Zakriya Khan

---

**Last Updated:** December 5, 2025
