"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import profile from "@/data/profile.json";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-32 border-t border-[#C0D8F0] relative overflow-hidden"
    >
      {/* Decorative number */}
      <div
        aria-hidden
        className="absolute -right-8 top-4 text-[22vw] font-extrabold text-[#0D2236]/[0.04] leading-none select-none pointer-events-none"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        05
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[#6899BC] text-[10px] tracking-[0.5em] uppercase mb-16"
          style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
        >
          05 / Contact
        </motion.p>

        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-16"
        >
          <h2
            className="text-5xl md:text-7xl font-extrabold text-[#0D2236] leading-tight mb-10 tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Contact
          </h2>

          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-3 text-lg md:text-xl text-[#1A3A52] hover:text-[#1677C8] transition-colors duration-300 border-b border-[#C0D8F0] hover:border-[#1677C8] pb-2"
            style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
          >
            {profile.email}
            <ArrowUpRight
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            />
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex gap-8"
        >
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[#6899BC] hover:text-[#0D2236] transition-colors"
            style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
          >
            <Github size={15} />
            <span className="text-[10px] tracking-[0.3em] uppercase">
              GitHub
            </span>
            <ArrowUpRight
              size={11}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[#6899BC] hover:text-[#0D2236] transition-colors"
            style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
          >
            <Linkedin size={15} />
            <span className="text-[10px] tracking-[0.3em] uppercase">
              LinkedIn
            </span>
            <ArrowUpRight
              size={11}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6 mt-24 pt-8 border-t border-[#C0D8F0] flex justify-between items-center">
        <p
          className="text-[10px] text-[#A4C4E4]"
          style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
        >
          © {new Date().getFullYear()} 박성혜
        </p>
        <span className="text-[#1677C8]/30 text-sm" aria-hidden>
          ✦
        </span>
      </div>
    </section>
  );
}
