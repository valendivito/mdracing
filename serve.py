#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

# Change to the script's directory
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)
print(f"Changed to directory: {os.getcwd()}", file=sys.stderr)
print(f"Files in directory: {os.listdir('.')}", file=sys.stderr)

PORT = 3456

Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT} from {os.getcwd()}")
    httpd.serve_forever()
