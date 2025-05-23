"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, Check, Loader2, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function RegistrationPage() {
  // Simulasi status pendaftaran (true = aktif, false = tidak aktif)
  const [isRegistrationActive] = useState(true)
  const [fullName, setFullName] = useState("")
  const [nim, setNim] = useState("")
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [studyProgram, setStudyProgram] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasNim, setHasNim] = useState(true)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const { toast } = useToast()

  // Simulasi mendapatkan program studi dari NIM
  useEffect(() => {
    if (nim && nim.length >= 5) {
      // Contoh logika: jika NIM dimulai dengan "TI", maka program studi adalah Teknik Informatika
      if (nim.startsWith("TI")) {
        setStudyProgram("Teknik Informatika")
      } else if (nim.startsWith("DS")) {
        setStudyProgram("Sains Data")
      } else {
        setStudyProgram("")
      }
    } else {
      setStudyProgram("")
    }
  }, [nim])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]

      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile)
      } else {
        toast({
          title: "Format file tidak didukung",
          description: "Harap unggah file dengan format JPG, PNG, atau PDF.",
          variant: "destructive",
        })
      }
    }
  }

  // Tambahkan fungsi validasi untuk NIM, email, dan nomor WhatsApp
  const validateNIM = (nim: string): boolean => {
    const nimRegex = /^\d{10}$/
    return nimRegex.test(nim)
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /@student\.undiksha\.ac\.id$/
    return emailRegex.test(email)
  }

  const validateWhatsApp = (whatsapp: string): boolean => {
    const whatsappRegex = /^\d+$/
    return whatsappRegex.test(whatsapp)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validasi form
    const errors: string[] = []

    if (!fullName) {
      errors.push("Nama lengkap wajib diisi")
    }

    if (hasNim) {
      if (!nim) {
        errors.push("NIM wajib diisi")
      } else if (!validateNIM(nim)) {
        errors.push("Format NIM tidak valid - NIM harus terdiri dari 10 digit angka")
      }
    } else if (!studyProgram) {
      errors.push("Program studi wajib dipilih")
    }

    if (!email) {
      errors.push("Email wajib diisi")
    } else if (!validateEmail(email)) {
      errors.push("Format email tidak valid - Email harus menggunakan domain @student.undiksha.ac.id")
    }

    if (!whatsapp) {
      errors.push("Nomor WhatsApp wajib diisi")
    } else if (!validateWhatsApp(whatsapp)) {
      errors.push("Format nomor WhatsApp tidak valid - Nomor WhatsApp hanya boleh berisi angka")
    }

    if (!file) {
      errors.push("Bukti penerimaan mahasiswa wajib diunggah")
    }

    // Jika ada error, tampilkan semua error
    if (errors.length > 0) {
      if (errors.length === 1) {
        toast({
          title: "Kesalahan Input Data",
          description: errors[0],
          variant: "destructive",
        })
      } else {
        toast({
          title: `Ditemukan ${errors.length} Kesalahan Input Data`,
          description: (
            <div className="mt-2">
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="text-sm">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          ),
          variant: "destructive",
        })
      }
      return
    }

    // Simulasi pengiriman data
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setRegistrationSuccess(true)
      toast({
        title: "Pendaftaran berhasil!",
        description:
          "Data Anda telah berhasil dikirim. Silakan bergabung dengan grup WhatsApp untuk informasi selanjutnya.",
        variant: "default",
      })
    }, 2000)
  }

  // Jika pendaftaran tidak aktif, tampilkan halaman fallback
  if (!isRegistrationActive) {
    return <FallbackPage />
  }

  // Tampilkan halaman sukses jika pendaftaran berhasil
  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-[#F9F5FF] py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="max-w-4xl mx-auto shadow-lg">
              <CardHeader className="bg-[#6A0DAD] text-white rounded-t-lg">
                <CardTitle className="text-2xl">Pendaftaran Berhasil!</CardTitle>
                <CardDescription className="text-white/80">
                  Terima kasih telah melakukan pendaftaran ulang
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-8">
                  <motion.div
                    className="mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                  >
                    <Image
                      src="/images/robot-confident.png"
                      alt="Robot SIRENA-TI"
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Pendaftaran Ulang Berhasil!</h2>
                  <p className="text-gray-600 text-center mb-8 max-w-md">
                    Data Anda telah berhasil terdaftar dalam sistem. Silakan bergabung dengan grup WhatsApp berikut
                    untuk mendapatkan informasi lebih lanjut.
                  </p>

                  <div className="w-full max-w-3xl">
                    {/* Grup Jurusan */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-[#6A0DAD] mb-4 flex items-center justify-center">
                        <Image src="/images/logo-hmj.png" alt="Logo HMJ-TI" width={30} height={30} className="mr-2" />
                        Grup WhatsApp Jurusan
                      </h3>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="bg-[#6A0DAD] hover:bg-[#5A0C9D] text-white py-6 w-full transition-all duration-300">
                          <Link
                            href="https://chat.whatsapp.com/JXK63swHy1t9krbRbJ9qCG"
                            target="_blank"
                            className="flex items-center"
                          >
                            Grup WhatsApp Jurusan Teknik Informatika
                          </Link>
                        </Button>
                      </motion.div>
                    </div>

                    {/* Grup Prodi */}
                    <div>
                      <h3 className="text-xl font-bold text-[#6A0DAD] mb-4 text-center">Grup WhatsApp Program Studi</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* PTI */}
                        <motion.div className="flex flex-col" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <div className="flex items-center justify-center mb-2">
                            <Image src="/images/logo-pti.png" alt="Logo PTI" width={40} height={40} />
                          </div>
                          <Button className="bg-[#1E88E5] hover:bg-[#1565C0] text-white py-6 w-full transition-all duration-300">
                            <Link
                              href="https://chat.whatsapp.com/CewliiAn2wiKQwBrF5x2ZL"
                              target="_blank"
                              className="flex items-center"
                            >
                              Grup WhatsApp Prodi PTI
                            </Link>
                          </Button>
                        </motion.div>

                        {/* TRPL */}
                        <motion.div className="flex flex-col" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <div className="flex items-center justify-center mb-2">
                            <Image src="/images/logo-trpl.png" alt="Logo TRPL" width={40} height={40} />
                          </div>
                          <Button className="bg-[#43A047] hover:bg-[#2E7D32] text-white py-6 w-full transition-all duration-300">
                            <Link
                              href="https://chat.whatsapp.com/HhoSdOX6tAa4MnQLdn3o45"
                              target="_blank"
                              className="flex items-center"
                            >
                              Grup WhatsApp Prodi TRPL
                            </Link>
                          </Button>
                        </motion.div>

                        {/* SI */}
                        <motion.div className="flex flex-col" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <div className="flex items-center justify-center mb-2">
                            <Image src="/images/logo-si.png" alt="Logo SI" width={40} height={40} />
                          </div>
                          <Button className="bg-[#FFC107] hover:bg-[#FFA000] text-black py-6 w-full transition-all duration-300">
                            <Link
                              href="https://chat.whatsapp.com/KHiuIGfooXeI9zjqZJ3Mvv"
                              target="_blank"
                              className="flex items-center"
                            >
                              Grup WhatsApp Prodi SI
                            </Link>
                          </Button>
                        </motion.div>

                        {/* ILKOM */}
                        <motion.div className="flex flex-col" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <div className="flex items-center justify-center mb-2">
                            <Image src="/images/logo-ilkom.png" alt="Logo ILKOM" width={40} height={40} />
                          </div>
                          <Button className="bg-[#039BE5] hover:bg-[#0277BD] text-white py-6 w-full transition-all duration-300">
                            <Link
                              href="https://chat.whatsapp.com/K1wgWvJi24i2Mzi2xOSTnj"
                              target="_blank"
                              className="flex items-center"
                            >
                              Grup WhatsApp Prodi ILKOM
                            </Link>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-center items-center bg-gray-50 rounded-b-lg p-6">
                <div className="w-full flex justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/">
                      <Button
                        variant="outline"
                        className="border-[#6A0DAD] text-[#6A0DAD] hover:bg-[#F0E6FF] transition-all duration-300 px-8"
                      >
                        Kembali ke Beranda
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9F5FF] py-12">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-[#6A0DAD] hover:underline mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="bg-[#6A0DAD] text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Formulir Pendaftaran Ulang</CardTitle>
                  <CardDescription className="text-white/80">
                    Silakan isi formulir di bawah ini dengan data yang benar
                  </CardDescription>
                </div>
                <Image
                  src="/images/robot-register.png"
                  alt="Robot SIRENA-TI"
                  width={80}
                  height={80}
                  className="hidden md:block"
                />
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Nama Lengkap */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Label htmlFor="fullName">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Masukkan nama lengkap Anda"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="transition-all duration-300 focus:border-[#6A0DAD] focus:ring-[#6A0DAD]"
                    />
                  </motion.div>

                  {/* Toggle NIM / Program Studi */}
                  <motion.div
                    className="flex items-center space-x-2 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Label>Status NIM:</Label>
                    <div className="flex items-center space-x-1">
                      <Button
                        type="button"
                        variant={hasNim ? "default" : "outline"}
                        size="sm"
                        onClick={() => setHasNim(true)}
                        className={
                          hasNim
                            ? "bg-[#6A0DAD] hover:bg-[#5A0C9D] transition-all duration-300"
                            : "transition-all duration-300"
                        }
                      >
                        Sudah punya NIM
                      </Button>
                      <Button
                        type="button"
                        variant={!hasNim ? "default" : "outline"}
                        size="sm"
                        onClick={() => setHasNim(false)}
                        className={
                          !hasNim
                            ? "bg-[#6A0DAD] hover:bg-[#5A0C9D] transition-all duration-300"
                            : "transition-all duration-300"
                        }
                      >
                        Belum punya NIM
                      </Button>
                    </div>
                  </motion.div>

                  {/* NIM atau Program Studi */}
                  {hasNim ? (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <Label htmlFor="nim">
                        Nomor Induk Mahasiswa (NIM) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="nim"
                        placeholder="Masukkan NIM 10 digit"
                        value={nim}
                        onChange={(e) => setNim(e.target.value)}
                        required={hasNim}
                        className="transition-all duration-300 focus:border-[#6A0DAD] focus:ring-[#6A0DAD]"
                      />
                      <p className="text-xs text-gray-500">NIM harus terdiri dari 10 digit angka</p>
                      {studyProgram && (
                        <motion.div
                          className="flex items-center mt-2 text-sm text-green-600"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Check className="h-4 w-4 mr-1" /> Program Studi: {studyProgram}
                        </motion.div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <Label htmlFor="studyProgram">
                        Program Studi <span className="text-red-500">*</span>
                      </Label>
                      <Select value={studyProgram} onValueChange={setStudyProgram} required={!hasNim}>
                        <SelectTrigger
                          id="studyProgram"
                          className="transition-all duration-300 focus:border-[#6A0DAD] focus:ring-[#6A0DAD]"
                        >
                          <SelectValue placeholder="Pilih program studi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pendidikan Teknik Informatika">Pendidikan Teknik Informatika</SelectItem>
                          <SelectItem value="Teknologi Rekayasa Perangkat Lunak">
                            Teknologi Rekayasa Perangkat Lunak
                          </SelectItem>
                          <SelectItem value="Sistem Informasi">Sistem Informasi</SelectItem>
                          <SelectItem value="Ilmu Komputer">Ilmu Komputer</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  )}

                  {/* Email */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@student.undiksha.ac.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="transition-all duration-300 focus:border-[#6A0DAD] focus:ring-[#6A0DAD]"
                    />
                    <p className="text-xs text-gray-500">Email harus menggunakan domain @student.undiksha.ac.id</p>
                  </motion.div>

                  {/* Nomor WhatsApp */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <Label htmlFor="whatsapp">
                      Nomor WhatsApp <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="whatsapp"
                      placeholder="Contoh: 081234567890"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      required
                      className="transition-all duration-300 focus:border-[#6A0DAD] focus:ring-[#6A0DAD]"
                    />
                    <p className="text-xs text-gray-500">Nomor WhatsApp hanya boleh berisi angka</p>
                  </motion.div>

                  {/* Upload Bukti Penerimaan */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <Label htmlFor="proof">
                      Bukti Penerimaan Mahasiswa <span className="text-red-500">*</span>
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors duration-300 hover:border-[#6A0DAD]">
                      <input
                        id="proof"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="proof" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <Upload className="h-10 w-10 text-[#6A0DAD] mb-2" />
                          <p className="text-sm font-medium mb-1">{file ? file.name : "Klik untuk mengunggah file"}</p>
                          <p className="text-xs text-gray-500">Format yang didukung: JPG, PNG, PDF (Maks. 5MB)</p>
                        </div>
                      </label>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-8 flex flex-col space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <motion.button
                    type="submit"
                    className="bg-[#6A0DAD] hover:bg-[#5A0C9D] text-white w-full py-6 rounded-md font-medium transition-all duration-300"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> Memproses...
                      </>
                    ) : (
                      "Kirim Pendaftaran"
                    )}
                  </motion.button>

                  <div className="text-center text-sm text-gray-500">
                    Dengan mendaftar, Anda menyetujui{" "}
                    <Link href="#" className="text-[#6A0DAD] hover:underline transition-colors duration-300">
                      Syarat & Ketentuan
                    </Link>{" "}
                    kami.
                  </div>
                </motion.div>
              </form>
            </CardContent>

            <CardFooter className="flex justify-center items-center bg-gray-50 rounded-b-lg p-6">
              <div className="w-full flex justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/">
                    <Button
                      variant="outline"
                      className="border-[#6A0DAD] text-[#6A0DAD] hover:bg-[#F0E6FF] transition-all duration-300 px-8"
                    >
                      Kembali ke Beranda
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

// Komponen halaman fallback ketika pendaftaran tidak aktif
function FallbackPage() {
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
        <h1 className="text-3xl font-bold text-[#6A0DAD] mb-4">Pendaftaran Belum Dibuka</h1>
        <p className="text-xl text-gray-700 mb-8">Tidak ada pendaftaran diadakan saat ini, sampai jumpa di IOT 2025.</p>
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
