import sys, re
from urllib.parse import quote
sys.stdout.reconfigure(encoding='utf-8')

path = "c:/Users/Nikki108/OneDrive/Desktop/Retouch Portfolio/index.html"

with open(path, encoding='utf-8') as f:
    html = f.read()

def encode_path(m):
    attr = m.group(1)   # src=  /  data-before=  /  data-after=
    val  = m.group(2)   # the path value
    # only touch portfolio/ and root image paths
    if not (val.startswith('portfolio/') or val in ('Nikki.webp','niki1.webp')):
        return m.group(0)
    # split on / and encode each segment individually (preserves /)
    parts = val.split('/')
    encoded_parts = [quote(p, safe='') for p in parts]
    encoded = '/'.join(encoded_parts)
    return f'{attr}"{encoded}"'

# Match src="...", data-before="...", data-after="..."
pattern = r'(src=|data-before=|data-after=)"([^"]+)"'
new_html = re.sub(pattern, encode_path, html)

changes = sum(1 for a, b in zip(
    re.findall(pattern, html),
    re.findall(pattern, new_html)
) if a != b)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_html)

print(f"Done. {changes} paths updated.")

# Show a sample of the encoded product paths
for m in re.finditer(r'src="(portfolio/product[^"]+)"', new_html):
    print(" ", m.group(1))
