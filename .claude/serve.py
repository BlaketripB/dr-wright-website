import http.server
import os

os.chdir("/Users/blakebutler/Library/Mobile Documents/com~apple~CloudDocs/dr-wright-website")

handler = http.server.SimpleHTTPRequestHandler
httpd = http.server.HTTPServer(("", 3000), handler)
print("Serving at http://localhost:3000")
httpd.serve_forever()
