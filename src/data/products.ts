import type { Product } from "@/types";
import { CDN } from "@/lib/constants";

export const products: Product[] = [
  {
    id: "product-1",
    title: "Phong bì (Mang dấu ấn riêng)",
    shortTitle: "Phong bì sinh học",
    description:
      "Giải pháp phong bì thân thiện cho môi trường, độc đáo cho ngành thiết kế in ấn, mùi hương dễ chịu gợi kí ức tuổi thơ.",
    image: `${CDN}/images/products/food-packaging.png`,
    decompose: "Phân huỷ hoàn toàn trong môi trường tự nhiên.",
    size: "11×22 cm",
    weight: "10-12g",
    color: "Màu kem",
    features: [
      "Phân huỷ hoàn toàn trong môi trường tự nhiên.",
      "Có thể tái sử dụng",
      "Được tối ưu để vượt trội hơn gỗ và nhựa sinh học.",
      "Thân thiện với môi trường, lan toả lối sống xanh",
    ],
  },
  {
    id: "product-2",
    title: "Túi xách (độ bền cao)",
    shortTitle: "Túi xách sinh học",
    description:
      "Trở thành phụ kiện thời trang độc lạ, giải pháp mới thay đổi thói quen tiêu dùng để môi trường thêm xanh.",
    image: `${CDN}/images/products/shopping-bag.png`,
    decompose: "Phân huỷ hoàn toàn trong môi trường tự nhiên.",
    size: "Nhỏ: 15×25 cm, Trung: 20×30 cm",
    weight: "Nhỏ: 11-13g, Trung: 32-35g",
    color: "Màu kem",
    features: [
      "Phân huỷ hoàn toàn trong môi trường tự nhiên.",
      "Có thể tái sử dụng",
      "Được tối ưu để vượt trội hơn gỗ và nhựa sinh học.",
      "Thân thiện với môi trường.",
      "Lan toả lối sống xanh, an toàn khi đựng các thực phẩm khô",
      "Chịu lực, chịu nhiệt tốt.",
    ],
  },
  {
    id: "product-3",
    title: "Giấy A4",
    shortTitle: "Giấy A4 sinh học",
    description:
      "Giải pháp giấy thân thiện cho môi trường, độc đáo trong trang trí, thiết kế, mùi hương dễ chịu gợi kí ức tuổi thơ.",
    image: `${CDN}/images/products/industrial-packaging.png`,
    decompose: "Phân huỷ hoàn toàn trong môi trường tự nhiên.",
    size: "A4",
    weight: "7-9g",
    color: "Màu kem",
    features: [
      "Phân huỷ hoàn toàn trong môi trường tự nhiên.",
      "Có thể tái sử dụng",
      "Được tối ưu để vượt trội hơn gỗ và nhựa sinh học.",
      "Thân thiện với môi trường, lan toả lối sống xanh",
      "An toàn khi đựng các thực phẩm khô",
      "Chịu lực, chịu nhiệt tốt.",
    ],
  },
  {
    id: "product-4",
    title: "Tệp tài liệu",
    shortTitle: "Tệp tài liệu sinh học",
    description:
      "Giải pháp tệp hồ sơ thân thiện cho môi trường, độc đáo cho học sinh, nhân viên văn phòng, mùi hương dễ chịu gợi kí ức tuổi thơ.",
    image: `${CDN}/images/products/cosmetic-packaging.png`,
    decompose: "Phân huỷ hoàn toàn trong môi trường tự nhiên.",
    size: "Size A4: 22×31 cm, Size A5: 15×22 cm",
    weight: "A4: 27-29g, A5: 18-20g",
    color: "Màu kem",
    features: [
      "Phân huỷ hoàn toàn trong môi trường tự nhiên.",
      "Có thể tái sử dụng",
      "Được tối ưu để vượt trội hơn gỗ và nhựa sinh học.",
      "Thân thiện với môi trường, lan toả lối sống xanh",
      "Chịu lực tốt.",
    ],
  },
  {
    id: "product-5",
    title: "Bao bì nghệ thuật (theo yêu cầu)",
    shortTitle: "Bao bì nghệ thuật",
    description:
      "Trở thành phụ kiện thời trang độc lạ mang dấu ấn cá nhân, giải pháp mới thay đổi thói quen tiêu dùng để môi trường thêm xanh.",
    image: `${CDN}/images/products/pharmaceutical-packaging.jpg`,
    decompose: "Phân huỷ hoàn toàn trong môi trường tự nhiên.",
    size: "Nhỏ: 15×25 cm, Trung: 20×30 cm",
    weight: "Nhỏ: 11-13g, Trung: 32-35g",
    color: "Màu kem",
    features: [
      "In thiết kế hoặc vẽ mẫu mã theo yêu cầu.",
      "Phân huỷ hoàn toàn trong môi trường tự nhiên.",
      "Có thể tái sử dụng",
      "Được tối ưu để vượt trội hơn gỗ và nhựa sinh học.",
      "Thân thiện với môi trường, lan toả lối sống xanh",
      "An toàn khi đựng các thực phẩm khô",
      "Chịu lực, chịu nhiệt tốt.",
    ],
  },
];
