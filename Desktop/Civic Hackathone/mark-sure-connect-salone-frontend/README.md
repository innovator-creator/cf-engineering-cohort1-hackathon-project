# MarkSure Connect Salone

Your gateway to government services, representatives, and emergency support in Sierra Leone.

**Author:** JOHN MARK FORNAH

## Features

- **Government Services Directory**: Browse and search for passports, driver's licenses, birth certificates, business registration, and more
- **Representatives Directory**: Find and contact your elected officials and government representatives by district or constituency
- **Emergency Services**: One-tap access to police, fire, ambulance, and national emergency numbers
- **Bilingual Support**: Full English and Krio language support with i18n infrastructure
- **Dark Mode**: Default dark mode with toggle option (persisted in localStorage)
- **Mobile-First Design**: Fully responsive, optimized for mobile devices
- **Report Wrong Info**: Community-driven data accuracy with report submission feature

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom component library with shadcn/ui
- **State Management**: React Context API
- **Database**: Supabase (PostgreSQL)
- **Data Storage**: Supabase for services and representatives, localStorage for user preferences

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd marksure-connect-salone
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add the following variables:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=https://rplmhfiygplxbmpbvwlu.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_qo-FN4BIiKVrrQ6vwojOBw_OVi2vMRv
   \`\`\`
   - **Important**: The app requires these environment variables to connect to Supabase. Without them, the app will throw an error on startup.

4. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main entry point
│   └── globals.css        # Global styles and design tokens
├── components/
│   ├── pages/             # Page components
│   ├── modals/            # Modal components
│   ├── ui/                # Reusable UI components
│   ├── onboarding-screen.tsx
│   └── main-layout.tsx
├── contexts/              # React Context providers
│   ├── language-context.tsx
│   └── theme-context.tsx
├── lib/
│   ├── data/              # Legacy placeholder data (deprecated)
│   │   ├── services.ts
│   │   ├── representatives.ts
│   │   └── emergency.ts
│   └── supabase/          # Supabase integration
│       ├── client.ts      # Supabase client initialization
│       ├── types.ts       # TypeScript types matching database schema
│       ├── services.ts    # Government services data access
│       └── representatives.ts  # Representatives data access
└── locales/               # i18n translations
    ├── en/
    └── kr/
\`\`\`

## Key Features

### Internationalization (i18n)

The app supports English and Krio languages with a custom JSON-based implementation:
- Language selection persists in localStorage
- Complete translations for all UI elements
- Sample Krio translations provided

### Data Structure

The app is fully connected to Supabase:
- **Government Services**: Fetched from `gov_services` table in Supabase
- **Representatives**: Fetched from `representatives` table in Supabase
- All data is fetched in real-time from the database
- Emergency contact numbers are stored locally

### Dark Mode

- Default ON (as specified)
- Toggle available in Account/Settings
- Preference persisted in localStorage
- Custom color scheme: Primary #1D8F55 (green), Secondary #0953A3 (blue)

## Database Schema

The app uses two main Supabase tables:

### `gov_services`
- `id` (bigint, primary key)
- `service_name` (text, not null)
- `ministry` (text, not null)
- `requirements` (text, nullable)
- `official_fee` (text, nullable)
- `contact_phone` (text, nullable)
- `contact_email` (text, nullable)
- `related_links` (text, nullable)
- `created_at` (timestamptz)

### `representatives`
- `id` (bigint, primary key)
- `name` (text)
- `title` (text)
- `region` (text)
- `constituency` (text, nullable)
- `party` (text, nullable)
- `office_address` (text, nullable)
- `phone` (text, nullable)
- `email` (text, nullable)
- `created_at` (timestamptz)

**Note**: Ensure Row Level Security (RLS) policies are set up to allow public SELECT access to these tables.

## Future Enhancements

- User authentication
- Real-time data updates with Supabase subscriptions
- Push notifications for important announcements
- Offline mode with service worker

## Contributing

This project is maintained by JOHN MARK FORNAH. For contributions or issues, please contact the maintainer.

## License

© 2025 JOHN MARK FORNAH. All rights reserved.
