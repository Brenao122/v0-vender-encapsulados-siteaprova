"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, Star, Heart, Shield, Truck, Award, Clock, Zap, Leaf, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect } from "react"

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length)
  }

  const buyProduct = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      // Redirecionar para checkout com o produto selecionado
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Premium */}
      <header className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/20 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/images/pbd-logo.png" alt="PBD SUPLEMED" width={140} height={45} className="h-12 w-auto" />
              <div className="hidden md:block">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  PBD SUPLEMED
                </h1>
                <p className="text-sm text-slate-600 font-medium">Excelência em Suplementação</p>
              </div>
            </div>

            <nav className="hidden lg:flex space-x-10">
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

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-slate-600 font-medium">Atendimento</p>
                <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Premium
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Carousel */}
      <section className="relative h-[550px] sm:h-[600px] md:h-[700px] overflow-hidden">
        <div className="relative h-full">
          {products.map((product, index) => {
            // Background personalizado para cada produto
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
              <div
                key={product.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              >
                {/* Background personalizado para cada produto */}
                <div className={`absolute inset-0 ${getProductBackground(product.name)} z-0`}>
                  {/* Efeitos de luz animados */}
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                  {/* Overlay sutil */}
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Content Container */}
                <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center w-full min-h-[450px] sm:min-h-[500px] md:min-h-[600px]">
                    {/* Texto - Lado Esquerdo */}
                    <div className="text-center lg:text-left space-y-4 lg:space-y-8 order-2 lg:order-1 flex flex-col justify-center">
                      <div className="space-y-3 lg:space-y-6">
                        <Badge
                          className={`text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3 shadow-2xl ${getBadgeColor(product.badge)}`}
                        >
                          {product.badge}
                        </Badge>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight drop-shadow-2xl">
                          {product.name}
                        </h3>
                        <p className="text-lg md:text-xl lg:text-2xl text-white/95 leading-relaxed drop-shadow-lg max-w-2xl">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3 lg:gap-4 justify-center lg:justify-start">
                        {product.benefits.slice(0, 3).map((benefit, idx) => (
                          <span
                            key={idx}
                            className="text-sm lg:text-base bg-white/20 backdrop-blur-md px-4 lg:px-6 py-2 lg:py-3 rounded-full text-white border border-white/30 shadow-xl hover:bg-white/30 transition-all duration-300"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6 lg:gap-8 justify-center lg:justify-start">
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white drop-shadow-xl">
                          R$ {product.price.toFixed(2)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xl lg:text-2xl text-white/60 line-through drop-shadow-lg">
                            R$ {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <Button
                        onClick={() => buyProduct(product.id)}
                        size="lg"
                        className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 px-8 lg:px-12 py-5 lg:py-6 text-lg lg:text-xl font-black transition-all duration-500 hover:scale-105 shadow-2xl group w-full lg:w-auto"
                      >
                        <ShoppingCart className="w-6 lg:w-7 h-6 lg:h-7 mr-3 lg:mr-4 group-hover:rotate-12 transition-transform" />
                        COMPRAR AGORA
                        <ChevronRight className="w-5 lg:w-6 h-5 lg:h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>

                    {/* Imagem do produto - Lado Direito - AUMENTADA E POR CIMA */}
                    <div className="flex justify-center lg:justify-center order-1 lg:order-2 relative z-50">
                      <div className="relative group">
                        <div className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] xl:w-[600px] xl:h-[600px] relative flex items-center justify-center">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-contain group-hover:scale-105 transition-all duration-700 relative z-50"
                            style={{
                              filter:
                                "drop-shadow(0 30px 60px rgba(0, 0, 0, 0.7)) brightness(1.05) contrast(1.05) saturate(1.0)",
                            }}
                            priority={index === currentSlide}
                            quality={100}
                          />
                        </div>
                        {/* Efeitos de brilho personalizados por produto - ATRÁS DA IMAGEM */}
                        <div
                          className={`absolute inset-0 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 z-40 ${
                            product.name === "GLUTA IMUNITY"
                              ? "bg-gradient-to-r from-emerald-400/40 to-green-400/40"
                              : product.name === "LARANJA MORO"
                                ? "bg-gradient-to-r from-orange-400/40 to-amber-400/40"
                                : product.name === "RED SIZE"
                                  ? "bg-gradient-to-r from-red-400/40 to-rose-400/40"
                                  : "bg-gradient-to-r from-blue-400/40 to-cyan-400/40"
                          }`}
                        ></div>
                        <div
                          className={`absolute -inset-6 rounded-3xl blur-3xl animate-pulse z-30 ${
                            product.name === "GLUTA IMUNITY"
                              ? "bg-gradient-to-r from-emerald-500/30 to-green-500/30"
                              : product.name === "LARANJA MORO"
                                ? "bg-gradient-to-r from-orange-500/30 to-amber-500/30"
                                : product.name === "RED SIZE"
                                  ? "bg-gradient-to-r from-red-500/30 to-rose-500/30"
                                  : "bg-gradient-to-r from-blue-500/30 to-cyan-500/30"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Enhanced Navigation - posicionadas para não sobrepor as imagens */}
        <button
          onClick={prevSlide}
          className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 bg-white/15 backdrop-blur-md hover:bg-white/25 p-3 lg:p-4 rounded-2xl shadow-2xl transition-all duration-300 border border-white/30 group hover:scale-110 z-60"
        >
          <svg
            className="w-6 lg:w-8 h-6 lg:h-8 text-white group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 bg-white/15 backdrop-blur-md hover:bg-white/25 p-3 lg:p-4 rounded-2xl shadow-2xl transition-all duration-300 border border-white/30 group hover:scale-110 z-60"
        >
          <svg
            className="w-6 lg:w-8 h-6 lg:h-8 text-white group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Enhanced Indicators */}
        <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 lg:space-x-4 z-60">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 lg:w-4 h-3 lg:h-4 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "bg-white scale-125 lg:scale-150 shadow-2xl"
                  : "bg-white/50 hover:bg-white/80 hover:scale-110 lg:hover:scale-125"
              }`}
            />
          ))}
        </div>

        {/* Enhanced Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 lg:h-2 bg-white/10 z-60">
          <div
            className="h-full bg-gradient-to-r from-white/70 via-white/90 to-white/70 transition-all duration-5000 ease-linear shadow-lg"
            style={{ width: `${((currentSlide + 1) / products.length) * 100}%` }}
          ></div>
        </div>
      </section>

      {/* Enhanced Hero Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="space-y-8 max-w-5xl mx-auto">
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 text-lg font-semibold shadow-2xl">
              LINHA PREMIUM EXCLUSIVA
            </Badge>

            <h2 className="text-6xl lg:text-7xl font-black text-slate-900 leading-tight">
              Potencialize Sua{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Performance
              </span>{" "}
              e{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Saúde</span>
            </h2>

            <p className="text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
              Descubra a linha PBD SUPLEMED de suplementos premium desenvolvidos com{" "}
              <span className="font-bold text-blue-600">tecnologia avançada</span> e{" "}
              <span className="font-bold text-cyan-600">ingredientes de alta qualidade</span> para maximizar seus
              resultados.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-12 my-16">
            {[
              { icon: Shield, text: "Qualidade Garantida", color: "text-emerald-600" },
              { icon: Truck, text: "Entrega Express", color: "text-blue-600" },
              { icon: Award, text: "Fórmulas Exclusivas", color: "text-cyan-600" },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4 group">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-100 to-white rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <span className="text-xl text-slate-700 font-bold">{item.text}</span>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 group"
            onClick={() => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explorar Produtos Premium
            <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Enhanced Filter Section */}
      <section className="py-12 px-6 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
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
                className={`px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg ${
                  selectedCategory === category.key
                    ? `${category.color} hover:${category.color.replace("600", "700")} text-white shadow-2xl`
                    : "bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white text-slate-700"
                }`}
              >
                {category.icon && <category.icon className="w-5 h-5 mr-3" />}
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Products Section */}
      <section id="produtos" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-20 space-y-6">
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 text-lg font-semibold shadow-2xl">
              COLEÇÃO PREMIUM
            </Badge>
            <h3 className="text-5xl lg:text-6xl font-black text-slate-900">Linha PBD SUPLEMED</h3>
            <p className="text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Suplementos desenvolvidos com tecnologia avançada e ingredientes premium para resultados superiores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden hover:scale-105"
              >
                <CardHeader className="relative p-0">
                  {product.badge && (
                    <Badge
                      className={`absolute top-4 left-4 z-10 px-4 py-2 text-sm font-bold shadow-2xl ${getBadgeColor(product.badge)}`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 z-10 h-10 w-10 p-0 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full shadow-lg"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`w-5 h-5 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-slate-600"}`}
                    />
                  </Button>
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
                      />
                    ))}
                    <span className="text-sm text-slate-600 ml-2 font-medium">({product.reviews})</span>
                  </div>

                  <CardTitle className="text-xl font-bold text-blue-700 leading-tight">{product.name}</CardTitle>
                  <p className="text-sm text-slate-500 font-medium">{product.subtitle}</p>
                  <CardDescription className="text-base text-slate-600 leading-relaxed line-clamp-2">
                    {product.description}
                  </CardDescription>

                  <div className="space-y-2">
                    {product.benefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="flex items-center text-sm text-slate-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="line-clamp-1">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-slate-500 space-y-1">
                    <p className="font-semibold">Apresentação:</p>
                    <p className="line-clamp-1">{product.presentation}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-black text-blue-600">R$ {product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-lg text-slate-500 line-through">R$ {product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <div className="w-full">
                    <Button
                      onClick={() => buyProduct(product.id)}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 lg:py-5 text-lg lg:text-xl font-black rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 group"
                    >
                      <ShoppingCart className="w-5 lg:w-6 h-5 lg:h-6 mr-3 group-hover:rotate-12 transition-transform" />
                      COMPRAR AGORA
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Section with New Image */}
      <section id="sobre" className="py-24 px-6 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 text-lg font-semibold shadow-2xl">
                  EXCELÊNCIA CIENTÍFICA
                </Badge>
                <h3 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
                  Por que escolher{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                    PBD SUPLEMED
                  </span>
                  ?
                </h3>
                <p className="text-xl text-slate-600 leading-relaxed">
                  A PBD SUPLEMED é referência em desenvolver suplementos de alta performance com fórmulas exclusivas e
                  ingredientes premium, comprometida em oferecer produtos que realmente transformam resultados através
                  da ciência nutricional avançada.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Fórmulas Exclusivas",
                    description: "Produtos desenvolvidos com tecnologia avançada e ingredientes únicos certificados",
                    icon: "🧬",
                  },
                  {
                    title: "Máxima Concentração",
                    description: "Alta concentração de princípios ativos por dose para resultados superiores",
                    icon: "⚡",
                  },
                  {
                    title: "Segurança Garantida",
                    description: "Produtos testados em laboratório e aprovados para uso seguro e eficaz",
                    icon: "🛡️",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:scale-110 transition-all duration-300">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-slate-900">{item.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/images/pbd-about-lab.png"
                  alt="Laboratório PBD SUPLEMED - Ciência e Inovação"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
              {/* Enhanced Glow Effects */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contato"
        className="py-32 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20 space-y-8">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 text-lg font-bold shadow-2xl">
              ATENDIMENTO VIP EXCLUSIVO
            </Badge>
            <h3 className="text-6xl lg:text-7xl font-black text-white leading-tight">
              Suporte{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Premium</span>{" "}
              Personalizado
            </h3>
            <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Consultoria nutricional personalizada com nossos especialistas certificados. Atendimento diferenciado para
              resultados excepcionais e transformação garantida.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
            {/* Alessandro - Consultor Premium */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:bg-white/15 transition-all duration-500 group hover:scale-105">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-2xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="space-y-3">
                  <h4 className="text-3xl font-bold text-white">Alessandro</h4>
                  <p className="text-blue-300 font-semibold text-lg">Consultor Nutricional Premium</p>
                  <p className="text-slate-300 leading-relaxed">
                    Especialista em suplementação esportiva e performance. Atendimento personalizado para atletas e
                    entusiastas fitness com mais de 10 anos de experiência.
                  </p>
                </div>
                <a
                  href="tel:+5562996114758"
                  className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl group"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  (62) 9 9611-4758
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Breno - Especialista Técnico */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:bg-white/15 transition-all duration-500 group hover:scale-105">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-2xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div className="space-y-3">
                  <h4 className="text-3xl font-bold text-white">Breno Amancio</h4>
                  <p className="text-emerald-300 font-semibold text-lg">Especialista Técnico</p>
                  <p className="text-slate-300 leading-relaxed">
                    Expert em formulações e desenvolvimento de produtos. Orientação técnica sobre composição, benefícios
                    e protocolos de uso personalizados.
                  </p>
                </div>
                <a
                  href="tel:+5562981912294"
                  className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl group"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  (62) 9 8191-2294
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Email Premium */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:bg-white/15 transition-all duration-500 group hover:scale-105">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-2xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="space-y-3">
                  <h4 className="text-3xl font-bold text-white">Suporte Premium</h4>
                  <p className="text-purple-300 font-semibold text-lg">Atendimento Especializado</p>
                  <p className="text-slate-300 leading-relaxed">
                    Canal direto para dúvidas, pedidos especiais e suporte técnico. Resposta garantida em até 2 horas
                    úteis com nossa equipe especializada.
                  </p>
                </div>
                <a
                  href="mailto:contatosuplemed@gmail.com"
                  className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl group"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  contatosuplemed@gmail.com
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Premium Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "Resposta Imediata",
                desc: "Atendimento em até 2 horas",
                color: "from-yellow-400 to-orange-500",
              },
              {
                icon: Shield,
                title: "Consultoria Gratuita",
                desc: "Orientação nutricional inclusa",
                color: "from-green-400 to-emerald-500",
              },
              { icon: Truck, title: "Entrega Express", desc: "Receba em 24-48h", color: "from-blue-400 to-cyan-500" },
              {
                icon: Award,
                title: "Programa VIP",
                desc: "Benefícios exclusivos",
                color: "from-purple-400 to-pink-500",
              },
            ].map((service, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-2xl`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h5 className="text-white font-bold text-xl mb-3">{service.title}</h5>
                <p className="text-slate-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Guarantees Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-6">
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 text-lg font-semibold shadow-2xl">
              GARANTIAS PREMIUM
            </Badge>
            <h3 className="text-5xl lg:text-6xl font-black text-slate-900">
              Compromisso com a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Excelência
              </span>
            </h3>
            <p className="text-2xl text-slate-600 max-w-3xl mx-auto">
              Garantias exclusivas que demonstram nossa confiança total na qualidade e eficácia dos nossos produtos
              premium
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Shield,
                title: "Garantia de Resultados",
                description:
                  "30 dias para experimentar. Não ficou satisfeito? Devolvemos 100% do seu investimento sem questionamentos.",
                color: "from-emerald-500 to-teal-500",
              },
              {
                icon: Award,
                title: "Pureza Certificada",
                description:
                  "Produtos testados em laboratório internacional com certificação de pureza e potência garantidas.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Heart,
                title: "Suporte Vitalício",
                description:
                  "Acompanhamento personalizado e suporte nutricional durante toda sua jornada de transformação.",
                color: "from-purple-500 to-pink-500",
              },
            ].map((guarantee, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-100 hover:shadow-3xl transition-all duration-500 group hover:scale-105"
              >
                <div className="text-center space-y-6">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${guarantee.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-2xl`}
                  >
                    <guarantee.icon className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900">{guarantee.title}</h4>
                  <p className="text-slate-600 leading-relaxed text-lg">{guarantee.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white py-20 px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-8">
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/pbd-logo.png"
                  alt="PBD SUPLEMED"
                  width={140}
                  height={45}
                  className="h-12 w-auto brightness-0 invert"
                />
              </div>
              <div className="space-y-4">
                <h4 className="text-3xl font-bold">PBD SUPLEMED</h4>
                <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
                  Referência em suplementos premium no Brasil. Transformando vidas através da ciência nutricional
                  avançada e atendimento personalizado de excelência mundial.
                </p>
              </div>
              <div className="flex space-x-4">
                {[
                  { platform: "Instagram", color: "from-pink-500 to-purple-500" },
                  { platform: "Facebook", color: "from-blue-500 to-cyan-500" },
                  { platform: "YouTube", color: "from-red-500 to-pink-500" },
                  { platform: "LinkedIn", color: "from-blue-600 to-blue-700" },
                ].map((social, index) => (
                  <div
                    key={index}
                    className={`w-14 h-14 bg-gradient-to-r ${social.color} rounded-2xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-xl`}
                  >
                    <span className="text-white font-bold text-lg">{social.platform[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-2xl">Linha Premium</h4>
              <ul className="space-y-4 text-slate-300">
                {[
                  { name: "Imunidade Avançada", color: "bg-emerald-400" },
                  { name: "Termogênicos Elite", color: "bg-amber-400" },
                  { name: "Energia Performance", color: "bg-cyan-400" },
                  { name: "Antioxidantes Pro", color: "bg-purple-400" },
                ].map((product, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-blue-400 transition-colors flex items-center group">
                      <span
                        className={`w-3 h-3 ${product.color} rounded-full mr-4 group-hover:scale-125 transition-transform`}
                      ></span>
                      {product.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-2xl">Contato VIP</h4>
              <div className="space-y-6 text-slate-300">
                {[
                  { name: "Alessandro - Consultor", phone: "(62) 9 9611-4758", color: "bg-blue-500" },
                  { name: "Breno - Especialista", phone: "(62) 9 8191-2294", color: "bg-emerald-500" },
                ].map((contact, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`w-8 h-8 ${contact.color} rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg`}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-lg">{contact.name}</p>
                      <a
                        href={`tel:+55${contact.phone.replace(/\D/g, "")}`}
                        className="hover:text-blue-400 transition-colors"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                ))}

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-lg">Suporte Premium</p>
                    <a
                      href="mailto:contatosuplemed@gmail.com"
                      className="hover:text-blue-400 transition-colors text-sm"
                    >
                      contatosuplemed@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-lg">Sede Premium</p>
                    <p className="text-sm">Goiânia, GO - Brasil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-slate-400 text-lg">&copy; 2024 PBD SUPLEMED. Todos os direitos reservados.</p>
                <p className="text-sm text-slate-500 mt-2">
                  Produtos premium com certificação internacional. Este produto não é um medicamento.
                </p>
              </div>
              <div className="flex space-x-8 text-sm text-slate-400">
                <a href="#" className="hover:text-white transition-colors">
                  Política de Privacidade
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Termos de Uso
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Certificações
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
