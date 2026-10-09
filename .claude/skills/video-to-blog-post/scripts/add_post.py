#!/usr/bin/env python3
"""블로그 글을 src/data/posts.json 맨 위에 넣는다. 다른 글의 서식은 건드리지 않는다.

사용법:
  add_post.py <post.json> [--replace] [--file src/data/posts.json]

post.json 필드: slug, title, date, category, excerpt, content (draft는 선택)
- 새 slug면 텍스트 삽입(기존 항목 서식 보존)
- 이미 있는 slug면 --replace가 있어야 교체한다 (없으면 중단)
"""
import json
import sys

REQUIRED = ["slug", "title", "date", "category", "excerpt", "content"]


def block(post):
    text = json.dumps(post, ensure_ascii=False, indent=2)
    return "\n".join("  " + l for l in text.splitlines())


def main():
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    path = "src/data/posts.json"
    if "--file" in args:
        path = args[args.index("--file") + 1]
    replace = "--replace" in args
    post = json.load(open(args[0], encoding="utf-8"))
    missing = [k for k in REQUIRED if not post.get(k)]
    if missing:
        sys.exit(f"필수 필드 누락: {missing}")

    raw = open(path, encoding="utf-8").read()
    data = json.loads(raw)
    exists = any(p["slug"] == post["slug"] for p in data)
    if exists and not replace:
        sys.exit(f"slug '{post['slug']}'가 이미 있다. 교체하려면 --replace")

    if exists:
        dumped = json.dumps(data, ensure_ascii=False, indent=2)
        if dumped != raw.rstrip("\n"):
            sys.exit("파일 서식이 json.dumps(indent=2)와 달라서 안전하게 교체할 수 없다. 수동으로 확인하라.")
        data = [post if p["slug"] == post["slug"] else p for p in data]
        out = json.dumps(data, ensure_ascii=False, indent=2) + ("\n" if raw.endswith("\n") else "")
    else:
        assert raw.startswith("[\n"), "posts.json이 '[\\n'으로 시작하지 않는다"
        out = "[\n" + block(post) + ",\n" + raw[2:]

    json.loads(out)  # 유효성 검사
    open(path, "w", encoding="utf-8").write(out)
    print(("교체" if exists else "추가") + f": {post['slug']} ({post['date']}) -> {path}")


if __name__ == "__main__":
    main()
