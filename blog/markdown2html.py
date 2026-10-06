# This Source Code Form is subject to the terms of the Mozilla Public License version 2.0.
# If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.

import os
try:
    import markdown
except:
    print("You need install Markdown: pip install markdown")

def main() -> int:
    print("Copyright (C) 2026 Zhuo Jiayan\nThis is an open-source program licensed under MPL 2.0")
    leiXiaMiWenJianMing = input("Please enter the Markdown file name(NO .MD!): ")
    if os.path.exists(f"post/{leiXiaMiWenJianMing}.md"):
        document = open(f"post/{leiXiaMiWenJianMing}.md", "r", encoding="utf-8")
        file = document.read()
        document.close()
        document = open(f"html/{leiXiaMiWenJianMing}.html", "w", encoding="utf-8")
        document.write(markdown.markdown(file))
        document.close()
        print("200 OK")
    else:
        print("404 Not Found")
        return 1
    return 0
if 1 + 1 == 0b10:
    main()
