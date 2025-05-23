"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9F5FF] flex flex-col items-center justify-center p-4">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <Clock className="h-24 w-24 text-[#6A0DAD] mx-auto" />
        </div>
        <h1 className="text-3xl font-bold text-[#6A0DAD] mb-4">Tidak ada pendaftaran diadakan saat ini</h1>
        <p className="text-xl text-gray-700 mb-8">Sampai jumpa di IOT 2025.</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/">
            <Button className="bg-[#6A0DAD] hover:bg-[#5A0C9D] text-white px-8 py-6 transition-all duration-300">
              Kembali ke Beranda
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
