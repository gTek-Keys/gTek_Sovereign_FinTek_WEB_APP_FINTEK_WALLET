#!/usr/bin/env python3
import os
import subprocess

# Define the Git repository path
REPO_DIR = "/Users/gTek Industries Main/Tales_From_The_Cryptic_Codex"

def git_push():
    try:
        os.chdir(REPO_DIR)
        subprocess.run(["git", "add", "."], check=True)
        subprocess.run(["git", "commit", "-m", "🔁 Sovereign Update: Full sync from gTek automation"], check=True)
        subprocess.run(["git", "push", "origin", "main"], check=True)
        print("✅ Push complete.")
    except subprocess.CalledProcessError as e:
        print("❌ Git push failed:", e)

if __name__ == "__main__":
    git_push()
