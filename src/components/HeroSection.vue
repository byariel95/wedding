<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import weddingConfig from "@/config/weddingConfig";

const sectionRef = ref<HTMLElement | null>(null);
const ctx = ref<gsap.Context | null>(null);

const formattedDate = computed(() => {
  const date = new Date(weddingConfig.weddingDate);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return `${date.getDate()} · ${months[date.getMonth()]} · ${date.getFullYear()}`;
});

onMounted(() => {
  ctx.value = gsap.context(() => {
    // Timeline secuencial del hero (auto-play al cargar)
    const tl = gsap.timeline({
      defaults: { duration: 0.9, ease: "power3.out" },
    });

    tl.from(".hero-top-line", {
      scaleX: 0,
      autoAlpha: 0,
      duration: 1.4,
    })
      .from(".hero-label", { autoAlpha: 0, y: -12, ease: "power2.out" }, "-=0.9")
      .from(".hero-name", {
        autoAlpha: 0,
        y: 50,
        duration: 1.4,
        stagger: 0.18,
      }, "-=0.6")
      .from(".hero-ornament", {
        autoAlpha: 0,
        scaleX: 0,
        duration: 1.1,
        ease: "power2.out",
      }, "-=0.8")
      .from(".hero-date", { autoAlpha: 0, y: 18, ease: "power2.out" }, "-=0.6")
      .from(".hero-subtitle", { autoAlpha: 0, y: 14, ease: "power2.out" }, "-=0.6")
      .from(".hero-bottom", { autoAlpha: 0, ease: "power2.out" }, "-=0.5");

    // Bounce continuo del scroll arrow (loop independiente)
    gsap.to(".hero-scroll-arrow", {
      y: 8,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: tl.duration() + 0.3,
    });
  }, sectionRef.value!);
});

onUnmounted(() => {
  ctx.value?.revert();
});
</script>

<template>
  <section
    id="hero"
    ref="sectionRef"
    class="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
    style="
      background: linear-gradient(
        155deg,
        #1e2d4a 0%,
        #2c395c 45%,
        #344668 100%
      );
    "
  >
    <!-- Noise texture overlay for depth -->
    <div
      class="absolute inset-0 pointer-events-none opacity-[0.04]"
      style="
        background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E&quot;);
        background-size: 200px 200px;
      "
    ></div>

    <!-- Vignette edges -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="
        background: radial-gradient(
          ellipse at center,
          transparent 55%,
          rgba(15, 22, 38, 0.55) 100%
        );
      "
    ></div>

    <!-- Radial gold glow behind names -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
      style="
        background: radial-gradient(
          ellipse,
          rgba(217, 188, 156, 0.07) 0%,
          transparent 70%
        );
      "
    ></div>

    <!-- Thin gold horizontal line top -->
    <div
      class="hero-top-line absolute top-0 left-0 right-0 h-px origin-left"
      style="
        background: linear-gradient(
          90deg,
          transparent,
          #d9bc9c 30%,
          #d9bc9c 70%,
          transparent
        );
      "
    ></div>

    <!-- Main content -->
    <div
      class="relative z-10 flex flex-col items-center text-center px-6 py-20 w-full max-w-4xl mx-auto"
    >
      <!-- Eyebrow label -->

      <!-- Groom name -->
      <h1
        class="hero-name font-display font-light text-cream leading-none"
        style="
          font-size: clamp(2.8rem, 8vw, 6.5rem);
          letter-spacing: 0.04em;
          text-shadow: 0 2px 60px rgba(217, 188, 156, 0.18);
        "
      >
        {{ weddingConfig.bride.fullName }}
      </h1>

      <!-- Ampersand -->
      <div
        class="hero-name my-3 md:my-5 flex items-center gap-5 w-full max-w-xs md:max-w-md"
      >
        <div
          class="flex-1 h-px"
          style="
            background: linear-gradient(
              90deg,
              transparent,
              rgba(217, 188, 156, 0.35)
            );
          "
        ></div>
        <span
          class="font-display text-sand"
          style="
            font-size: clamp(1.8rem, 4vw, 3rem);
            opacity: 0.75;
            line-height: 1;
          "
          >&amp;</span
        >
        <div
          class="flex-1 h-px"
          style="
            background: linear-gradient(
              90deg,
              rgba(217, 188, 156, 0.35),
              transparent
            );
          "
        ></div>
      </div>

      <!-- Bride name -->
      <h1
        class="hero-name font-display font-light text-cream leading-none"
        style="
          font-size: clamp(2.8rem, 8vw, 6.5rem);
          letter-spacing: 0.04em;
          text-shadow: 0 2px 60px rgba(217, 188, 156, 0.18);
        "
      >
        {{ weddingConfig.groom.fullName }}
      </h1>

      <!-- Ornamental separator -->
      <div
        class="hero-ornament mt-10 mb-7 origin-center"
        style="width: min(360px, 88vw)"
      >
        <svg
          viewBox="0 0 360 28"
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-7"
        >
          <line
            x1="0"
            y1="14"
            x2="126"
            y2="14"
            stroke="#D9BC9C"
            stroke-width="0.6"
            opacity="0.5"
          />
          <line
            x1="0"
            y1="14"
            x2="80"
            y2="14"
            stroke="#D9BC9C"
            stroke-width="0.6"
            opacity="0.3"
          />
          <!-- Left leaf -->
          <path
            d="M134 14 C138 8, 144 7, 150 10 C144 13, 138 14, 134 14Z"
            fill="#D9BC9C"
            opacity="0.55"
          />
          <!-- Center diamond -->
          <rect
            x="172"
            y="9"
            width="10"
            height="10"
            rx="1"
            fill="#D9BC9C"
            opacity="0.9"
            transform="rotate(45 177 14)"
          />
          <rect
            x="174"
            y="11"
            width="6"
            height="6"
            rx="0.5"
            fill="none"
            stroke="#D9BC9C"
            stroke-width="0.5"
            opacity="0.4"
            transform="rotate(45 177 14)"
          />
          <!-- Right leaf -->
          <path
            d="M226 14 C222 8, 216 7, 210 10 C216 13, 222 14, 226 14Z"
            fill="#D9BC9C"
            opacity="0.55"
          />
          <line
            x1="234"
            y1="14"
            x2="360"
            y2="14"
            stroke="#D9BC9C"
            stroke-width="0.6"
            opacity="0.5"
          />
          <line
            x1="280"
            y1="14"
            x2="360"
            y2="14"
            stroke="#D9BC9C"
            stroke-width="0.6"
            opacity="0.3"
          />
          <!-- Accent dots -->
          <circle cx="160" cy="14" r="1.5" fill="#D9BC9C" opacity="0.5" />
          <circle cx="200" cy="14" r="1.5" fill="#D9BC9C" opacity="0.5" />
        </svg>
      </div>

      <!-- Date -->
      <p
        class="hero-date font-display text-sand tracking-[0.22em] uppercase"
        style="font-size: clamp(0.85rem, 2.2vw, 1.15rem); opacity: 0.9"
      >
        {{ formattedDate }}
      </p>

      <!-- Subtitle -->

      <!-- Hashtag -->
      <p
        v-if="weddingConfig.hashtag"
        class="hero-subtitle font-body text-sand/35 text-xs mt-3 tracking-[0.3em]"
      >
        {{ weddingConfig.hashtag }}
      </p>
    </div>

    <!-- Bottom scroll indicator -->
    <div class="hero-bottom absolute bottom-8 flex flex-col items-center gap-2">
      <p class="font-body text-sand/30 text-[10px] tracking-[0.4em] uppercase">
        Desliza
      </p>
      <div class="hero-scroll-arrow flex flex-col items-center">
        <svg
          width="18"
          height="28"
          viewBox="0 0 18 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="6.5"
            y="0"
            width="5"
            height="12"
            rx="2.5"
            stroke="#D9BC9C"
            stroke-width="1"
            opacity="0.35"
          />
          <circle cx="9" cy="4" r="1.5" fill="#D9BC9C" opacity="0.5" />
          <path
            d="M4 18L9 23L14 18"
            stroke="#D9BC9C"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            opacity="0.4"
          />
        </svg>
      </div>
    </div>

    <!-- Thin gold line bottom -->
    <div
      class="absolute bottom-0 left-0 right-0 h-px"
      style="
        background: linear-gradient(
          90deg,
          transparent,
          rgba(217, 188, 156, 0.25) 30%,
          rgba(217, 188, 156, 0.25) 70%,
          transparent
        );
      "
    ></div>
  </section>
</template>

<style scoped>
.hero-top-line,
.hero-label,
.hero-name,
.hero-ornament,
.hero-date,
.hero-subtitle,
.hero-bottom {
  will-change: transform, opacity;
}
</style>
