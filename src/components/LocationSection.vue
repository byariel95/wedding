<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import weddingConfig from '@/config/weddingConfig'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const ctx = ref<gsap.Context | null>(null)

const { lat, lng } = weddingConfig.venue

const mapEmbedUrl = computed(() =>
  `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed&hl=es`
)

function getNavigationUrl(): string {
  const ua = navigator.userAgent
  if (/iPad|iPhone|iPod/.test(ua)) return `maps://maps.apple.com/?daddr=${lat},${lng}`
  if (/Android/.test(ua)) return `geo:${lat},${lng}?q=${lat},${lng}`
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}

function openNavigation(): void { window.open(getNavigationUrl(), '_blank', 'noopener,noreferrer') }
function openWaze(): void { window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, '_blank', 'noopener,noreferrer') }

onMounted(() => {
  ctx.value = gsap.context(() => {
    gsap.from('.location-header', {
      opacity: 0, y: 35, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.location-header', start: 'top 88%' },
    })
    gsap.from('.location-map-wrapper', {
      opacity: 0, y: 50, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.location-map-wrapper', start: 'top 88%' },
    })
    gsap.from('.location-card', {
      opacity: 0, y: 30, duration: 0.9, ease: 'power2.out', delay: 0.15,
      scrollTrigger: { trigger: '.location-card', start: 'top 90%' },
    })
  }, sectionRef.value!)
})

onUnmounted(() => { ctx.value?.revert() })
</script>

<template>
  <section
    id="location"
    ref="sectionRef"
    class="py-24 md:py-32 relative overflow-hidden"
    style="background: #FCF4EF;"
  >
    <!-- Background wash -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse at 50% 100%, rgba(166,187,206,0.12) 0%, transparent 65%);"
    ></div>

    <div class="relative z-10 max-w-4xl mx-auto px-6">

      <!-- Header -->
      <div class="location-header text-center mb-14">
        <p class="font-body text-sand/60 text-xs tracking-[0.35em] uppercase mb-3">El lugar</p>
        <h2 class="font-display text-navy font-light tracking-wide mb-5" style="font-size: clamp(2.4rem, 6vw, 3.8rem);">
          ¿Cómo llegar?
        </h2>
        <div class="flex items-center justify-center gap-3">
          <div class="h-px w-16 md:w-24" style="background: linear-gradient(90deg, transparent, #D9BC9C);"></div>
          <svg width="38" height="14" viewBox="0 0 38 14" fill="none">
            <path d="M4 7 Q9 1, 14 7 Q19 13, 24 7 Q29 1, 34 7" stroke="#D9BC9C" stroke-width="0.9" fill="none" opacity="0.8"/>
            <circle cx="19" cy="7" r="2" fill="#D9BC9C" opacity="0.9"/>
          </svg>
          <div class="h-px w-16 md:w-24" style="background: linear-gradient(90deg, #D9BC9C, transparent);"></div>
        </div>
      </div>

      <!-- Map + floating info card layout -->
      <div class="location-map-wrapper relative">
        <!-- Map iframe -->
        <div
          class="rounded-2xl overflow-hidden w-full"
          style="height: 460px; box-shadow: 0 20px 60px rgba(44,57,92,0.15), 0 0 0 1px rgba(217,188,156,0.2);"
        >
          <iframe
            :src="mapEmbedUrl"
            width="100%"
            height="100%"
            style="border: 0; display: block; filter: contrast(1.02) saturate(0.9);"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :title="`Ubicación de ${weddingConfig.venue.name}`"
          ></iframe>
        </div>

        <!-- Floating venue card — anchored bottom-left over the map -->
        <div
          class="location-card absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs rounded-xl p-5"
          style="
            background: rgba(252,244,239,0.95);
            backdrop-filter: blur(12px);
            box-shadow: 0 8px 32px rgba(44,57,92,0.18), 0 0 0 1px rgba(217,188,156,0.3);
          "
        >
          <!-- Venue name -->
          <div class="flex items-start gap-3 mb-3">
            <div class="mt-0.5 flex-shrink-0">
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <path d="M8 0C3.582 0 0 3.582 0 8c0 5.5 8 12 8 12s8-6.5 8-12c0-4.418-3.582-8-8-8z" fill="#2C395C" opacity="0.9"/>
                <circle cx="8" cy="8" r="2.5" fill="#D9BC9C"/>
              </svg>
            </div>
            <div>
              <p class="font-display text-navy font-light leading-tight" style="font-size: 1.05rem;">
                {{ weddingConfig.venue.name }}
              </p>
              <p class="font-body text-slate/60 text-xs mt-0.5 leading-snug">{{ weddingConfig.venue.address }}</p>
              <p class="font-body text-slate/60 text-xs">{{ weddingConfig.venue.city }}</p>
            </div>
          </div>

          <!-- Thin sand rule -->
          <div class="h-px mb-4" style="background: linear-gradient(90deg, rgba(217,188,156,0.5), transparent);"></div>

          <!-- Buttons -->
          <div class="flex gap-2">
            <button
              class="flex-1 font-body font-medium text-cream rounded-lg py-2.5 text-[10px] uppercase tracking-widest transition-opacity duration-200 hover:opacity-85 cursor-pointer flex items-center justify-center gap-1.5"
              style="background: #2C395C;"
              @click="openNavigation"
            >
              <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
                <path d="M10 2l2.5 5 5.5.8-4 3.9.95 5.5L10 14.5l-4.95 2.7.95-5.5L2 7.8l5.5-.8L10 2z" fill="#D9BC9C"/>
              </svg>
              Cómo llegar
            </button>
            <button
              class="flex-1 font-body font-medium rounded-lg py-2.5 text-[10px] uppercase tracking-widest transition-colors duration-200 hover:bg-sand/10 cursor-pointer"
              style="border: 1px solid rgba(217,188,156,0.6); color: #D9BC9C;"
              @click="openWaze"
            >
              Waze
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
