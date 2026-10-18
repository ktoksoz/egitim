"""Geliştirme sunucusu: önbelleği kapatır ve ses dosyalarında ileri sarma için Range isteklerini (206) karşılar.
Kullanım: python3 tools/serve.py [port] [klasör]   (varsayılan: 8813, bu depo)
Sunucudaki yapıyı denemek için klasör olarak tools/deploy-egitimler.sh --yerel ile kurulan klasörü verin."""
import http.server, os, re, sys

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        self.send_header("Accept-Ranges", "bytes")
        super().end_headers()

    def send_head(self):
        m = re.match(r"bytes=(\d*)-(\d*)$", self.headers.get("Range", ""))
        path = self.translate_path(self.path)
        if not m or not os.path.isfile(path):
            return super().send_head()
        size = os.path.getsize(path)
        a, b = m.groups()
        start = int(a) if a else max(0, size - int(b))
        end = int(b) if a and b else size - 1
        if start >= size:
            self.send_error(416); return None
        end = min(end, size - 1)
        f = open(path, "rb"); f.seek(start)
        self.send_response(206)
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.send_header("Content-Length", str(end - start + 1))
        self.end_headers()
        self._kalan = end - start + 1
        return f

    def copyfile(self, src, out):
        n = getattr(self, "_kalan", None)
        if n is None:
            return super().copyfile(src, out)
        while n > 0:
            chunk = src.read(min(65536, n))
            if not chunk: break
            out.write(chunk); n -= len(chunk)

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8813
os.chdir(sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
http.server.ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
