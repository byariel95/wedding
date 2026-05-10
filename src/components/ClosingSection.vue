<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import weddingConfig from "@/config/weddingConfig";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);
const ctx = ref<gsap.Context | null>(null);

onMounted(() => {
  ctx.value = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "power3.out" },
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 60%",
        end: "center center",
        scrub: 1,
      },
    });

    tl.from(".closing-ornament-top", {
      autoAlpha: 0,
      scaleX: 0,
      ease: "power2.out",
    })
      .from(
        ".closing-line-1",
        { autoAlpha: 0, y: 40, duration: 1 },
        "-=0.7",
      )
      .from(
        ".closing-line-2",
        { autoAlpha: 0, y: 35, duration: 1 },
        "-=0.6",
      )
      .from(
        ".closing-ampersand",
        { autoAlpha: 0, scale: 0.8, y: 20, ease: "back.out(1.7)" },
        "-=0.5",
      )
      .from(
        ".closing-names",
        { autoAlpha: 0, y: 25 },
        "-=0.6",
      )
      .from(
        ".closing-ornament-bottom",
        { autoAlpha: 0, scaleX: 0, ease: "power2.out" },
        "-=0.7",
      );
  }, sectionRef.value!);
});

onUnmounted(() => {
  ctx.value?.revert();
});
</script>

<template>
  <section
    id="closing"
    ref="sectionRef"
    class="relative flex items-center justify-center min-h-screen w-full overflow-hidden"
    style="background: #1e2d4a;"
  >
    <!-- Vignette -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="
        background: radial-gradient(
          ellipse at center,
          transparent 45%,
          rgba(15, 22, 38, 0.6) 100%
        );
      "
    ></div>

    <!-- Content -->
    <div
      ref="textRef"
      class="relative z-10 text-center px-6 py-20 max-w-3xl mx-auto"
    >
      <!-- Top ornament -->
      <div class="closing-ornament-top mb-12 origin-center">
        <svg
          viewBox="0 0 280 20"
          xmlns="http://www.w3.org/2000/svg"
          class="w-full max-w-[280px] mx-auto h-5"
        >
          <line
            x1="0"
            y1="10"
            x2="100"
            y2="10"
            stroke="#D9BC9C"
            stroke-width="0.5"
            opacity="0.4"
          />
          <circle cx="140" cy="10" r="3" fill="#D9BC9C" opacity="0.8" />
          <line
            x1="180"
            y1="10"
            x2="280"
            y2="10"
            stroke="#D9BC9C"
            stroke-width="0.5"
            opacity="0.4"
          />
        </svg>
      </div>

      <!-- Main text -->
      <div class="closing-text mb-16">
        <p
          class="closing-line-1 font-body text-cream/90 leading-relaxed tracking-[0.15em] uppercase"
          style="font-size: clamp(13px, 2.5vw, 16px); letter-spacing: 0.22em;"
        >
          {{ weddingConfig.closingText.split(". ")[0] }}.
        </p>
        <p
          class="closing-line-2 font-body text-cream/90 leading-relaxed tracking-[0.15em] uppercase mt-4"
          style="font-size: clamp(13px, 2.5vw, 16px); letter-spacing: 0.22em;"
        >
          {{ weddingConfig.closingText.split(". ")[1] }}
        </p>
      </div>

      <!-- Ampersand -->
      <div class="closing-ampersand mb-8">
        <span
          class="font-display text-sand"
          style="font-size: clamp(2rem, 5vw, 3rem); opacity: 0.6; line-height: 1;"
        >&amp;</span>
      </div>

      <!-- Names -->
      <div class="closing-names">
        <p
          class="font-display text-sand font-light tracking-wide"
          style="font-size: clamp(1.4rem, 3.5vw, 2.2rem); letter-spacing: 0.15em; opacity: 0.85;"
        >
          {{ weddingConfig.bride.fullName }}
          <span class="mx-3" style="opacity: 0.4;">&amp;</span>
          {{ weddingConfig.groom.fullName }}
        </p>
      </div>

      <!-- Bottom ornament -->
      <div class="closing-ornament-bottom mt-16 origin-center">
        <svg
          viewBox="0 0 280 20"
          xmlns="http://www.w3.org/2000/svg"
          class="w-full max-w-[280px] mx-auto h-5"
        >
          <line
            x1="0"
            y1="10"
            x2="100"
            y2="10"
            stroke="#D9BC9C"
            stroke-width="0.5"
            opacity="0.4"
          />
          <circle cx="140" cy="10" r="3" fill="#D9BC9C" opacity="0.8" />
          <line
            x1="180"
            y1="10"
            x2="280"
            y2="10"
            stroke="#D9BC9C"
            stroke-width="0.5"
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.closing-ornament-top,
.closing-line-1,
.closing-line-2,
.closing-ampersand,
.closing-names,
.closing-ornament-bottom {
  will-change: transform, opacity;
}
</style>
