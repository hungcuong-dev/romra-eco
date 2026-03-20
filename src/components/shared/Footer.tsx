import Image from "next/image";
import { FaPhone, FaEnvelope, FaFacebook } from "react-icons/fa";
import { CONTACT, CDN } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-beige bg-beige px-4 py-10 text-gray-600">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Image
            src={`${CDN}/images/logo.png`}
            alt="Rơm Rả Eco Logo"
            width={60}
            height={60}
            className="rounded-lg"
          />
          <p className="text-sm text-gray-500">
            &copy; 2024 Rơm Rả Eco - Biopackaging. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <FaPhone className="text-forest" />
            <span className="text-sm">
              {CONTACT.phone} - ({CONTACT.phoneName})
            </span>
          </div>
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-2 transition-colors hover:text-forest"
          >
            <FaEnvelope className="text-forest" />
            <span className="text-sm">{CONTACT.email}</span>
          </a>
          <a
            href={CONTACT.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-forest"
          >
            <FaFacebook className="text-forest text-lg" />
            <span className="text-sm">Rơm Rả Eco</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
