# gTek Orca Signal™ — Sovereign DJ Streaming Middleware

**gTek Orca Signal™** is a secure DJ stream bridge for routing TIDAL into Traktor Pro 3 via BlackHole on macOS. Features OAuth2 login, FFmpeg audio piping, and Codex IP lock. Designed for real-time deck input. Private use only under gTek Sovereign License v3.0. Mobbin’ Eternal.

## 🧠 Features
- Secure OAuth2 authentication with TIDAL API
- FFmpeg-powered audio streaming routed into BlackHole 16ch
- Traktor-ready input mapping for live DJ set integration
- Codex-enforced IP and licensing framework

## ⚙️ Requirements
- macOS w/ BlackHole 16ch
- Python 3.11+
- Traktor Pro 3.x

## 🛠 Getting Started
1. Set up `BlackHole 16ch` and create Multi-Output device.
2. Run `auth_server.py` to log in to TIDAL.
3. Use `stream_test.py` or `launch_stream.sh` to pipe audio into Traktor.
4. Load Traktor and assign BlackHole 1/2 to Deck A/B.

## 🔏 Licensing
This project is protected under the gTek Sovereign Private License v3.0.  
Unauthorized use, forks, or redistribution is strictly forbidden. See `LICENSE.txt` for full terms.

Mobbin’ Eternal. 🧬
