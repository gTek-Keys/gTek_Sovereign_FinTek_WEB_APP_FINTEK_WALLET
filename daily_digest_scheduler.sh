# Cron job installer for daily digest at 9am
(crontab -l ; echo "0 9 * * * python3 /Users/bfh/Desktop/terminal_audit_parser.py") | crontab -
echo "✅ Daily digest audit scheduled for 9AM every day"