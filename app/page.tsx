"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Clock,
  ArrowRight,
  Facebook,
  Instagram,
  Youtube,
  CircleUser,
  Globe,
  MessageSquare,
  ExternalLink,
} from "lucide-react"
import { motion } from "framer-motion"

export default function HomePage() {
  // KONTROL UTAMA PENDAFTARAN - Ubah ke true untuk membuka pendaftaran
  const [isRegistrationActive] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  // Jika pendaftaran tidak aktif, tampilkan halaman khusus
  if (!isRegistrationActive) {
    return <RegistrationClosedPage />
  }

  // Efek scroll untuk mengubah section aktif
  const handleScroll = () => {
    const sections = ["home", "faq", "tujuan"]
    const scrollPosition = window.scrollY + 100

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animasi untuk elemen yang muncul saat scroll
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }

  // Data untuk link akses cepat
  const quickLinks = [
    {
      name: "Web HMJ",
      url: "https://hmjti.undiksha.ac.id/",
      description: "Website resmi HMJ Teknik Informatika Undiksha",
    },
    {
      name: "Web Integer",
      url: "https://hmjti.undiksha.ac.id/integer",
      description: "Website Integer HMJ Teknik Informatika",
    },
    {
      name: "EORS",
      url: "https://eors.hmjtiundiksha.com/",
      description: "Electronic Open Recruitment System HMJ TI",
    },
    {
      name: "ETIKA",
      url: "https://etika.hmjtiundiksha.com/",
      description: "Sistem ETIKA HMJ Teknik Informatika",
    },
    {
      name: "Iuran HMJ",
      url: "https://iuran.hmjtiundiksha.com/",
      description: "Sistem Iuran HMJ Teknik Informatika",
    },
    {
      name: "Inventaris",
      url: "https://inventaris.hmjtiundiksha.com/status-barang",
      description: "Sistem Inventaris HMJ Teknik Informatika",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Image src="/images/logo-undiksha.png" alt="Logo Undiksha" width={40} height={40} className="mr-2" />
              <Image src="/images/logo-hmj.png" alt="Logo HMJ-TI" width={40} height={40} />
            </div>
            <h1 className="text-xl font-bold text-[#6A0DAD]">SIRENA-TI</h1>
          </div>
          <nav className="hidden md:flex space-x-6 relative z-10">
            {["home", "faq", "tujuan"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-gray-700 hover:text-[#6A0DAD] transition-colors duration-300 ${
                  activeSection === section ? "text-[#6A0DAD] font-medium" : ""
                }`}
              >
                {section === "home" ? "Beranda" : section === "faq" ? "FAQ" : section === "tujuan" ? "Tujuan" : section}
              </button>
            ))}
          </nav>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
            <Button className="bg-[#6A0DAD] hover:bg-[#5A0C9D] text-white transition-all duration-300">
              <Link href="/daftar">Daftar Ulang</Link>
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-16 bg-gradient-to-b from-[#F9F5FF] to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              className="md:w-1/2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#6A0DAD] mb-4">
                Sistem Pendaftaran Ulang Mahasiswa Baru
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                SIRENA-TI adalah platform resmi untuk pendaftaran ulang mahasiswa baru jurusan Teknik Informatika.
                Sistem ini dirancang untuk memudahkan proses administrasi dan memastikan semua mahasiswa baru terdaftar
                dengan benar.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/daftar">
                  <Button className="bg-[#6A0DAD] hover:bg-[#5A0C9D] text-white text-lg px-8 py-6 transition-all duration-300">
                    Daftar Ulang Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              className="md:w-1/2 flex justify-center"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
              }}
            >
              <Image
                src="/images/robot-wave.png"
                alt="Robot SIRENA-TI"
                width={400}
                height={400}
                className="rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tujuan Section */}
      <section id="tujuan" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-center mb-2">
              Tujuan <span className="text-[#6A0DAD]">SIRENA-TI</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Ada beberapa tujuan pembuatan Sistem Pendaftaran Ulang Mahasiswa Baru Teknik Informatika, diantaranya
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: "CircleUser",
                title: "Mudah Digunakan",
                description:
                  "Mempermudah dalam melakukan proses pendaftaran ulang mahasiswa baru jurusan Teknik Informatika Undiksha",
              },
              {
                icon: "Globe",
                title: "Ramah Kertas",
                description:
                  "Mengurangi penggunaan kertas sekali pakai yang biasanya digunakan dalam setiap berkas yang dikumpul pada proses pendaftaran ulang secara konvensional",
              },
              {
                icon: "MessageSquare",
                title: "Proses Mudah",
                description:
                  "Mempermudah dalam melakukan pendataan, verifikasi data, hingga pembagian grup WhatsApp untuk mahasiswa baru",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
                }}
              >
                <div className="w-14 h-14 bg-[#6A0DAD] rounded-lg flex items-center justify-center mb-4 text-white">
                  {item.icon === "CircleUser" && <CircleUser className="h-7 w-7" />}
                  {item.icon === "Globe" && <Globe className="h-7 w-7" />}
                  {item.icon === "MessageSquare" && <MessageSquare className="h-7 w-7" />}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-[#F9F5FF]">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center text-[#6A0DAD] mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Pertanyaan Umum (FAQ)
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md">
              {[
                {
                  question: "Apa saja dokumen yang perlu disiapkan untuk pendaftaran ulang?",
                  answer:
                    "Dokumen yang perlu disiapkan adalah bukti penerimaan mahasiswa (dapat berupa screenshot atau PDF), kartu identitas, dan foto formal terbaru.",
                },
                {
                  question: "Bagaimana jika saya belum mendapatkan NIM?",
                  answer:
                    "Jika Anda belum mendapatkan NIM, Anda tetap dapat mendaftar dengan memilih program studi pada dropdown yang tersedia di formulir pendaftaran.",
                },
                {
                  question: "Kapan saya akan mendapatkan informasi kelompok orientasi?",
                  answer:
                    "Informasi kelompok orientasi akan dibagikan melalui email dan grup WhatsApp resmi setelah proses verifikasi data selesai.",
                },
                {
                  question: "Apakah saya perlu membayar biaya pendaftaran ulang?",
                  answer:
                    "Tidak, pendaftaran ulang tidak dipungut biaya. Namun, akan ada biaya untuk kegiatan orientasi yang akan diinformasikan kemudian.",
                },
                {
                  question: "Bagaimana jika saya mengalami kendala teknis saat pendaftaran?",
                  answer:
                    "Anda dapat menghubungi tim support melalui email support@sirena-ti.ac.id atau melalui WhatsApp di nomor yang tercantum di bagian footer website.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: index * 0.1 } },
                  }}
                >
                  <AccordionItem value={`item-${index + 1}`} className="border-b">
                    <AccordionTrigger className="px-6 py-4 hover:text-[#6A0DAD] transition-colors duration-300">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">{item.answer}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Social Media Section */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Image src="/images/logo-undiksha.png" alt="Logo Undiksha" width={60} height={60} />
                <Image src="/images/logo-hmj.png" alt="Logo HMJ-TI" width={60} height={60} />
              </div>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/hmjtiundiksha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#6A0DAD] transition-colors duration-300"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="https://instagram.com/hmjti_undiksha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#6A0DAD] transition-colors duration-300"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://youtube.com/@hmjtiundiksha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#6A0DAD] transition-colors duration-300"
                >
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Akses Cepat */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Akses Cepat</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-[#6A0DAD] transition-colors duration-300 flex items-center group"
                      title={link.description}
                    >
                      {link.name}
                      <ExternalLink className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Konten */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Konten</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("tujuan")}
                    className="text-sm text-gray-600 hover:text-[#6A0DAD] transition-colors duration-300 text-left"
                  >
                    Tujuan SIRENA-TI
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("faq")}
                    className="text-sm text-gray-600 hover:text-[#6A0DAD] transition-colors duration-300 text-left"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

            {/* Layanan */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Layanan</h3>
              <p className="text-sm text-gray-600 mb-2">
                Jl. Udayana No.11, Banjar Tegal, Singaraja, Kabupaten Buleleng, Bali
              </p>
              <p className="text-sm text-gray-600">
                Email:{" "}
                <a href="mailto:hmjtiundiksha@gmail.com" className="text-[#6A0DAD] hover:underline">
                  hmjtiundiksha@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-gray-300 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© Copyright {new Date().getFullYear()} HMJ TI Undiksha</p>
            <p className="text-sm text-gray-500 mt-2 md:mt-0">
              Made with ❤️ by <span className="text-[#6A0DAD]">GanaDev Com X Web Dev HMJ TI</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Komponen halaman ketika pendaftaran belum dibuka
function RegistrationClosedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F5FF] to-white flex flex-col items-center justify-center p-4">
      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Image src="/images/logo-undiksha.png" alt="Logo Undiksha" width={80} height={80} />
          <Image src="/images/logo-hmj.png" alt="Logo HMJ-TI" width={80} height={80} />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#6A0DAD] mb-4">SIRENA-TI</h1>
        <p className="text-xl text-gray-600 mb-8">Sistem Pendaftaran Ulang Mahasiswa Teknik Informatika</p>

        {/* Clock Icon */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
        >
          <Clock className="h-32 w-32 text-[#6A0DAD] mx-auto" />
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Pendaftaran Belum Dibuka</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Sistem pendaftaran ulang mahasiswa baru belum tersedia saat ini. Silakan tunggu pengumuman resmi dari HMJ
            Teknik Informatika Undiksha untuk informasi pembukaan pendaftaran.
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-[#6A0DAD] mb-4">Informasi Kontak</h3>
          <div className="space-y-2 text-gray-600">
            <p>
              Email:{" "}
              <a href="mailto:hmjtiundiksha@gmail.com" className="text-[#6A0DAD] hover:underline">
                hmjtiundiksha@gmail.com
              </a>
            </p>
            <p>Alamat: Jl. Udayana No.11, Banjar Tegal, Singaraja, Kabupaten Buleleng, Bali</p>
          </div>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          className="flex justify-center space-x-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="https://facebook.com/hmjtiundiksha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#6A0DAD] transition-colors duration-300"
          >
            <Facebook className="h-8 w-8" />
          </a>
          <a
            href="https://instagram.com/hmjti_undiksha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#6A0DAD] transition-colors duration-300"
          >
            <Instagram className="h-8 w-8" />
          </a>
          <a
            href="https://youtube.com/@hmjtiundiksha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#6A0DAD] transition-colors duration-300"
          >
            <Youtube className="h-8 w-8" />
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-sm text-gray-500">© Copyright {new Date().getFullYear()} HMJ TI Undiksha</p>
          <p className="text-sm text-gray-500 mt-1">
            Made with ❤️ by <span className="text-[#6A0DAD]">GanaDev Com X Web Dev HMJ TI</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
