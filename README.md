# DigiFarm Assist

A production-ready full-stack web application for agricultural assistance, featuring AI-powered crop diagnosis, marketplace, and knowledge hub. Built with Django REST Framework backend and React frontend.

## Features

- 🌾 **AI Crop Diagnosis**: Upload crop images for instant AI-powered diagnosis with treatment recommendations
- 🛒 **Agricultural Marketplace**: Buy seeds, fertilizers, pesticides, and farming equipment
- 📚 **Knowledge Hub**: Access expert articles and farming best practices
- 💳 **M-Pesa Integration**: Seamless payment processing via Safaricom Daraja API
- 🗺️ **Farm Management**: Track farms, plots, and crop information
- 📱 **Mobile-First Design**: Responsive UI built with Tailwind CSS
- 🔔 **Notifications**: In-app and email notifications
- 🔐 **JWT Authentication**: Secure API authentication

## Tech Stack

### Backend
- Django 4.2
- Django REST Framework
- PostgreSQL
- Redis + Celery
- M-Pesa Daraja API Integration

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

### Infrastructure
- Docker & Docker Compose
- GitHub Actions CI/CD
- pytest for testing

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Python 3.11+ (for local development)
- Node.js 18+ (for local frontend development)
- M-Pesa Daraja sandbox credentials (see [M-Pesa Setup](#m-pesa-setup))

### Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DigiFarm
   ```

2. **Set up environment variables**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
   
   Edit `backend/.env` and add your configuration (see [Environment Variables](#environment-variables))

3. **Start services**
   ```bash
   docker-compose up -d
   ```

4. **Run migrations and create superuser**
   ```bash
   docker-compose exec backend python manage.py migrate
   docker-compose exec backend python manage.py createsuperuser
   ```

5. **Seed demo data (optional)**
   ```bash
   docker-compose exec backend python manage_seed.py
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api
   - API Docs: http://localhost:8000/api/docs
   - Django Admin: http://localhost:8000/admin
   - Flower (Celery): http://localhost:5555

### Local Development

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set up PostgreSQL and Redis (or use Docker)
# Update .env with database credentials

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## M-Pesa Setup

### 1. Get Sandbox Credentials

1. Visit [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
2. Create an account and log in
3. Go to "My Apps" and create a new app
4. Note down:
   - Consumer Key
   - Consumer Secret
   - Shortcode (Test Credentials: 174379)
   - Passkey (found in app settings)

### 2. Configure Environment Variables

Add to `backend/.env`:

```env
MPESA_CONSUMER_KEY=your-consumer-key
MPESA_CONSUMER_SECRET=your-consumer-secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your-passkey
MPESA_ENV=sandbox
MPESA_CALLBACK_URL=https://your-ngrok-url.ngrok.io/api/payments/mpesa/webhook/
MPESA_LNM_EXPIRY=174000
```

### 3. Set Up ngrok for Webhooks (Local Development)

1. Install ngrok: https://ngrok.com/download
2. Start ngrok:
   ```bash
   ngrok http 8000
   ```
3. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)
4. Update `MPESA_CALLBACK_URL` in `.env`:
   ```env
   MPESA_CALLBACK_URL=https://abc123.ngrok.io/api/payments/mpesa/webhook/
   ```
5. Restart the backend service

### 4. Test M-Pesa Integration

Use the Postman collection or test via API:

```bash
# 1. Create an order
curl -X POST http://localhost:8000/api/marketplace/orders/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "order_items": [{"product_id": 1, "quantity": 1}],
    "shipping_address": "123 Main St",
    "shipping_county": "Nairobi",
    "shipping_phone": "+254712345678"
  }'

# 2. Initiate STK Push
curl -X POST http://localhost:8000/api/payments/mpesa/initiate/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": 1,
    "phone": "+254712345678"
  }'
```

## Environment Variables

### Backend (.env)

```env
# Django
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_NAME=digifarm
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432

# Celery & Redis
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/0

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

# M-Pesa (see M-Pesa Setup section)
MPESA_CONSUMER_KEY=
MPESA_CONSUMER_SECRET=
MPESA_SHORTCODE=174379
MPESA_PASSKEY=
MPESA_ENV=sandbox
MPESA_CALLBACK_URL=
MPESA_LNM_EXPIRY=174000

# Email (optional)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000/api
```

## Testing

### Backend Tests

```bash
cd backend
pytest
```

### Frontend Linting

```bash
cd frontend
npm run lint
```

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/schema/redoc/

## Project Structure

```
DigiFarm/
├── backend/
│   ├── apps/
│   │   ├── users/          # User management
│   │   ├── farms/          # Farm management
│   │   ├── diagnosis/      # Crop diagnosis
│   │   ├── marketplace/    # Products, orders
│   │   ├── knowledge/      # Articles
│   │   ├── payments/      # M-Pesa integration
│   │   └── notifications/  # Notifications
│   ├── digi_farm/         # Django project settings
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── pages/          # React pages
│   │   ├── components/     # Reusable components
│   │   ├── services/      # API services
│   │   └── context/       # React context
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── postman_collection.json
└── README.md
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for:
- Render
- Heroku
- Railway
- AWS

## Troubleshooting

### M-Pesa Webhook Not Receiving Callbacks

1. Ensure ngrok is running and URL is correct
2. Check `MPESA_CALLBACK_URL` in `.env`
3. Verify webhook endpoint is accessible: `curl https://your-ngrok-url.ngrok.io/api/payments/mpesa/webhook/`
4. Check backend logs: `docker-compose logs backend`

### Celery Tasks Not Running

1. Check Celery worker logs: `docker-compose logs celery`
2. Verify Redis connection: `docker-compose exec redis redis-cli ping`
3. Check Celery beat (for scheduled tasks): `docker-compose logs celery-beat`

### Database Connection Issues

1. Ensure PostgreSQL is running: `docker-compose ps db`
2. Check database credentials in `.env`
3. Run migrations: `docker-compose exec backend python manage.py migrate`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License

## Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)
- Email: support@digifarm.com

## Acknowledgments

- Safaricom for M-Pesa Daraja API
- Django and React communities
- All contributors

