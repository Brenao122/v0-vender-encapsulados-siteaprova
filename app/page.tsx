"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, Shield, Truck, Award, Clock, Zap, Leaf, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
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

      {/* Premium Carousel - TEXTOS E BOTÕES REDUZIDOS EM 40% */}
      <section className="relative h-auto md:h-[625px] overflow-hidden">
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
                className={`transition-all duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 absolute inset-0"
                }`}
              >
                {/* Background personalizado para cada produto */}
                <div className={`${getProductBackground(product.name)} z-0`}>
                  {/* Efeitos de luz animados */}
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                  {/* Overlay sutil */}
                  <div className="absolute inset-0 bg-black/10"></div>

                  {/* LAYOUT MOBILE (até md) - TEXTOS E BOTÕES REDUZIDOS EM 40% */}
                  <div className="md:hidden flex flex-col">
                    {/* Imagem do produto - Agora em tamanho completo no topo */}
                    <div className="w-full h-[40vh] relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                        style={{
                          filter: "brightness(0.9) contrast(1.1)",
                        }}
                        priority={index === currentSlide}
                        quality={100}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>

                      {/* Badge posicionada no canto superior - REDUZIDA 40% */}
                      <Badge
                        className={`absolute top-4 left-4 text-[7px] px-2 py-0.5 shadow-xl ${getBadgeColor(product.badge)}`}
                      >
                        {product.badge}
                      </Badge>
                    </div>

                    {/* Conteúdo de texto - Agora em card flutuante sobre a imagem - TEXTOS REDUZIDOS 40% */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-t-3xl -mt-6 relative z-10 px-3 pt-4 pb-5 flex flex-col items-center">
                      <h3 className="text-sm font-black text-white mb-1 text-center">{product.name}</h3>

                      <p className="text-[8px] text-white/90 mb-2 text-center max-w-xs">
                        {product.description.length > 60
                          ? product.description.substring(0, 60) + "..."
                          : product.description}
                      </p>

                      {/* Benefícios em chips horizontais - REDUZIDOS 40% */}
                      <div className="flex flex-wrap gap-1 justify-center mb-3">
                        {product.benefits.slice(0, 2).map((benefit, idx) => (
                          <span
                            key={idx}
                            className="text-[7px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-white border border-white/30 shadow-lg"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>

                      {/* Preço e botão em layout horizontal - REDUZIDOS 40% */}
                      <div className="flex items-center justify-between w-full max-w-xs">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-white">R$ {product.price.toFixed(2)}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-[8px] text-white/60 line-through">
                              R$ {product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        <Button
                          onClick={() => buyProduct(product.id)}
                          size="sm"
                          className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 px-2 py-1 text-[8px] font-bold transition-all duration-300 hover:scale-105 shadow-xl"
                        >
                          <ShoppingCart className="w-2.5 h-2.5 mr-1" />
                          COMPRAR
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* LAYOUT DESKTOP (md+) - TEXTOS E BOTÕES REDUZIDOS EM 40% */}
                  <div className="hidden md:grid md:grid-cols-2 gap-16 items-center w-full h-full container mx-auto px-4 sm:px-6">
                    {/* Texto - Lado Esquerdo - REDUZIDO 40% */}
                    <div className="text-center lg:text-left space-y-4 lg:space-y-5 flex flex-col justify-center">
                      <div className="space-y-2 lg:space-y-4">
                        <Badge className={`text-sm px-4 py-2 shadow-2xl ${getBadgeColor(product.badge)}`}>
                          {product.badge}
                        </Badge>
                        <h3 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-black text-white leading-tight drop-shadow-2xl">
                          {product.name}
                        </h3>
                        <p className="text-sm lg:text-base xl:text-lg text-white/95 leading-relaxed drop-shadow-lg max-w-2xl">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 lg:gap-3 justify-center lg:justify-start">
                        {product.benefits.slice(0, 3).map((benefit, idx) => (
                          <span
                            key={idx}
                            className="text-xs lg:text-sm bg-white/20 backdrop-blur-md px-3 lg:px-4 py-1 lg:py-2 rounded-full text-white border border-white/30 shadow-xl hover:bg-white/30 transition-all duration-300"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 lg:gap-5 justify-center lg:justify-start">
                        <span className="text-xl lg:text-2xl font-black text-white drop-shadow-xl">
                          R$ {product.price.toFixed(2)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm lg:text-lg text-white/60 line-through drop-shadow-lg">
                            R$ {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <Button
                        onClick={() => buyProduct(product.id)}
                        size="lg"
                        className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 px-5 lg:px-7 py-2 lg:py-4 text-sm lg:text-base font-black transition-all duration-500 hover:scale-105 shadow-2xl group w-full lg:w-auto"
                      >
                        <ShoppingCart className="w-4 lg:w-5 h-4 lg:h-5 mr-2 lg:mr-3 group-hover:rotate-12 transition-transform" />
                        COMPRAR AGORA
                        <ChevronRight className="w-3 lg:w-4 h-3 lg:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>

                    {/* Imagem do produto - Lado Direito */}
                    <div className="flex justify-center relative z-50 w-full overflow-hidden">
                      <div className="relative group w-full max-w-[320px] lg:max-w-[400px] xl:max-w-[450px] 2xl:max-w-[500px]">
                        <div className="w-full aspect-square relative flex items-center justify-center">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-all duration-700 relative z-50 rounded-3xl"
                            style={{
                              filter:
                                "drop-shadow(0 30px 60px rgba(0, 0, 0, 0.7)) brightness(1.05) contrast(1.05) saturate(1.0)",
                            }}
                            priority={index === currentSlide}
                            quality={100}
                          />
                        </div>
                        {/* Efeitos de brilho personalizados por produto */}
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

        {/* Barra de Progresso Moderna */}
        <div className="absolute bottom-0 left-0 right-0 z-50">
          {/* Background da barra */}
          <div className="h-1 bg-black/20 backdrop-blur-sm">
            {/* Barra de progresso ativa */}
            <div
              className="h-full bg-gradient-to-r from-white/80 to-white transition-all duration-1000 ease-out shadow-lg"
              style={{
                width: `${((currentSlide + 1) / products.length) * 100}%`,
              }}
            />
          </div>

          {/* Indicador de slide atual (opcional) */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full">
            <span className="text-white text-xs font-medium">
              {currentSlide + 1} / {products.length}
            </span>
          </div>
        </div>

        {/* Botões de navegação - Visíveis apenas em desktop */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 bg-white/15 backdrop-blur-md hover:bg-white/25 p-2 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-2xl transition-all duration-300 border border-white/30 group hover:scale-110 z-60 hidden md:block"
          aria-label="Slide anterior"
        >
          <svg
            className="w-5 sm:w-6 lg:w-8 h-5 sm:h-6 lg:h-8 text-white group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 bg-white/15 backdrop-blur-md hover:bg-white/25 p-2 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-2xl transition-all duration-300 border border-white/30 group hover:scale-110 z-60 hidden md:block"
          aria-label="Próximo slide"
        >
          <svg
            className="w-5 sm:w-6 lg:w-8 h-5 sm:h-6 lg:h-8 text-white group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Enhanced Hero Section - CONTINUIDADE VISUAL */}
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

      {/* Enhanced Filter Section - CONTINUIDADE VISUAL */}
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

      {/* Enhanced Products Section - CONTINUIDADE VISUAL */}
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
        </div>
      </section>
    </div>
  )
}
