import base64, sys
data = sys.stdin.read().strip()
open(sys.argv[1], 'w', encoding='utf-8').write(base64.b64decode(data).decode('utf-8'))
