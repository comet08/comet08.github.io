import profile from '@/data/profile.json'

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-[#e0ddd8]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs text-[#888888] mb-3">01 / about</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-16">
          어떤 개발자인가
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Bio */}
          <div className="space-y-6">
            <p className="text-[#1a1a1a] leading-relaxed">
              {profile.bio}
            </p>
            <p className="text-[#888888] leading-relaxed">
              {profile.bioDetail}
            </p>
          </div>

          {/* Interests + current focus */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-mono text-[#888888] mb-4 uppercase tracking-wider">
                현재 집중하는 것
              </h3>
              <p className="text-[#1a1a1a]">
                변화 속에서 제품의 가치를 찾고, 지속 가능한 구조 위에 사용자 경험을 쌓는 것
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono text-[#888888] mb-4 uppercase tracking-wider">
                관심 분야
              </h3>
              <ul className="flex flex-wrap gap-2">
                {profile.interests.map((item) => (
                  <li
                    key={item}
                    className="text-sm px-3 py-1 border border-[#e0ddd8] text-[#1a1a1a] rounded"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
