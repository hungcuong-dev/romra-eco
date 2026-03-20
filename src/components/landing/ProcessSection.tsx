"use client";

import { motion } from "framer-motion";
import { FaTractor, FaRecycle, FaBoxOpen } from "react-icons/fa";

const steps = [
  {
    number: "01",
    title: "Thu gom rơm rạ",
    description:
      "Hợp tác với nông dân thu gom rơm rạ sau thu hoạch, giảm thiểu đốt rơm gây ô nhiễm.",
    icon: <FaTractor size={32} />,
  },
  {
    number: "02",
    title: "Xử lý nguyên liệu",
    description:
      "Làm sạch và xử lý rơm rạ bằng công nghệ sinh học, tạo ra sợi nguyên liệu chất lượng.",
    icon: <FaRecycle size={32} />,
  },
  {
    number: "03",
    title: "Sản xuất bao bì",
    description:
      "Tạo hình sản phẩm theo yêu cầu của khách hàng, từ phong bì đến túi xách sinh học.",
    icon: <FaBoxOpen size={32} />,
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            Quy trình sản xuất
          </p>
          <h2 className="mb-4 text-3xl font-extrabold text-forest-dark md:text-5xl">
            Giải pháp xanh từ đồng ruộng
          </h2>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center text-lg leading-relaxed text-gray-500"
        >
          Mỗi năm, Việt Nam thải ra hơn 47 triệu tấn rơm rạ. Thay vì đốt bỏ gây ô nhiễm,
          chúng tôi biến chúng thành bao bì sinh học chất lượng cao, phân hủy hoàn toàn
          trong 3-6 tháng.
        </motion.p>

        {/* Steps */}
        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-16 hidden h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="group relative"
            >
              <div className="relative flex flex-col items-center text-center">
                {/* Number badge */}
                <div className="relative z-10 mb-6 flex h-32 w-32 flex-col items-center justify-center rounded-3xl bg-cream transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                  <span className="mb-1 text-xs font-bold uppercase tracking-widest text-gold">
                    Bước
                  </span>
                  <span className="text-3xl font-black text-forest-dark">
                    {step.number}
                  </span>
                  <div className="mt-2 text-forest/60">{step.icon}</div>
                </div>

                <h3 className="mb-3 text-xl font-bold text-forest-dark">
                  {step.title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-gray-500">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
