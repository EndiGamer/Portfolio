Home component added

- Component path: `src/Home.jsx`
- Dependencies used: `react`, `framer-motion` (Tailwind utility classes are used for styling)

Next.js (App Router)

- Install: `npm i framer-motion`
- Create `app/page.tsx` (or `app/page.jsx`) and render:

```
import Home from '../src/Home';
export default function Page() { return <Home />; }
```

Vite (React)

- Install: `npm i framer-motion`
- In `src/main.jsx`:

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
ReactDOM.createRoot(document.getElementById('root')).render(<Home />);
```

Tailwind CSS

- If not configured, follow Tailwind setup for your framework. The component works without Tailwind, but styling will differ.

