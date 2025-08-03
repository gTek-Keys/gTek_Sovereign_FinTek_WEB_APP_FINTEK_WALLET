// Sovereign Codex OS — Samsung AppShell (React + Capacitor Scaffold)

// File: capacitor.config.ts
export default {
  appId: 'com.sovereign.codex',
  appName: 'Sovereign Codex OS',
  webDir: 'build',
  bundledWebRuntime: false
};

// File: package.json (essential fields)
{
  "name": "sovereign-codex-os",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@capacitor/android": "^5.0.5",
    "@capacitor/core": "^5.0.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.3.0",
    "@rainbow-me/rainbowkit": "^1.0.0",
    "wagmi": "^1.0.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "android": "npx cap open android",
    "sync": "npx cap sync"
  }
}

// File: android/app/src/main/AndroidManifest.xml (snippet)
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.sovereign.codex">
    <application
        android:allowBackup="true"
        android:label="Sovereign Codex OS"
        android:theme="@style/AppTheme">
        <activity
            android:name=".MainActivity"
            android:launchMode="singleTop"
            android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
            android:label="Sovereign Codex OS">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>

// File: README.md
# Sovereign Codex OS — Samsung Edition
React + Capacitor scaffold targeting Samsung Galaxy Store

## Getting Started
- `npm install`
- `npm run build`
- `npx cap sync android`
- `npx cap open android`

📦 Ready to be zipped and built with Android Studio