"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ShoppingCart, Shield, Truck, Award, Clock, Zap, Leaf, ChevronRight, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// Atualizar as imagens dos produtos para usar as mesmas do carrossel
// Modificar o array de produtos para usar as imagens corretas

const products = [
  {
    id: 1,
    name: "GLUTA IMUNITY",
    subtitle: "Suplemento Alimentar de Glutamina em Pó",
    description:
      "Fórmula exclusiva composta por glutamina, cúrcuma e limão com propriedades imunomoduladoras, anti-inflamatórias e antioxidantes.",
    price: 89.9,
    originalPrice: 119.9,
    image: "/images/gluta-imunity-promo.jpg",
    cleanImage: "/images/gluta-imunity-clean.png",
    rating: 4.9,
    reviews: 234,
    benefits: [
      "Fortalece o sistema imunológico",
      "Reduz complicações infecciosas",
      "Normaliza integridade intestinal",
      "Aumenta barreira antioxidante",
    ],
    presentation: "Lata 300g sabor limão com frutas cítricas",
    usage: "1 medida dosadora (6,4g) em 200mL de água, pela manhã em jejum",
    badge: "Imunidade",
    category: "immunity",
    ingredients: "Glutamina, limão em pó, cúrcuma, aromatizante sintético idêntico ao natural",
    allergens: "Pode conter derivados de leite, soja e ovos. Não contém glúten.",
  },
  {
    id: 2,
    name: "LARANJA MORO",
    subtitle: "Suplemento Alimentar em Cápsulas",
    description:
      "Extrato de laranja moro rica em polifenóis e flavonoides, especialmente antocianinas, com propriedades anti-inflamatórias e antioxidantes.",
    price: 65.9,
    originalPrice: 89.9,
    image: "/images/laranja-moro-promo.jpg",
    cleanImage: "/images/laranja-moro-clean.png",
    rating: 4.8,
    reviews: 187,
    benefits: [
      "Controle do peso corporal",
      "Reduz inflamação",
      "Fortalece a imunidade",
      "Aumenta termogênese",
      "Melhora saúde cardiovascular",
    ],
    presentation: "Frasco com 60 cápsulas",
    usage: "1 cápsula ao dia ou conforme orientação médica",
    badge: "Antioxidante",
    category: "weight",
    ingredients: "Extrato de laranja moro (Citrus sinensis), dióxido de silício coloidal",
    allergens: "Pode conter derivados de soja, leite e ovos. Não contém glúten.",
  },
  {
    id: 3,
    name: "RED SIZE",
    subtitle: "Termogênico com Quitosana, Cafeína, Vitamina C e Cromo",
    description: "Termogênico auxiliar no processo de emagrecimento e mecanismos da fome e saciedade.",
    price: 75.9,
    originalPrice: 99.9,
    image: "/images/red-size-promo.jpg",
    cleanImage: "/images/red-size-clean.png",
    rating: 4.7,
    reviews: 156,
    benefits: [
      "Acelera o metabolismo",
      "Reduz peso e medidas",
      "Favorece funcionamento intestinal",
      "Energético e disposição",
      "Alta concentração de ativos",
    ],
    presentation: "Frasco com 150 cápsulas",
    usage: "2 cápsulas antes do café, 2 antes do almoço e 1 antes do jantar",
    badge: "Termogênico",
    category: "weight",
    ingredients: "Quitosana, cafeína, ácido ascórbico (vitamina C), picolinato de cromo",
    allergens: "Contém derivados de crustáceos. Pode conter leite, soja e ovos.",
  },
  {
    id: 4,
    name: "RED ONE ENERGY DRINK",
    subtitle: "Energético em Comprimidos Efervescentes",
    description:
      "Energético composto por cafeína, taurina e vitaminas do complexo B para rápida absorção e fácil preparo.",
    price: 42.9,
    originalPrice: 59.9,
    image: "/images/red-one-promo.jpg",
    cleanImage: "/images/red-one-clean.png",
    rating: 4.6,
    reviews: 203,
    benefits: [
      "Melhora desempenho físico",
      "Atenção e foco",
      "Mais disposição diária",
      "Rápida absorção",
      "Fácil preparo",
    ],
    presentation: "Cartucho com 10 comprimidos efervescentes",
    usage: "1 comprimido dissolvido em 200ml de água filtrada",
    badge: "Energia",
    category: "energy",
    ingredients: "Taurina, cafeína, guaraná em pó, vitaminas do complexo B",
    allergens: "Pode conter derivados de leite, ovo e soja. Não contém glúten.",
  },
]

export default function PbdSuplemedStore() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Otimização do autoplay do carrossel
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        handleNextSlide()
      }
    }, 5000)
    return () => clearInterval(timer)
  }, [currentSlide, isTransitioning])

  const handleNextSlide = useCallback(() => {
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % products.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [])

  const handlePrevSlide = useCallback(() => {
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [])

  const buyProduct = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      window.location.href = `/checkout?product=${productId}&name=${encodeURIComponent(product.name)}&price=${product.price}`
    }
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Imunidade":
        return "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25"
      case "Antioxidante":
        return "bg-amber-500 hover:bg-amber-600 shadow-amber-500/25"
      case "Termogênico":
        return "bg-rose-500 hover:bg-rose-600 shadow-rose-500/25"
      case "Energia":
        return "bg-blue-500 hover:bg-blue-600 shadow-blue-500/25"
      default:
        return "bg-slate-500 hover:bg-slate-600 shadow-slate-500/25"
    }
  }

  const getProductBackground = (productName: string) => {
    switch (productName) {
      case "GLUTA IMUNITY":
        return "bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900"
      case "LARANJA MORO":
        return "bg-gradient-to-br from-orange-900 via-amber-800 to-yellow-900"
      case "RED SIZE":
        return "bg-gradient-to-br from-red-900 via-rose-800 to-pink-900"
      case "RED ONE ENERGY DRINK":
        return "bg-gradient-to-br from-blue-900 via-cyan-800 to-indigo-900"
      default:
        return "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Premium */}
      <header className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Image
                src="/images/pbd-logo.png"
                alt="PBD SUPLEMED"
                width={120}
                height={40}
                className="h-8 sm:h-12 w-auto"
              />
              <div className="hidden md:block">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  PBD SUPLEMED
                </h1>
                <p className="text-xs lg:text-sm text-slate-600 font-medium">Excelência em Suplementação</p>
              </div>
            </div>

            <nav className="hidden lg:flex space-x-8 xl:space-x-10">
              <a
                href="#produtos"
                className="text-slate-700 hover:text-blue-600 font-semibold transition-all duration-300 relative group"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Produtos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#sobre"
                className="text-slate-700 hover:text-blue-600 font-semibold transition-all duration-300 relative group"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Sobre
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#contato"
                className="text-slate-700 hover:text-blue-600 font-semibold transition-all duration-300 relative group"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Contato
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>

            <div className="flex items-center space-x-3 sm:space-x-6">
              <div className="text-right">
                <p className="text-xs sm:text-sm text-slate-600 font-medium">Atendimento</p>
                <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Premium
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Carousel - OTIMIZADO */}
      <section className="relative overflow-hidden">
        <div className={`relative ${getProductBackground(products[currentSlide].name)}`}>
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="container mx-auto px-4 md:px-16 py-8 md:py-12 relative">
              <div className="flex items-center justify-between gap-8 md:gap-12">
                {/* Texto - Lado Esquerdo */}
                <div className="w-1/2 text-left space-y-4 md:space-y-6 z-10">
                  <Badge className={`text-sm px-4 py-2 shadow-2xl ${getBadgeColor(products[currentSlide].badge)}`}>
                    {products[currentSlide].badge}
                  </Badge>

                  <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight drop-shadow-2xl">
                    {products[currentSlide].name}
                  </h3>

                  <p className="text-base text-white/95 leading-relaxed drop-shadow-lg max-w-xl">
                    {products[currentSlide].description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {products[currentSlide].benefits.slice(0, 3).map((benefit, idx) => (
                      <span
                        key={idx}
                        className="text-sm bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white border border-white/30 shadow-xl"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-black text-white drop-shadow-xl">
                      R$ {products[currentSlide].price.toFixed(2)}
                    </span>
                    {products[currentSlide].originalPrice > products[currentSlide].price && (
                      <span className="text-base text-white/60 line-through drop-shadow-lg">
                        R$ {products[currentSlide].originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={() => buyProduct(products[currentSlide].id)}
                    size="lg"
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 px-6 py-3 text-sm font-bold transition-all duration-300 hover:scale-105 shadow-xl group"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    COMPRAR AGORA
                    <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Imagem - Lado Direito */}
                <div className="w-1/2 flex justify-center z-10">
                  <div className="relative w-full max-w-sm">
                    <div className="relative group">
                      {/* Sombras para efeito flutuante */}
                      <div
                        className={`absolute inset-0 rounded-2xl blur-3xl opacity-60 transform translate-y-8 scale-110 ${
                          products[currentSlide].name === "GLUTA IMUNITY"
                            ? "bg-gradient-to-br from-emerald-500/40 via-green-500/30 to-teal-500/40"
                            : products[currentSlide].name === "LARANJA MORO"
                              ? "bg-gradient-to-br from-orange-500/40 via-amber-500/30 to-yellow-500/40"
                              : products[currentSlide].name === "RED SIZE"
                                ? "bg-gradient-to-br from-red-500/40 via-rose-500/30 to-pink-500/40"
                                : "bg-gradient-to-br from-blue-500/40 via-cyan-500/30 to-indigo-500/40"
                        }`}
                      ></div>

                      <div className="aspect-square relative transform animate-float">
                        <Image
                          src={products[currentSlide].image || "/placeholder.svg"}
                          alt={products[currentSlide].name}
                          fill
                          className="object-cover rounded-2xl shadow-2xl relative z-10"
                          style={{
                            filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3)) brightness(1.05) contrast(1.05)",
                          }}
                          priority
                          quality={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Efeitos de Luz */}
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="relative min-h-screen flex flex-col">
              {/* Imagem - Parte Superior */}
              <div className="relative h-[55vh] flex items-center justify-center">
                <div className="relative w-full max-w-xs px-4">
                  <div className="relative group">
                    <div
                      className={`absolute inset-0 rounded-2xl blur-2xl opacity-50 transform translate-y-6 scale-110 ${
                        products[currentSlide].name === "GLUTA IMUNITY"
                          ? "bg-gradient-to-br from-emerald-500/30 to-teal-500/30"
                          : products[currentSlide].name === "LARANJA MORO"
                            ? "bg-gradient-to-br from-orange-500/30 to-yellow-500/30"
                            : products[currentSlide].name === "RED SIZE"
                              ? "bg-gradient-to-br from-red-500/30 to-pink-500/30"
                              : "bg-gradient-to-br from-blue-500/30 to-indigo-500/30"
                      }`}
                    ></div>

                    <div className="aspect-square relative transform animate-float">
                      <Image
                        src={products[currentSlide].image || "/placeholder.svg"}
                        alt={products[currentSlide].name}
                        fill
                        className="object-cover rounded-2xl shadow-2xl relative z-10"
                        style={{
                          filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.25)) brightness(1.05) contrast(1.05)",
                        }}
                        priority
                        quality={100}
                      />
                    </div>
                  </div>
                </div>

                <Badge
                  className={`absolute top-8 left-1/2 transform -translate-x-1/2 text-sm px-4 py-2 shadow-2xl z-20 ${getBadgeColor(products[currentSlide].badge)}`}
                >
                  {products[currentSlide].badge}
                </Badge>
              </div>

              {/* Conteúdo - Parte Inferior */}
              <div className="flex-1 bg-gradient-to-t from-black/20 to-transparent backdrop-blur-sm">
                <div className="px-6 py-8 text-center space-y-4">
                  <h3 className="text-2xl font-black text-white leading-tight drop-shadow-2xl">
                    {products[currentSlide].name}
                  </h3>

                  <p className="text-sm text-white/90 leading-relaxed drop-shadow-lg max-w-sm mx-auto">
                    {products[currentSlide].description.length > 80
                      ? products[currentSlide].description.substring(0, 80) + "..."
                      : products[currentSlide].description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
                    {products[currentSlide].benefits.slice(0, 4).map((benefit, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white/15 backdrop-blur-md px-3 py-2 rounded-full text-white border border-white/20 shadow-lg"
                      >
                        {benefit.length > 20 ? benefit.substring(0, 20) + "..." : benefit}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-3 py-2">
                    <span className="text-3xl font-black text-white drop-shadow-xl">
                      R$ {products[currentSlide].price.toFixed(2)}
                    </span>
                    {products[currentSlide].originalPrice > products[currentSlide].price && (
                      <span className="text-lg text-white/60 line-through drop-shadow-lg">
                        R$ {products[currentSlide].originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={() => buyProduct(products[currentSlide].id)}
                    size="lg"
                    className="w-full max-w-sm bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 px-6 py-4 text-base font-bold transition-all duration-300 hover:scale-105 shadow-xl group"
                  >
                    <ShoppingCart className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                    COMPRAR AGORA
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Botões de Navegação */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:px-4 z-20">
            <button
              onClick={handlePrevSlide}
              disabled={isTransitioning}
              className="bg-white/15 backdrop-blur-md hover:bg-white/25 p-3 rounded-xl shadow-xl border border-white/30 group hover:scale-110 transition-all duration-300 disabled:opacity-50"
              aria-label="Slide anterior"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNextSlide}
              disabled={isTransitioning}
              className="bg-white/15 backdrop-blur-md hover:bg-white/25 p-3 rounded-xl shadow-xl border border-white/30 group hover:scale-110 transition-all duration-300 disabled:opacity-50"
              aria-label="Próximo slide"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Barra de Loading Discreta */}
          <div className="absolute bottom-0 w-full px-4 md:px-16 pb-6 z-10">
            <div className="mx-auto max-w-2xl">
              <div className="h-1 bg-black/20 backdrop-blur-sm rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ease-out ${
                    products[currentSlide].name === "GLUTA IMUNITY"
                      ? "bg-gradient-to-r from-emerald-400/80 to-green-400/80"
                      : products[currentSlide].name === "LARANJA MORO"
                        ? "bg-gradient-to-r from-orange-400/80 to-amber-400/80"
                        : products[currentSlide].name === "RED SIZE"
                          ? "bg-gradient-to-r from-red-400/80 to-rose-400/80"
                          : "bg-gradient-to-r from-blue-400/80 to-cyan-400/80"
                  }`}
                  style={{
                    width: `${((currentSlide + 1) / products.length) * 100}%`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold shadow-2xl">
              LINHA PREMIUM EXCLUSIVA
            </Badge>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-tight">
              Potencialize Sua{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Performance
              </span>{" "}
              e{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Saúde</span>
            </h2>

            <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
              Descubra a linha PBD SUPLEMED de suplementos premium desenvolvidos com{" "}
              <span className="font-bold text-blue-600">tecnologia avançada</span> e{" "}
              <span className="font-bold text-cyan-600">ingredientes de alta qualidade</span> para maximizar seus
              resultados.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 my-12 sm:my-16">
            {[
              { icon: Shield, text: "Qualidade Garantida", color: "text-emerald-600" },
              { icon: Truck, text: "Entrega Express", color: "text-blue-600" },
              { icon: Award, text: "Fórmulas Exclusivas", color: "text-cyan-600" },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 sm:space-x-4 group">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-slate-100 to-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
                  <item.icon className={`w-6 sm:w-8 h-6 sm:h-8 ${item.color}`} />
                </div>
                <span className="text-lg sm:text-xl text-slate-700 font-bold">{item.text}</span>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-bold rounded-xl sm:rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 group"
            onClick={() => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explorar Produtos Premium
            <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Enhanced Filter Section */}
      <section className="py-4 sm:py-6 px-4 sm:px-6 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
            {[
              { key: "all", label: "Todos os Produtos", icon: null, color: "bg-slate-600" },
              { key: "immunity", label: "Imunidade", icon: Leaf, color: "bg-emerald-600" },
              { key: "weight", label: "Emagrecimento", icon: Zap, color: "bg-amber-600" },
              { key: "energy", label: "Energia", icon: Clock, color: "bg-blue-600" },
            ].map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg ${
                  selectedCategory === category.key
                    ? `${category.color} hover:${category.color.replace("600", "700")} text-white shadow-2xl`
                    : "bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white text-slate-700"
                }`}
              >
                {category.icon && <category.icon className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3" />}
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">{category.label.split(" ")[0]}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO DE PRODUTOS COMPLETA */}
      <section
        id="produtos"
        className="py-8 sm:py-12 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-white to-blue-50"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16 sm:mb-20 space-y-4 sm:space-y-6">
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold shadow-2xl">
              COLEÇÃO PREMIUM
            </Badge>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900">Linha PBD SUPLEMED</h3>
          </div>

          {/* Grid de Produtos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-slate-200 hover:border-slate-300 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                {/* Badge do Produto */}
                <Badge
                  className={`absolute top-4 left-4 z-10 text-xs px-3 py-1 shadow-xl ${getBadgeColor(product.badge)}`}
                >
                  {product.badge}
                </Badge>

                {/* Botão de Favorito */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
                  aria-label="Adicionar aos favoritos"
                >
                  <Heart
                    className={`w-5 h-5 transition-all duration-300 ${
                      favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-slate-400 hover:text-red-500"
                    }`}
                  />
                </button>

                {/* Imagem do Produto - Usando a mesma imagem do carrossel */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-all duration-700"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Nome e Avaliação */}
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">{product.name}</h4>
                    <p className="text-sm text-slate-600 mb-2">{product.subtitle}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-200 text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Descrição */}
                  <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>

                  {/* Benefícios */}
                  <div className="flex flex-wrap gap-1">
                    {product.benefits.slice(0, 2).map((benefit, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600 border border-slate-200"
                      >
                        {benefit.length > 20 ? benefit.substring(0, 20) + "..." : benefit}
                      </span>
                    ))}
                  </div>

                  {/* Preço e Botão */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-black text-slate-900">R$ {product.price.toFixed(2)}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-slate-500 line-through ml-2">
                            R$ {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {product.originalPrice > product.price && (
                        <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>

                    <Button
                      onClick={() => buyProduct(product.id)}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                      COMPRAR AGORA
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Sobre */}
      <section id="sobre" className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 text-lg font-semibold shadow-xl">
                SOBRE NÓS
              </Badge>
              <h3 className="text-4xl sm:text-5xl font-black text-slate-900">
                Excelência em{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  Suplementação
                </span>
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                A PBD SUPLEMED é líder no mercado de suplementos premium, comprometida com a qualidade e inovação.
                Nossos produtos são desenvolvidos com tecnologia de ponta e ingredientes selecionados para proporcionar
                os melhores resultados.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-blue-600">10+</h4>
                  <p className="text-slate-600">Anos de Experiência</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-cyan-600">50k+</h4>
                  <p className="text-slate-600">Clientes Satisfeitos</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/pbd-about-lab.png"
                alt="Laboratório PBD SUPLEMED"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Contato */}
      <section
        id="contato"
        className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white"
      >
        <div className="container mx-auto text-center">
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 text-lg font-semibold shadow-xl mb-8">
            FALE CONOSCO
          </Badge>
          <h3 className="text-4xl sm:text-5xl font-black mb-6">Entre em Contato</h3>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Estamos aqui para ajudar você a alcançar seus objetivos. Entre em contato com nossa equipe especializada.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-2">WhatsApp</h4>
              <p className="text-white/80">(11) 99999-9999</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-2">E-mail</h4>
              <p className="text-white/80">contato@pbdsuplemed.com.br</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-2">Horário</h4>
              <p className="text-white/80">Seg-Sex: 8h às 18h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-white/60">© 2024 PBD SUPLEMED. Todos os direitos reservados.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
