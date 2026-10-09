---
name: video-to-blog-post
description: YouTube 영상(발표, 강연, 워크숍)의 자막을 읽고 이 포트폴리오 블로그(src/data/posts.json)에 올릴 정리 글을 만든다. 영상 임베드와 직접 그린 SVG 도식을 넣고, 그 글만 따로 커밋한다. "영상 요약해서 블로그 글로", "유튜브 보고 정리 글 올려줘", "이 발표 글로 만들어줘" 같은 요청에 사용한다.
---

# video-to-blog-post

YouTube 영상 하나를 읽고, 이 레포의 블로그(`src/data/posts.json`)에 글 한 편을 추가하는 절차다.
사용자가 영상을 직접 본 상태이고, 글은 그 영상만 다룬다(다른 자료와 섞지 않는다).

## 절차

### 0. 영상 확인
- 사용자가 준 URL에서 영상 ID(11자)를 뽑는다. `&t=` 시점이 있으면 그 시점 근처가 사용자가 짚은 대목이다.
- 사용자가 "영상은 이거야"라며 다른 ID를 주면 **자막을 다시 가져와 비교**한다.
  `scripts/fetch_transcript.py --compare a.txt b.txt` 유사도가 0.95 이상이면 같은 영상의 다른 업로드다.
  그때는 내용은 그대로 두고 링크만 바꾼다. 사용자가 "이전 영상으로"라고 되돌리면 되돌린다.

### 1. 자막 가져오기
```bash
python3 -m venv "$TMPDIR/yt" && "$TMPDIR/yt/bin/pip" install -q youtube-transcript-api   # 최초 1회
"$TMPDIR/yt/bin/python" .claude/skills/video-to-blog-post/scripts/fetch_transcript.py <ID> "$TMPDIR/tr.txt"
```
- 네트워크 허용 도메인: pypi.org, files.pythonhosted.org, www.youtube.com, youtube.com. 샌드박스에서 막히면 그 호스트를 허용해서 다시 실행한다.
- 결과 파일은 `[분:초]` 마커가 붙어 있다. Read로 **전부** 읽는다(요약 사이트나 스니펫만 보고 쓰지 않는다).
- 자동 자막은 고유명사를 잘못 적는다(예: GrokBot -> "Grockbot"). 글에는 바로잡아 쓰되 확신이 없는 이름은 사용자에게 확인한다.

### 2. 구성
- 영상 흐름을 따라 `<h2>` 5~9개로 나눈다. 사용자가 시점을 짚었다면(`t=3415s` 등) 그 대목을 별도 섹션으로 두고 시점 링크를 단다.
- 수치(개수, 기간)는 발표자가 말한 그대로 쓰고, 발표 때문에 과장될 수 있는 건 "라고 한다", "말한다"로 쓴다.
- 영상에 없는 내용, 사용자의 경험이나 의견을 지어내지 않는다. 사용자는 영상을 봤으므로 "영상을 보고 정리했다"는 표현은 괜찮다.
- 마무리는 "정리하며" 섹션 하나. **"자동 자막을 바탕으로 정리했다" 같은 출처 면책 문단은 넣지 않는다**(사용자가 지우라고 한 바 있다). 불확실한 부분은 글이 아니라 대화에서 사용자에게 알린다.

### 3. 문체와 형식
- 기존 글과 같은 문체: `~다` 체, 짧은 문단, 군더더기 없는 설명. 번역투와 과장 표현을 피한다.
- 허용 태그: `p, h2, h3, ul, ol, li, strong, code, a, blockquote, pre, figure/figcaption, iframe, svg`. 본문 스타일은 `.blog-prose`가 맡는다.
- 긴 인용은 하지 않는다. 발표 내용은 **내 말로 풀어서** 쓰고, 짧은 구절만 인용한다(저작권).
- 필드: `slug`(영문 kebab-case, 중복 금지), `title`(`주제: 발표자 워크숍 정리` 형태 권장), `date`(`date +%F`), `category`(보통 `AI Engineering`), `excerpt`(한두 문장, 검색 설명으로도 쓰이니 150자 안팎), `content`(HTML 문자열).

### 4. 시각 자료 (프레임 캡처 하지 않는다)
- **영상 프레임 캡처는 하지 않는다.** yt-dlp 다운로드는 YouTube의 SABR 강제로 실패했고, 쿠키로 우회하지도 않는다. 발표 화면을 복제하면 저작권과 사내 화면 노출 문제가 있다.
- 대신 `references/snippets.md`의 **YouTube 임베드**와 **직접 그린 SVG 도식**을 쓴다. 도식은 팔레트(파랑)와 접근성(`role="img"`, `aria-label`, `<title>`) 규칙을 지킨다.
- 발표자의 그래프나 슬라이드를 **다시 그릴 때는 모양을 지어내지 않는다.** 한 번 신뢰 곡선을 "계속 오르는 곡선"으로 잘못 그렸다가, 사용자가 실제 화면(가파르게 오르다 완만해지는 곡선)을 보여줘서 고쳤다. 모양을 자막만으로 확신할 수 없으면 사용자에게 스크린샷이나 모양 설명을 요청하거나, 모양을 단정하지 않는 도식(순서도, 계층 상자)으로 그린다.
- 도식에 내가 덧붙인 요소(번호 표시 등)는 캡션에 "이해를 돕기 위해 덧붙인 것"이라고 밝힌다.

### 5. 글 넣기
1. 글 객체를 `$TMPDIR/post.json`으로 저장한다(Write).
2. `python3 .claude/skills/video-to-blog-post/scripts/add_post.py "$TMPDIR/post.json"` — 맨 위에 삽입하며 다른 글의 서식은 보존한다. 이미 있는 slug는 `--replace`가 있어야 교체된다.
3. 개발 서버로 확인한다. 로컬 포트 바인딩은 샌드박스가 막으므로(`EPERM`) 서버 실행은 `dangerouslyDisableSandbox`가 필요하다. 백그라운드 실행 시 긴 `timeout`을 준다(기본 시간에 걸리면 서버가 종료된다).
   - `curl -sL http://localhost:3000/blog/<slug>/`로 200, `<iframe`, `<svg`, 시점 링크, canonical 메타를 확인한다.
   - 화면 모양은 직접 볼 수 없으니 "화면은 직접 확인해 달라"고 알린다.

### 6. 커밋
- 사용자가 확인한 뒤에만 커밋한다. `posts.json`에 아직 커밋하지 않을 다른 글이 섞여 있을 수 있으므로 **그 글만 스테이징**한다:
  ```bash
  python3 .claude/skills/video-to-blog-post/scripts/stage_post.py <slug> --dry-run   # 먼저 확인
  python3 .claude/skills/video-to-blog-post/scripts/stage_post.py <slug>
  git commit -m "feat: add <제목 요약> post"      # 커밋 메시지 끝에 시스템이 요구한 공동 작성자 줄을 붙인다
  ```
- 사용자의 다른 수정 파일(`report.md`, `projects.json`, `.codex/` 등)은 건드리지 않는다.
- **푸시는 사용자가 명시적으로 요청했을 때만 한다.** `main` 푸시는 GitHub Pages 배포로 바로 공개된다.

## 함정 모음
- 같은 날짜의 글이 둘이면 정렬이 모호하다. 필요하면 날짜를 조정한다.
- 이전에 푸시한 글이 다른 영상 ID를 쓰고 있을 수 있다. 사용자가 영상을 바꾸면 어느 글의 링크인지 확인하고 되돌린다.
- 출처 요약 사이트의 수치는 서로 다르다(월 PR 1,000 vs 2,500 등). 영상 자막에 있는 값을 우선한다.
- 인용한 영상의 발표자 정보(소속, 이전 경력)는 자막에서 확인한 것만 쓴다.
