#!/usr/bin/env python3
"""YouTube 자막을 분 단위 마커가 붙은 텍스트 파일로 저장한다.

사용법:
  fetch_transcript.py <영상 ID 또는 URL> <출력 파일> [--lang en]
  fetch_transcript.py --compare a.txt b.txt   # 두 자막이 같은 영상인지 비교

youtube-transcript-api가 필요하다. 없으면 설치 방법을 출력하고 종료한다.
"""
import difflib
import re
import sys


def video_id(s):
    m = re.search(r"(?:v=|youtu\.be/|embed/)([A-Za-z0-9_-]{11})", s)
    return m.group(1) if m else s


def compare(a, b):
    ta, tb = open(a, encoding="utf-8").read(), open(b, encoding="utf-8").read()
    n = 6000
    ratio = difflib.SequenceMatcher(None, ta[:n], tb[:n]).ratio()
    print(f"앞 {n}자 유사도: {ratio:.3f} (0.95 이상이면 같은 영상의 다른 업로드일 가능성이 높다)")
    print(f"길이: {len(ta)} vs {len(tb)}")


def main():
    args = sys.argv[1:]
    if args and args[0] == "--compare":
        return compare(args[1], args[2])
    if len(args) < 2:
        sys.exit(__doc__)
    lang = "en"
    if "--lang" in args:
        lang = args[args.index("--lang") + 1]
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
    except ImportError:
        sys.exit(
            "youtube-transcript-api가 없다. 임시 venv에 설치:\n"
            '  python3 -m venv "$TMPDIR/yt" && "$TMPDIR/yt/bin/pip" install -q youtube-transcript-api\n'
            '  "$TMPDIR/yt/bin/python" fetch_transcript.py ...'
        )
    vid = video_id(args[0])
    api = YouTubeTranscriptApi()
    try:
        tr = api.fetch(vid, languages=[lang])
    except Exception as e:  # 자막 없음, 차단 등
        langs = []
        try:
            langs = [(t.language_code, t.is_generated) for t in api.list(vid)]
        except Exception:
            pass
        sys.exit(f"자막을 가져오지 못했다: {type(e).__name__}. 사용 가능한 언어: {langs}")
    out, bucket = [], -1
    for s in tr:
        b = int(s.start // 60)
        if b != bucket:
            out.append(f"\n[{b // 60:02d}:{b % 60:02d}] ")
            bucket = b
        out.append(s.text.replace("\n", " ") + " ")
    open(args[1], "w", encoding="utf-8").write("".join(out))
    last = int(list(tr)[-1].start)
    print(f"{vid}: {len(list(tr))}개 구간, 마지막 시작 {last}초 -> {args[1]}")


if __name__ == "__main__":
    main()
