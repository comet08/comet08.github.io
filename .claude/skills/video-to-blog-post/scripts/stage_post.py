#!/usr/bin/env python3
"""posts.json에서 지정한 slug의 글만 인덱스에 스테이징한다 (작업 폴더는 그대로).

작업 폴더의 posts.json에 아직 커밋하지 않을 다른 글이 섞여 있어도,
HEAD 버전 위에 이 글만 반영한 내용을 인덱스에 올린다. 커밋은 하지 않는다.

사용법:
  stage_post.py <slug> [--dry-run]
"""
import json
import subprocess
import sys

PATH = "src/data/posts.json"


def block(post):
    text = json.dumps(post, ensure_ascii=False, indent=2)
    return "\n".join("  " + l for l in text.splitlines())


def git(*a, **kw):
    return subprocess.check_output(["git", *a], **kw)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    dry = "--dry-run" in sys.argv
    if not args:
        sys.exit(__doc__)
    slug = args[0]
    cur = json.load(open(PATH, encoding="utf-8"))
    post = next((p for p in cur if p["slug"] == slug), None)
    if post is None:
        sys.exit(f"작업 폴더 {PATH}에 slug '{slug}'가 없다")

    head = git("show", f"HEAD:{PATH}").decode("utf-8")
    head_data = json.loads(head)
    if any(p["slug"] == slug for p in head_data):
        dumped = json.dumps(head_data, ensure_ascii=False, indent=2)
        if dumped != head.rstrip("\n"):
            sys.exit("HEAD의 posts.json 서식이 달라서 안전하게 교체할 수 없다")
        new = json.dumps([post if p["slug"] == slug else p for p in head_data],
                         ensure_ascii=False, indent=2) + ("\n" if head.endswith("\n") else "")
    else:
        new = "[\n" + block(post) + ",\n" + head[2:]
    json.loads(new)

    tmp = ".git/posts.stage.tmp.json"
    open(tmp, "w", encoding="utf-8").write(new)
    try:
        if dry:
            print(subprocess.run(["git", "diff", "--no-index", "--stat", "--", f"/dev/stdin", tmp],
                                 input=head.encode(), capture_output=True).stdout.decode()
                  or "(diff 요약 없음)")
            added = len(new.splitlines()) - len(head.splitlines())
            print(f"[dry-run] HEAD 대비 {added:+d}줄. 인덱스는 건드리지 않았다.")
            return
        h = git("hash-object", "-w", tmp).decode().strip()
        git("update-index", "--cacheinfo", f"100644,{h},{PATH}")
    finally:
        try:
            import os
            os.remove(tmp)
        except OSError:
            pass
    print(git("diff", "--cached", "--stat").decode())
    print("스테이징 완료. 커밋은 직접 진행하라.")


if __name__ == "__main__":
    main()
