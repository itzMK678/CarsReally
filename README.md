# Race Fusion — CarsReally

**Race Fusion** is a full-stack automotive and motorsport event management platform built with the MERN stack.

The platform allows users to discover upcoming automotive events, explore event details, submit events, and participate in racing and automotive experiences. Administrators can review and manage submitted events through a dedicated dashboard.

The project combines modern frontend development with REST APIs, MongoDB, real-time communication, payment integration, email services, and event calendar management.

---

##  Features

###  Users

* Browse automotive and motorsport events
* View detailed event information
* Search and explore upcoming events
* View events through an interactive calendar
* Participate in events
* Submit new automotive events
* Contact the platform
* Multilingual interface
* Responsive design for desktop and mobile

###  Event Management

* Create automotive events
* Store event information in MongoDB
* Event moderation workflow
* Approve or reject submitted events
* Delete events
* Display approved events publicly
* Event date and time management
* Event location information
* Participation fee information
* Event image support

### Admin Dashboard

Administrators can manage the platform through a dedicated dashboard.

Current functionality includes:

* Event management
* Event approval/rejection
* Event deletion
* Event overview
* Administrative controls

### Payments

The backend includes Stripe integration for handling event-related payments.

The payment system is designed to support secure payment processing for event participation.

###  Email

Mailjet integration is used for email communication and transactional messaging.

### Real-Time Updates

Race Fusion uses **Socket.IO** to provide real-time updates when event information changes.

For example:

```text
Admin updates event
       ↓
Backend
       ↓
Socket.IO
       ↓
Connected clients receive update
```

### Event Calendar

The platform integrates **FullCalendar** to provide a calendar-based view of automotive events.

### Internationalization

The frontend uses **i18next** and currently supports multiple languages.

Current language resources include:

* English
* Lithuanian

###  UI & Animations

The frontend uses:

* Tailwind CSS
* AOS animations
* Lucide React icons
* Responsive layouts

---

# Tech Stack

## Frontend

| Technology       | Purpose                       |
| ---------------- | ----------------------------- |
| React            | Frontend UI                   |
| Vite             | Development and build tooling |
| Tailwind CSS     | Styling                       |
| React Router     | Client-side routing           |
| Axios            | API communication             |
| FullCalendar     | Event calendar                |
| Socket.IO Client | Real-time updates             |
| i18next          | Internationalization          |
| AOS              | Animations                    |
| Lucide React     | Icons                         |

## Backend

| Technology | Purpose                    |
| ---------- | -------------------------- |
| Node.js    | Runtime                    |
| Express.js | REST API                   |
| MongoDB    | Database                   |
| Mongoose   | MongoDB ODM                |
| Socket.IO  | Real-time communication    |
| Stripe     | Payment processing         |
| Mailjet    | Email services             |
| CORS       | Cross-origin communication |
| dotenv     | Environment configuration  |

## Deployment

* Frontend: Vercel
* Backend: Vercel
* Database: MongoDB

---

#  Project Structure

```text
CarsReally/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── locales/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vercel.json
│
├── server/
│   ├── api/
│   │   └── index.js
│   ├── models/
│   ├── DB.js
│   ├── package.json
│   └── vercel.json
│
└── README.md
```

---

#  Application Flow

The main event workflow is designed around event submission and moderation.

```text
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
                             ▼
                    Submit an Event
                             │
                             ▼
                    ┌─────────────────┐
                    │     Backend     │
                    │    Express.js   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    MongoDB      │
                    │  Pending Event  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │     Admin       │
                    │    Dashboard    │
                    └────────┬────────┘
                             │
                   ┌─────────┴─────────┐
                   ▼                   ▼
                Approve              Reject
                   │
                   ▼
             Public Event
                   │
                   ▼
          Users Can Participate
```

---



# Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/itzMK678/CarsReally.git
```

```bash
cd CarsReally
```

---

## 2. Install frontend dependencies

```bash
cd client
npm install
```

---

## 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

---

## 4. Configure environment variables

Create the required `.env` files and add your credentials.

---

## 5. Start the backend

From the `server` directory:

```bash
npm run dev
```

---

## 6. Start the frontend

From the `client` directory:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

The backend runs separately according to the configured server port.

---

#  Development

During development, the project uses:

```text
Frontend
React + Vite
       │
       │ REST API
       ▼
Backend
Express + Node.js
       │
       ├──── MongoDB
       ├──── Stripe
       ├──── Mailjet
       └──── Socket.IO
```

---

#  Security

Security is an ongoing part of the project's development roadmap.

Planned improvements include:

* Secure administrator authentication
* Password hashing
* Server-side authorization
* Protected administrative API routes
* Request validation
* Rate limiting
* Secure CORS configuration
* Secure payment verification
* Improved secret management
* Input sanitization
* Better error handling

---

#  Roadmap

Race Fusion is being actively improved from a functional project into a production-quality full-stack application.

### Phase 1 — Security

* [ ] Implement real authentication
* [ ] Secure admin routes
* [ ] Add role-based authorization
* [ ] Remove exposed credentials
* [ ] Improve CORS configuration
* [ ] Add rate limiting
* [ ] Add request validation

### Phase 2 — Event Management

* [ ] Improve event lifecycle
* [ ] Add event status system
* [ ] Add event capacity
* [ ] Add registration deadlines
* [ ] Improve event search and filtering
* [ ] Add pagination
* [ ] Improve admin moderation

### Phase 3 — Participation

* [ ] Persist participant registrations
* [ ] Create participant management
* [ ] Connect registrations with events
* [ ] Add registration status
* [ ] Improve confirmation emails

### Phase 4 — Payments

* [ ] Complete Stripe payment flow
* [ ] Add Stripe webhooks
* [ ] Verify payments server-side
* [ ] Store payment status
* [ ] Connect payments with registrations
* [ ] Add cancellation/refund handling

### Phase 5 — Engineering Quality

* [ ] Add automated tests
* [ ] Improve API error handling
* [ ] Improve frontend loading states
* [ ] Add proper empty states
* [ ] Clean unused code
* [ ] Improve project structure
* [ ] Add API documentation
* [ ] Add database documentation

### Phase 6 — Production

* [ ] Production security audit
* [ ] Performance optimization
* [ ] Monitoring and logging
* [ ] Production deployment improvements
* [ ] CI/CD pipeline
* [ ] Complete technical documentation

---

#  Screenshots

Screenshots and demonstrations of the platform will be added here as the project is polished.

---

# Project Goals

The main goal of Race Fusion is to build a realistic full-stack platform rather than a simple CRUD application.

The project focuses on:

* Full-stack development
* REST API design
* Database management
* Authentication and authorization
* Real-time communication
* Third-party API integration
* Payment processing
* Event management
* Responsive UI development
* Production-oriented software engineering

---

# Author

**M Mamoon Khaliq**

Computer System Engineering Student
Full Stack & AI Engineer

GitHub: [itzMK678](https://github.com/itzMK678)

Portfolio: [mamoondev.vercel.app](https://mamoondev.vercel.app/)

---


