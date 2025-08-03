
# 🛠️ Wix CLI Website Development Handbook

Welcome to the gTek Global Industries Dev Guide. This codex is your sacred companion for developing Wix Studio websites in a local IDE with full CLI integration.

---

## 🔮 PHASE I — Preparation: Your Sacred Tools

### Prerequisites
- Node.js (v16+ recommended): https://nodejs.org
- npm (comes with Node)
- Python 3.9+ (for Jupyter Notebooks)
- VS Code: https://code.visualstudio.com
- Wix CLI (official): `@wix/cli`

### Install Wix CLI

```bash
npm install -g @wix/cli
```

Login to your Wix account:

```bash
wix login
```

---

## 🧭 PHASE II — Pulling Down the Aether

### Create or Navigate to Your Project Directory

```bash
mkdir my-wix-site
cd my-wix-site
```

### Pull Your Wix Studio Site

```bash
wix sites pull --path .
```

Select your site (`gtekglobal.design`) when prompted.

---

## ⚙️ PHASE III — Dependency Installation

### Install Project Dependencies

```bash
npm install
```

If using React and it's not installed:

```bash
npm install react@18.2.0 react-dom@18.2.0
```

---

## 🔁 PHASE IV — Syncing and Previewing

### Live Preview

```bash
wix preview
```

Choose `Local Code` or `Latest Commit`.

### Deployment

```bash
wix publish
```

Note: Use `--no-cache` if issues persist.

---

## 🧪 PHASE V — Integrating Jupyter Notebook (Optional)

For advanced logs, analytics, and dev tracking:

```bash
pip install notebook
jupyter notebook
```

Create a `deployment_logbook.ipynb` to track build output and experiment.

---

## 🧿 Troubleshooting Rituals

- **Missing React**: Ensure it's in `dependencies` not `devDependencies`
- **Module Errors**: Clean install with:
  ```bash
  rm -rf node_modules package-lock.json
  npm cache clean --force
  npm install
  ```

---

## 🏁 Completion

Your environment is now a live development engine for gTek Global Industries. Use VS Code, Terminal, and Jupyter as your command and scribe altar.

---
> ✨ “To code is to conjure. Build wisely.”  
> — The Architect Codex
