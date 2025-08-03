import React, { useState, useEffect } from "react";

export default function BlockAuditorDashboard() {
  const [sessionStart, setSessionStart] = useState(null);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    const start = Date.now();
    setSessionStart(start);

    const interval = setInterval(() => {
      setSessionDuration(Math.floor((Date.now() - start) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSaveNotes = () => {
    const time = new Date().toLocaleString();
    setSavedNotes(prev => [...prev, { time, text: notes }]);
    setNotes("");
  };

  const handleExportJSON = () => {
    const metadata = {
      project: "Block Auditor Suite",
      company: "gTek Global Industries",
      version: "1.0",
      session: {
        start: new Date(sessionStart).toISOString(),
        durationFormatted: formatDuration(sessionDuration),
        durationSeconds: sessionDuration,
        timestampExported: new Date().toISOString(),
        notes: savedNotes
      },
      filesChanged: [
        "project-outline.txt",
        "wallet-log.csv",
        "scratchpad.draft"
      ],
      htmlPage: `<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>gTek Global Industries</title>
  <style>
    body { font-family: sans-serif; background: #000; color: #fff; text-align: center; padding: 3rem; }
    h1 { font-size: 2.5rem; color: #00f7ff; }
    p { color: #ccc; font-size: 1.2rem; }
  </style>
</head>
<body>
  <h1>gTek Global Industries</h1>
  <p>Empowering creative and sovereign AI solutions.</p>
</body>
</html>`
    };

    const blob = new Blob([JSON.stringify(metadata, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gtek_global_audit_metadata.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 p-4 border-r border-slate-800">
        <h2 className="text-xl font-semibold mb-6">Block Auditor</h2>
        <nav className="space-y-2">
          <button className="block w-full text-left px-4 py-2 hover:bg-slate-800 rounded">
            File Log
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-slate-800 rounded">
            Digest Report
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-slate-800 rounded">
            Metadata Export
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-slate-800 rounded">
            Validator Tools
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-cyan-400">Audit Dashboard</h1>
          <p className="text-slate-400 mt-1">
            Track actions, generate digests, and manage your IP metadata.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-6 rounded shadow">
            <h2 className="text-lg font-semibold text-sky-300 mb-2">⏱ Session Tracker</h2>
            <p className="text-sm">Session Duration: {formatDuration(sessionDuration)}</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full mt-3 p-2 text-black rounded"
              rows="4"
              placeholder="Add session notes..."
            ></textarea>
            <button
              onClick={handleSaveNotes}
              className="mt-3 bg-sky-500 text-black px-4 py-2 rounded hover:bg-sky-400"
            >
              Save Notes
            </button>
            {savedNotes.length > 0 && (
              <ul className="mt-4 text-sm space-y-2">
                {savedNotes.map((entry, index) => (
                  <li key={index} className="bg-slate-700 p-2 rounded">
                    <strong>{entry.time}:</strong> {entry.text}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-slate-800 p-6 rounded shadow">
            <h2 className="text-lg font-semibold text-sky-300 mb-2">📁 File Tracker</h2>
            <ul className="text-sm space-y-1">
              <li>📝 Updated: project-outline.txt</li>
              <li>📥 Added: wallet-log.csv</li>
              <li>🗑️ Deleted: scratchpad.draft</li>
            </ul>
          </div>
        </section>

        <section className="mt-8">
          <div className="bg-slate-800 p-6 rounded shadow">
            <h2 className="text-lg font-semibold text-sky-300 mb-2">📤 Metadata Export</h2>
            <p className="text-sm mb-4">Generate CIDEX-ready metadata files for your IP submissions.</p>
            <button
              onClick={handleExportJSON}
              className="bg-emerald-500 text-black px-4 py-2 rounded hover:bg-emerald-400"
            >
              Export JSON Metadata
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
