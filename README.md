# Learning Dashboard

A high-fidelity, fully animated student learning dashboard built with modern web technologies. This application fetches real-time course data from Supabase and displays it in a responsive Bento grid layout with smooth animations.

## 🎯 Features

- **Server Components & RSC**: Leverages Next.js 15 App Router with React Server Components for optimal performance and SEO
- **Real-time Data**: Fetches live course data from Supabase PostgreSQL database
- **Responsive Design**:
  - Desktop: 4-column Bento grid with collapsible sidebar
  - Tablet: 2-column grid with sidebar icons only
  - Mobile: Single column stacked layout with bottom navigation
- **Smooth Animations**:
  - Staggered entrance animations for Bento cards
  - Spring-based hover effects (stiffness: 300, damping: 20)
  - Animated progress bars that count from 0 to fetched value
  - Micro-interactions with layout animations (Framer Motion layoutId)
- **Dark Mode Only**: Premium dark theme with deep backgrounds and glowing gradients
- **No Layout Shifts**: All animations use `transform` and `opacity` exclusively
- **Loading States**: Skeleton loaders with pulse animations during data fetching
- **Error Handling**: Graceful error boundaries for failed Supabase connections

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## 📁 Project Structure

```
app/
  ├── page.tsx              # Main dashboard page
  ├── layout.tsx            # Root layout with metadata
  ├── loading.tsx           # Loading skeleton
  ├── error.tsx             # Error boundary
  └── globals.css           # Global styles

components/
  ├── sidebar.tsx           # Collapsible sidebar with mobile nav
  ├── course-card.tsx       # Animated course card component
  ├── hero-tile.tsx         # Welcome card with streak indicator
  ├── activity-tile.tsx     # GitHub-style contribution graph
  ├── bento-grid.tsx        # Responsive grid layout
  ├── dashboard-content.tsx # Server component wrapper
  ├── loading-skeleton.tsx  # Pulse animation skeletons
  ├── error-boundary.tsx    # Error UI component
  └── ...

lib/
  ├── supabase.ts          # Supabase client configuration
  ├── actions.ts           # Server action for fetching courses
  ├── icon-resolver.ts     # Dynamic Lucide icon resolver
  └── utils.ts             # Utility functions (cn, gradients)

types/
  └── course.ts            # TypeScript interfaces

public/                     # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier available)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd learning-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a free Supabase project at https://supabase.com
   - Create a `courses` table with schema:
     ```sql
     CREATE TABLE courses (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       title TEXT NOT NULL,
       progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
       icon_name TEXT NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
     );
     ```
   - Insert sample data:
     ```sql
     INSERT INTO courses (title, progress, icon_name) VALUES
     ('Advanced React Patterns', 75, 'Code'),
     ('UI/UX Design Fundamentals', 60, 'Palette'),
     ('Machine Learning Basics', 45, 'Brain'),
     ('Web Performance Optimization', 90, 'Zap');
     ```

4. Configure environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Architecture

### Server-Side Data Fetching

The application uses Next.js Server Components for efficient data fetching:

```typescript
// lib/actions.ts
'use server'
export async function fetchCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) throw new Error('Failed to fetch courses');
  return data || [];
}
```

This approach ensures:
- Data is fetched on the server (no exposing database queries to client)
- Reduced JavaScript bundle size
- Improved SEO and performance

### Component Split

- **Server Components**: `page.tsx`, `DashboardContent` (data fetching)
- **Client Components**: All UI components with animations and interactivity

### Supabase Integration

The Supabase client is configured for secure server-side access:
- Uses environment variables for authentication
- Implements error handling with try-catch
- Supports real-time subscriptions (extensible)

## 🎨 Animation Details

### Entrance Animations
Each Bento card staggered with 100ms delay:
- Initial: `opacity: 0, translateY: 20px`
- Animated: `opacity: 1, translateY: 0`
- Duration: 500ms with `easeOut`

### Hover Effects
Spring physics with no layout shifts:
```typescript
whileHover={{
  scale: 1.02,
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 20
  }
}}
```

### Progress Bar Animation
Animated from 0 to fetched value over 1.5 seconds with 50ms interval updates for smooth counting effect.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column, bottom nav)
- **Tablet**: 640px - 1024px (2 columns, collapsed sidebar)
- **Desktop**: > 1024px (4 columns, full sidebar)

## 🔧 Development

### Build for Production
```bash
npm run build
npm run start
```

### Lint
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
vercel
```

### Environment Variables in Vercel
Set these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📝 API Reference

### Server Actions

#### `fetchCourses()`
Fetches all courses from Supabase database.

**Returns**: `Promise<Course[]>`

**Throws**: `Error` if database connection fails

### Components

#### `BentoGrid`
Responsive Bento grid layout with automatic responsive adjustments.

**Props**:
- `courses: Course[]` - Array of courses to display
- `heroElement: React.ReactNode` - Hero tile component
- `activityElement: React.ReactNode` - Activity tile component

#### `CourseCard`
Animated course card with progress bar.

**Props**:
- `course: Course` - Course data
- `index: number` - For staggered animations

## 🐛 Troubleshooting

### Courses not loading
1. Verify Supabase credentials in `.env.local`
2. Check Supabase dashboard for `courses` table and data
3. Check browser console for error messages

### Animations not smooth
1. Ensure Framer Motion is installed: `npm install framer-motion`
2. Check for layout shift issues in browser DevTools
3. Verify GPU acceleration is enabled

### Build errors
1. Run `npm install` again
2. Clear `.next` folder: `rm -rf .next`
3. Rebuild: `npm run build`

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👤 Author

Built as a frontend intern challenge submission.

---

**Built with ❤️ using Next.js 15, Supabase, and Framer Motion**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
