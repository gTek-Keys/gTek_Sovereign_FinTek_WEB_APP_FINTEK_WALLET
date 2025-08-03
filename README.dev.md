
# 🧬 Wix CLI Dev Codex — Code Architecture & Ritual Practices

This developer-focused codex supplements the main handbook with concrete patterns and practical architecture for Wix Studio projects using local IDEs.

---

## 🌐 Folder & File Structure

```
gTek_Global_Industries_Design_Website/
├── .vscode/                # Editor config
├── .wix/                   # Wix CLI system files
├── node_modules/           # Installed dependencies
├── public/                 # Auto-generated bundle files (DO NOT EDIT)
├── src/                    # Main source code
│   ├── components/         # React components
│   ├── pages/              # Site pages (e.g., Home.jsx, About.jsx)
│   └── styles/             # CSS/SCSS modules
├── backend/                # .jsw backend API files
├── package.json            # Project metadata + dependencies
├── wix.config.json         # Wix CLI configuration
└── README.md               # Main handbook
```

---

## ⚙️ Backend vs Frontend Logic

### ✅ Frontend: Inside `/src/pages/` or `/components/`

Use:

```js
import React from 'react';
import { MyWidget } from '../components/MyWidget';
```

Avoid importing backend modules like:

```js
import { something } from 'backend/something.jsw'; // ❌
```

Instead, call backend exports like:

```js
import { getData } from 'backend/myApi';
```

> ⚠️ This only works if the backend file is in `.jsw` format and explicitly exports the function.

---

## 🧠 Backend Modules: `/backend/`

Use `.jsw` files for backend logic:

```js
// File: backend/myApi.jsw

export function getData() {
  return "Secret server-side info";
}
```

This file can now be imported in frontend code (as above).

---

## 📦 Module Rituals

### Install new npm packages

```bash
npm install <package-name>
```

If it’s frontend-only:

```bash
npm install react-tooltip
```

For backend:

```bash
npm install axios
```

Ensure it's in `dependencies`, not `devDependencies`.

---

## 🛠 Dev Practices

| Practice | Ritual |
|---------|--------|
| Consistent naming | `PascalCase` for components, `camelCase` for variables |
| Use `.jsx` | For all components that return JSX |
| Avoid editing `public/` | It's overwritten by Wix build system |
| Use `.jsw` for backend | Only `.jsw` files can be imported client-side |
| Use `console.log` | Log only in dev, strip for prod |
| Source control | Use Git or GitHub for all projects |

---

## 🪞 Example: Connecting Frontend to Backend

```js
// In frontend (Home.jsx)
import { getData } from 'backend/myApi';

useEffect(() => {
  getData().then(console.log);
}, []);
```

```js
// In backend/myApi.jsw
export function getData() {
  return "from the server realm ✨";
}
```

---

## 🏁 You're Now Aligned

Maintain structure. Separate logic. Channel the frontend and backend streams with intention.

---
> 🧙 “A split of layers is not a limitation—it's a spell of clarity.”  
> — Architect Codex
