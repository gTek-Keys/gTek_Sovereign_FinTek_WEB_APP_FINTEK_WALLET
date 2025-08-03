import os

CHAT_KEYWORDS = ['chat', 'Chat', 'CHAT']
TARGET_EXTENSIONS = ['.py', '.json', '.txt', '.md', '.log']
TARGET_DIR = "/Users/gTek Industries Main/The_Block_Auditer_Gamification_Software-gTek_Induftries_Global_Design"
OUTPUT_FILE = "sovereign_chat_audit_log.txt"

chat_data = []

def scan_for_chat_files(base_dir):
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if any(kw in file for kw in CHAT_KEYWORDS) and os.path.splitext(file)[1] in TARGET_EXTENSIONS:
                full_path = os.path.join(root, file)
                try:
                    with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        chat_data.append({
                            'file': full_path,
                            'snippet': content[:700]
                        })
                except Exception as e:
                    print(f"Error reading {full_path}: {e}")

def save_aggregated_data():
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("=== Sovereign Chat Audit Log ===\n")
        for entry in chat_data:
            f.write(f"\n--- File: {entry['file']} ---\n")
            f.write(entry['snippet'])
            f.write("\n")

if __name__ == "__main__":
    print(f"Scanning {TARGET_DIR} for chat intelligence...")
    scan_for_chat_files(TARGET_DIR)
    save_aggregated_data()
    print(f"Audit complete. Results saved to {OUTPUT_FILE}")

