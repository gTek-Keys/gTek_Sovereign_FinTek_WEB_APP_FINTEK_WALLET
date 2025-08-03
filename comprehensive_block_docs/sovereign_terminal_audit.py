import os
from pathlib import Path

TERMINAL_HISTORY_FILES = [
    Path.home() / '.bash_history',
    Path.home() / '.zsh_history',
    Path.home() / '.sh_history'
]

KEYWORDS = ['chat', 'Chat', 'gpt', 'GPT', 'tok', 'Tok', 'sovereign', 'codex']
OUTPUT_FILE = 'terminal_chat_evolution_log.txt'

def scan_terminal_histories():
    log = []
    for history_file in TERMINAL_HISTORY_FILES:
        if history_file.exists():
            with open(history_file, 'r', errors='ignore') as f:
                lines = f.readlines()
                for line in lines:
                    if any(k in line for k in KEYWORDS):
                        log.append(f"{history_file.name}: {line.strip()}")
    return log

def save_log(entries):
    with open(OUTPUT_FILE, 'w') as f:
        f.write("=== Terminal Chat Evolution Log ===\n")
        for entry in entries:
            f.write(entry + "\n")

if __name__ == "__main__":
    print("Scanning terminal history for Sovereign GPT evolution patterns...")
    entries = scan_terminal_histories()
    save_log(entries)
    print(f"Log saved to: {OUTPUT_FILE}")

