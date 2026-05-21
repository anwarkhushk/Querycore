<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

# 🚀 QueryCore

**Multi-Tenant SaaS Analytics Platform with AI-Powered SQL Generation**

QueryCore is a full-stack analytics dashboard designed for multi-tenant SaaS environments. It combines a modern Next.js frontend with a FastAPI-based AI backend that converts natural language questions into secure, tenant-scoped PostgreSQL queries using the Groq LLM API (Llama 3.1).

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **📊 Analytics Dashboard** | Real-time KPI cards (revenue, customers, orders) with interactive drill-down breakdowns |
| **🤖 AI Query Engine** | Natural language → SQL conversion powered by Groq's Llama 3.1 with automatic tenant-scoping |
| **👥 Customer Management** | Full CRUD operations with search, filtering, and status tracking |
| **📦 Product Catalog** | SKU-based product management with price and stock tracking |
| **🛒 Order Processing** | Multi-item order creation linked to customers and products |
| **📈 Revenue Charts** | Interactive Recharts line charts with monthly drill-down by category |
| **🔐 Authentication** | JWT-based login with token persistence and route protection |
| **🔔 Email Notifications** | Opt-in login alerts with Web3Forms integration for bug reports |
| **💾 Backup & Audit Log** | Automatic audit trail of all data modifications (add/edit/delete) |
| **🌙 Dark Mode** | System-aware theme toggle with smooth transitions |
| **🐛 Bug Reporting** | Built-in error reporting that sends real emails to admins via Web3Forms |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                      │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐ │
│  │  Login    │  │Dashboard │  │ AI Query │  │  CRUD Pages │ │
│  │  Page     │  │  + Charts│  │  Page    │  │ (Cust/Prod) │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬──────┘ │
│       │              │             │                │        │
└───────┼──────────────┼─────────────┼────────────────┼────────┘
        │              │             │                │
        ▼              ▼             │                ▼
┌──────────────────────────┐         │    ┌──────────────────────┐
│   Next.js API Routes     │         │    │   In-Memory Mock DB  │
│   /api/login             │         │    │   (lib/db.ts)        │
│   /api/analytics/*       │         │    │   - customers[]      │
│   /api/customers/*       │         │    │   - products[]       │
│   /api/products/*        │         │    │   - orders[]         │
│   /api/orders            │         │    └──────────────────────┘
│   /api/report-error      │         │
│   /api/send-notification │         │
└──────────────────────────┘         │
                                     ▼
                          ┌─────────────────────┐
                          │  FastAPI Backend     │
                          │  (Python :8000)      │
                          │                      │
                          │  POST /api/ask-ai    │
                          │    ├─ Groq LLM API   │
                          │    └─ Tenant Scoping  │
                          └──────────┬──────────┘
                                     │
                                     ▼
                          ┌─────────────────────┐
                          │  PostgreSQL (Prod)   │
                          │  - tenants           │
                          │  - users             │
                          │  - roles             │
                          │  - analytics_reports │
                          │  - query_executions  │
                          └─────────────────────┘
```

---

## 📁 Project Structure

```
Querycore/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with ThemeProvider & Geist fonts
│   ├── page.tsx                  # Root redirect → /dashboard
│   ├── globals.css               # Tailwind v4 imports + CSS variables
│   ├── login/
│   │   └── page.tsx              # Login page with notification opt-in modal
│   ├── dashboard/
│   │   ├── layout.tsx            # Dashboard layout (sidebar + auth guard)
│   │   ├── page.tsx              # Overview — analytics cards + revenue chart
│   │   ├── customers/page.tsx    # Customer CRUD with search & modal forms
│   │   ├── products/page.tsx     # Product CRUD with SKU management
│   │   ├── orders/page.tsx       # Order creation with multi-item line items
│   │   ├── ai-query/page.tsx     # AI SQL generator interface
│   │   ├── backup/page.tsx       # Audit log viewer
│   │   └── report-error/page.tsx # Bug report form (sends real emails)
│   └── api/                      # Next.js API Routes (REST)
│       ├── login/route.ts
│       ├── analytics/
│       │   ├── summary/route.ts
│       │   ├── drilldown/route.ts
│       │   └── revenue-chart/route.ts
│       ├── customers/
│       │   ├── route.ts          # GET (search) + POST
│       │   └── [id]/route.ts     # PUT + DELETE
│       ├── products/
│       │   ├── route.ts          # GET (search) + POST
│       │   └── [id]/route.ts     # PUT + DELETE
│       ├── orders/route.ts       # GET + POST
│       ├── ai-query/route.ts     # Mock AI query endpoint
│       ├── report-error/route.ts # Web3Forms email integration
│       └── send-notification/route.ts
│
├── components/                   # Shared React components
│   ├── sidebar.tsx               # Navigation sidebar with theme toggle
│   ├── analytics-cards.tsx       # KPI cards with drill-down panels
│   ├── revenue-chart.tsx         # Interactive Recharts line chart
│   ├── theme-provider.tsx        # Dark/light/system theme context
│   └── notification-modal.tsx    # Email notification opt-in dialog
│
├── lib/                          # Shared utilities & data layer
│   ├── db.ts                     # In-memory mock database + CRUD helpers
│   ├── axios.ts                  # Axios instance with JWT interceptor
│   ├── backup.ts                 # Backup/audit log module
│   ├── notifications.ts          # Backup logging helper
│   └── utils.ts                  # Tailwind class merge utility (cn)
│
├── backend/                      # Python FastAPI microservice
│   ├── main.py                   # AI query endpoint (Groq → SQL)
│   └── register_company.py       # Multi-tenant company onboarding script
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.1.6 | React framework with App Router & API routes |
| **React** | 19.2.3 | UI component library |
| **TypeScript** | 5.x | Type-safe development |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Recharts** | 3.7.0 | Interactive data visualization |
| **Lucide React** | 0.563.0 | Icon library |
| **Axios** | 1.13.5 | HTTP client with interceptors |

### Backend (AI Service)
| Technology | Purpose |
|---|---|
| **FastAPI** | Python REST API framework |
| **Groq API** | LLM inference (Llama 3.1 8B Instant) |
| **psycopg2** | PostgreSQL database driver |
| **bcrypt** | Password hashing |
| **Pydantic** | Request/response validation |

### External Services
| Service | Purpose |
|---|---|
| **Groq Cloud** | AI/LLM inference for SQL generation |
| **Web3Forms** | Email delivery for bug reports |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Python** ≥ 3.9 (for AI backend)
- **PostgreSQL** ≥ 14 (for production; mock DB used in development)

### 1. Clone the Repository

```bash
git clone https://github.com/anwarkhushk/Querycore.git
cd Querycore
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Start the Frontend (Next.js)

```bash
npm run dev
```

The app will be available at **http://localhost:3000**.

### 4. Set Up the AI Backend (Optional)

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn requests python-dotenv pydantic

# Configure environment
echo "GROQ_API_KEY=your_groq_api_key_here" > .env

# Start the backend
uvicorn main:app --reload --port 8000
```

> **Note:** The AI Query feature requires the FastAPI backend running on port 8000. All other dashboard features work without it.

### 5. Multi-Tenant Setup (Optional — Production)

For production with PostgreSQL, configure `backend/register_company.py`:

```python
DB_CONFIG = {
    "dbname": "your_db",
    "user": "your_user",
    "password": "your_password",
    "host": "localhost",
    "port": 5432,
}
```

```bash
pip install psycopg2-binary bcrypt
python register_company.py
```

---

## 📡 API Reference

### Next.js API Routes

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/login` | Authenticate user and return JWT |
| `GET` | `/api/analytics/summary` | Dashboard KPIs (revenue, customers, orders) |
| `GET` | `/api/analytics/drilldown?metric=` | Drill-down data for a specific metric |
| `GET` | `/api/analytics/revenue-chart` | Monthly revenue data for charts |
| `GET` | `/api/customers?search=` | List/search customers |
| `POST` | `/api/customers` | Create a new customer |
| `PUT` | `/api/customers/:id` | Update customer by ID |
| `DELETE` | `/api/customers/:id` | Delete customer by ID |
| `GET` | `/api/products?search=` | List/search products |
| `POST` | `/api/products` | Create a new product |
| `PUT` | `/api/products/:id` | Update product by ID |
| `DELETE` | `/api/products/:id` | Delete product by ID |
| `GET` | `/api/orders` | List all orders |
| `POST` | `/api/orders` | Create a new order |
| `POST` | `/api/ai-query` | Mock AI query (frontend fallback) |
| `POST` | `/api/report-error` | Submit bug report via Web3Forms |
| `POST` | `/api/send-notification` | Send login notification email |

### FastAPI Backend

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/ask-ai` | Convert natural language → tenant-scoped SQL |

**Headers:** `tenant-id` (required) — UUID identifying the current tenant.

**Request Body:**
```json
{
  "question": "Show me all users in the system"
}
```

**Response:**
```json
{
  "status": "success",
  "original_question": "Show me all users in the system",
  "raw_llm_sql": "SELECT * FROM users",
  "secure_sql_to_execute": "SELECT * FROM (SELECT * FROM users) AS secure_subquery WHERE tenant_id = 'demo-tenant-123';"
}
```

---

## 🔐 Authentication Flow

```
User Login → POST /api/login → JWT Token → localStorage
     │
     ├─ Success → Notification opt-in modal → Dashboard
     │
     └─ Token injected into all API requests via Axios interceptor
         │
         └─ Dashboard layout checks token on mount → redirects to /login if missing
```

---

## 🗄️ Database Schema (Production)

```sql
-- Multi-tenant tables
tenants      (tenant_id UUID PK, name, plan_type, contact_email)
roles        (role_id UUID PK, tenant_id FK, role_name)
users        (user_id UUID PK, tenant_id FK, role_id FK, username, email, password_hash)

-- Analytics
analytics_reports   (report_id UUID PK, tenant_id FK, title, created_at)
query_executions    (execution_id UUID PK, ai_request_id UUID, tenant_id FK, executed_sql, execution_time_ms)
```

---

## 🎨 UI Features

- **Responsive Sidebar** — Fixed navigation with active state indicators and icon support
- **Dark/Light Mode** — System-aware with manual toggle, persisted in localStorage
- **Drill-down Analytics** — Click KPI cards or chart data points for detailed breakdowns
- **Modal Forms** — Backdrop blur, smooth animations for CRUD operations
- **Loading Skeletons** — Animated placeholder states while data loads
- **Copy to Clipboard** — One-click SQL copy buttons in the AI Query interface
- **Suggestion Chips** — Pre-built query examples for the AI interface

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is developed as a **Database Lab semester project** (BSCS — Semester 04).

---

<p align="center">
  Built with ❤️ using <strong>Next.js</strong>, <strong>FastAPI</strong>, and <strong>Groq AI</strong>
</p>
