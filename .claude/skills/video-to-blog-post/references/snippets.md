# 글에 넣는 HTML 스니펫

블로그 팔레트(파랑): 제목 `#0D2236`, 본문 `#1A3A52`, 보조 `#4A7499`, 선 `#C0D8F0`, 배경 `#F0F6FF`,
강조 `#1677C8`, 짙은 강조 `#0F5EA3`, 중간 파랑 `#3D8BD0`, 연한 면 `#DCEBFA` / `#E4EFFC`.

## YouTube 임베드 (시점 링크는 `watch?v=ID&t=초s`)
```html
<figure style="margin:2em 0">
<iframe src="https://www.youtube-nocookie.com/embed/ID" title="영상 제목" style="width:100%;aspect-ratio:16/9;border:0;border-radius:6px" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen></iframe>
<figcaption style="font-size:13px;line-height:1.7;color:#4A7499;margin-top:10px">정리 대상 영상. 글에 나오는 시점은 영상 안의 대략적인 위치다.</figcaption>
</figure>
```

## 도식 공통 틀
```html
<figure style="margin:2em 0">
<svg viewBox="0 0 560 280" role="img" aria-label="도식이 보여 주는 내용 한 문장" style="width:100%;height:auto;display:block;border:1px solid #C0D8F0;border-radius:6px;background:#F0F6FF">
<title>도식 제목</title>
...
</svg>
<figcaption style="font-size:13px;line-height:1.7;color:#4A7499;margin-top:10px">설명. 영상 설명을 바탕으로 직접 다시 그린 도식이다.</figcaption>
</figure>
```
- 글자는 SVG 안에 많이 넣지 않는다(모바일에서 화면 폭에 맞춰 줄어든다). 긴 설명은 캡션에 쓴다.
- 폰트 크기는 본문 라벨 14~19. 흰 글씨는 `#1677C8`, `#3D8BD0` 같은 짙은 면 위에만 쓴다.

## 곡선 (처음엔 가파르게, 점점 완만하게 — 포화형)
모양이 영상과 맞는지 확인된 경우에만 쓴다.
```html
<line x1="72" y1="240" x2="530" y2="240" stroke="#9FBBD6" stroke-width="2"/>
<line x1="72" y1="240" x2="72" y2="26" stroke="#9FBBD6" stroke-width="2"/>
<path d="M72 24 L66 38 M72 24 L78 38" stroke="#9FBBD6" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M72 238 C 125 120, 200 70, 300 58 S 440 44, 520 40" fill="none" stroke="#1677C8" stroke-width="3.5" stroke-linecap="round"/>
```

## 계층 상자 (위가 강함, 아래가 약함)
```html
<rect x="20" y="20" width="470" height="70" rx="8" fill="#1677C8"/>
<text x="40" y="52" font-size="19" font-weight="700" fill="#fff">가장 강한 층</text>
<rect x="20" y="105" width="470" height="70" rx="8" fill="#3D8BD0"/>
<rect x="20" y="190" width="470" height="70" rx="8" fill="#DCEBFA" stroke="#6AA6DB" stroke-width="2" stroke-dasharray="6 5"/>
```
