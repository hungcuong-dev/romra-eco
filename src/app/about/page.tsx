"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebook, FaArrowRight } from "react-icons/fa";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { founders, achievements, gratitudeQuote } from "@/data/founders";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Hero */}
        <section className="bg-gradient-to-r from-forest to-forest-dark px-4 py-16 text-center text-white">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gold">
            Về chúng tôi
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">
            Nhà sáng lập mang hoài bão lớn
          </h1>
        </section>

        {/* Founders */}
        <section className="mx-auto max-w-5xl px-4 py-12">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`mb-12 flex flex-col items-center gap-8 rounded-2xl bg-white p-8 shadow-md md:flex-row ${
                i % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="mb-1 text-2xl font-bold text-forest">
                  {founder.name}
                </h2>
                <p className="mb-1 font-medium text-gold">{founder.role}</p>
                <p className="mb-4 text-sm text-gray-500">{founder.education}</p>
                <blockquote className="mb-4 border-l-4 border-gold pl-4 italic text-gray-600">
                  <p>&ldquo;{founder.quote}&rdquo;</p>
                  <p className="mt-1 text-sm text-gray-400">
                    — {founder.quoteEn}
                  </p>
                </blockquote>
                <a
                  href={founder.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-forest transition-colors hover:text-forest-dark"
                >
                  <FaFacebook size={20} />
                  <span className="text-sm">Facebook</span>
                </a>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Gratitude */}
        <section className="bg-forest px-4 py-12 text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-lg italic text-white/90"
          >
            &ldquo;{gratitudeQuote}&rdquo;
          </motion.blockquote>
        </section>

        {/* Achievements */}
        <section className="mx-auto max-w-5xl px-4 py-12">
          <h2 className="mb-2 text-center text-3xl font-bold text-forest">
            Thành tựu
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-gray-600">
            Dự án chỉ mới bắt đầu trong năm 2024 nhưng đã đạt được một số thành
            tựu đáng ghi nhận.
          </p>

          <div className="space-y-8">
            {achievements.map((achievement, i) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-md md:flex-row ${
                  i % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="relative h-48 shrink-0 overflow-hidden rounded-xl md:h-auto md:w-80">
                  <Image
                    src={achievement.image}
                    alt={achievement.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  {achievement.excerpt && (
                    <p className="mb-3 text-sm italic text-gray-500">
                      &ldquo;{achievement.excerpt}&rdquo;
                    </p>
                  )}
                  <h3 className="mb-2 text-xl font-bold text-forest">
                    {achievement.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{achievement.description}</p>
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-medium text-forest transition-colors hover:text-gold"
                  >
                    {achievement.linkText}
                    <FaArrowRight size={12} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
