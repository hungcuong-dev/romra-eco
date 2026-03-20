"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CDN } from "@/lib/constants";

export default function ImpactSection() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src={`${CDN}/images/canhDong.jpeg`}
                alt="Hỗ trợ cộng đồng"
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/40 to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -right-4 rounded-2xl bg-forest-dark px-8 py-5 text-center shadow-xl md:right-6"
            >
              <p className="text-3xl font-black text-gold">10%</p>
              <p className="text-sm font-medium text-white/70">lợi nhuận cho cộng đồng</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              Trách nhiệm xã hội
            </p>
            <h2 className="mb-6 text-3xl font-extrabold leading-tight text-forest-dark md:text-4xl">
              Hỗ trợ từ lợi nhuận
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-gray-500">
              Mỗi năm, <span className="font-semibold text-forest-dark">10% lợi nhuận</span> được
              dành để hỗ trợ cộng đồng và những hoàn cảnh khó khăn:
            </p>

            <div className="mb-8 space-y-4">
              <div className="flex items-start gap-4 rounded-xl bg-cream p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-lg">
                  🏠
                </div>
                <div>
                  <h4 className="font-bold text-forest-dark">Mái ấm Nhân Ái</h4>
                  <p className="text-sm text-gray-500">
                    Hỗ trợ mái ấm tại Tam Kỳ, chăm sóc trẻ em mồ côi và người già neo đơn
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-cream p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-lg">
                  👨‍👩‍👧‍👦
                </div>
                <div>
                  <h4 className="font-bold text-forest-dark">Trẻ em vùng cao</h4>
                  <p className="text-sm text-gray-500">
                    Hỗ trợ trẻ em vùng núi, dân tộc thiểu số tỉnh Quảng Nam
                  </p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="border-l-4 border-gold pl-5">
              <p className="text-base italic leading-relaxed text-gray-500">
                &ldquo;Chúng tôi không chỉ tính lợi nhuận — mà còn tính giá trị bền vững
                cho cộng đồng.&rdquo;
              </p>
              <p className="mt-2 text-sm font-semibold text-forest-dark">
                — Đội ngũ Rơm Rả Eco
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
