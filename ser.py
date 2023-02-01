from http.server import HTTPServer, BaseHTTPRequestHandler
import ssl

from ssl import wrap_socket

httpd = HTTPServer(('localhost', 4443), BaseHTTPRequestHandler)

httpd.socket = wrap_socket(httpd.socket, keyfile="path/to/key.pem", certfile='path/to/cert.pem', server_side=True)

httpd.serve_forever()