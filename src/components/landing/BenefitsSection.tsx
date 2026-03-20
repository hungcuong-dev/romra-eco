"use client";

import { motion } from "framer-motion";
import {
  FaGlobeAsia,
  FaHandHoldingUsd,
  FaSeedling,
  FaMedal,
  FaUtensils,
  FaBolt,
} from "react-icons/fa";

const benefits = [
  {
    title: "Bảo vệ môi trường",
    description: "Giảm 90% lượng khí thải CO2 so với bao bì nhựa truyền thống",
    icon: <FaGlobeAsia size={28} />,
    color: "from-emerald-50 to-green-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Tiết kiệm chi phí",
    description: "Giá thành cạnh tranh với nhựa sinh học, giảm chi phí xử lý rác thải",
    icon: <FaHandHoldingUsd size={28} />,
    color: "from-amber-50 to-yellow-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    title: "Hỗ trợ nông dân",
    description: "Tạo thêm thu nhập từ phụ phẩm nông nghiệp, cải thiện đời sống",
    icon: <FaSeedling size={28} />,
    color: "from-blue-50 to-sky-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Nâng tầm thương hiệu",
    description: "Thể hiện trách nhiệm xã hội với người tiêu dùng và đối tác",
    icon: <FaMedal size={28} />,
    color: "from-purple-50 to-violet-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "An toàn thực phẩm",
    description: "Không chứa chất độc hại, phù hợp đóng gói thực phẩm khô",
    icon: <FaUtensils size={28} />,
    color: "from-rose-50 to-pink-50",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    title: "Phân hủy nhanh",
    description: "Tự phân hủy trong môi trường tự nhiên, không cần xử lý đặc biệt",
    icon: <FaBolt size={28} />,
    color: "from-teal-50 to-cyan-50",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-cream px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            Tại sao chọn chúng tôi
          </p>
          <h2 className="mb-4 text-3xl font-extrabold text-forest-dark md:text-5xl">
            Lợi ích vượt trội
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-500">
            Giải pháp bao bì sinh học mang lại nhiều giá trị cho doanh nghiệp,
            người tiêu dùng và môi trường
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${b.color} p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              {/* Icon */}
              <div
                className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl ${b.iconBg} ${b.iconColor} transition-transform duration-300 group-hover:scale-110`}
              >
                {b.icon}
              </div>

              <h3 className="mb-2 text-lg font-bold text-forest-dark">
                {b.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
