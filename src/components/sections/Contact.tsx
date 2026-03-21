import { Mail, Github, Linkedin } from "lucide-react";
import profile from "@/data/profile.json";

export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-[#e0ddd8]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs text-[#888888] mb-3">05 / contact</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-12">
          Contact
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 px-6 py-4 border border-[#e0ddd8] rounded-lg hover:border-[#0a0a0a]/30 transition-colors group"
          >
            <Mail
              size={18}
              className="text-[#888888] group-hover:text-[#0a0a0a] transition-colors"
            />
            <div>
              <p className="text-xs text-[#888888] font-mono mb-0.5">이메일</p>
              <p className="text-sm text-[#1a1a1a]">{profile.email}</p>
            </div>
          </a>

          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 border border-[#e0ddd8] rounded-lg hover:border-[#0a0a0a]/30 transition-colors group"
          >
            <Github
              size={18}
              className="text-[#888888] group-hover:text-[#0a0a0a] transition-colors"
            />
            <div>
              <p className="text-xs text-[#888888] font-mono mb-0.5">GitHub</p>
              <p className="text-sm text-[#1a1a1a]">comet08</p>
            </div>
          </a>

          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 border border-[#e0ddd8] rounded-lg hover:border-[#0a0a0a]/30 transition-colors group"
          >
            <Linkedin
              size={18}
              className="text-[#888888] group-hover:text-[#0a0a0a] transition-colors"
            />
            <div>
              <p className="text-xs text-[#888888] font-mono mb-0.5">
                LinkedIn
              </p>
              <p className="text-sm text-[#1a1a1a]">seonghye park</p>
            </div>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6 mt-24 pt-8 border-t border-[#e0ddd8]">
        <p className="text-xs text-[#888888] font-mono">
          © {new Date().getFullYear()} 박성혜
        </p>
      </div>
    </section>
  );
}
