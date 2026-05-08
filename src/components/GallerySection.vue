<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import weddingConfig from '@/config/weddingConfig'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const currentIndex = ref(0)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const isTransitioning = ref(false)
const ctx = ref<gsap.Context | null>(null)

let autoplayTimer: ReturnType<typeof setInterval> | null = null

const photos = weddingConfig.photos
const totalPhotos = computed(() => photos.length)

function goToSlide(index: number): void {
  if (isTransitioning.value || index === currentIndex.value) return
  if (totalPhotos.value === 0) return

  isTransitioning.value = true
  const direction = index > currentIndex.value ? 1 : -1

  gsap.to('.gallery-main-img', {
    opacity: 0,
    x: -40 * direction,
    duration: 0.45,
    ease: 'power2.in',
    onComplete: () => {
      currentIndex.value = ((index % totalPhotos.value) + totalPhotos.value) % totalPhotos.value
      gsap.fromTo(
        '.gallery-main-img',
        { opacity: 0, x: 40 * direction },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
          ease: 'power2.out',
          onComplete: () => { isTransitioning.value = false },
        },
      )
    },
  })
}

function nextSlide(): void { goToSlide((currentIndex.value + 1) % totalPhotos.value) }
function prevSlide(): void { goToSlide((currentIndex.value - 1 + totalPhotos.value) % totalPhotos.value) }

function openLightbox(index: number): void {
  lightboxIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox(): void {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function startAutoplay(): void {
  if (totalPhotos.value <= 1) return
  autoplayTimer = setInterval(nextSlide, 4000)
}

function stopAutoplay(): void {
  if (autoplayTimer !== null) { clearInterval(autoplayTimer); autoplayTimer = null }
}

function handleKeydown(e: KeyboardEvent): void {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowRight') lightboxIndex.value = (lightboxIndex.value + 1) % totalPhotos.value
  else if (e.key === 'ArrowLeft') lightboxIndex.value = (lightboxIndex.value - 1 + totalPhotos.value) % totalPhotos.value
}

onMounted(() => {
  startAutoplay()
  window.addEventListener('keydown', handleKeydown)

  ctx.value = gsap.context(() => {
    gsap.from('.gallery-header', {
      opacity: 0, y: 35, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.gallery-header', start: 'top 88%' },
    })
    gsap.from('.gallery-frame', {
      opacity: 0, y: 50, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.gallery-frame', start: 'top 88%' },
    })
    gsap.from('.gallery-strip', {
      opacity: 0, y: 20, duration: 0.9, ease: 'power2.out', delay: 0.15,
      scrollTrigger: { trigger: '.gallery-strip', start: 'top 92%' },
    })
  }, sectionRef.value!)
})

onUnmounted(() => {
  stopAutoplay()
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
  ctx.value?.revert()
})
</script>

<template>
  <section
    id="gallery"
    ref="sectionRef"
    class="py-24 md:py-32 overflow-hidden"
    style="background: #FCF4EF;"
  >
    <div class="max-w-5xl mx-auto px-6">

      <!-- Header -->
      <div class="gallery-header text-center mb-14">
        <p class="font-body text-sand/70 text-xs tracking-[0.35em] uppercase mb-3">Nuestra</p>
        <h2 class="font-display text-navy font-light tracking-wide mb-5" style="font-size: clamp(2.4rem, 6vw, 3.8rem);">
          Historia
        </h2>
        <!-- Ornament -->
        <div class="flex items-center justify-center gap-3">
          <div class="h-px w-16 md:w-24" style="background: linear-gradient(90deg, transparent, #D9BC9C);"></div>
          <svg width="38" height="14" viewBox="0 0 38 14" fill="none">
            <path d="M4 7 Q9 1, 14 7 Q19 13, 24 7 Q29 1, 34 7" stroke="#D9BC9C" stroke-width="0.9" fill="none" opacity="0.8"/>
            <circle cx="19" cy="7" r="2" fill="#D9BC9C" opacity="0.9"/>
          </svg>
          <div class="h-px w-16 md:w-24" style="background: linear-gradient(90deg, #D9BC9C, transparent);"></div>
        </div>
      </div>

      <!-- Main carousel frame -->
      <div
        class="gallery-frame relative"
        @mouseenter="stopAutoplay"
        @mouseleave="startAutoplay"
      >
        <!-- Photo wrapper — elegant portrait-ish ratio -->
        <div
          class="relative overflow-hidden rounded-xl"
          style="aspect-ratio: 4/3; box-shadow: 0 20px 70px rgba(44,57,92,0.18), 0 4px 16px rgba(44,57,92,0.10);"
        >
          <!-- Subtle inner frame -->
          <div class="absolute inset-0 z-10 pointer-events-none rounded-xl" style="box-shadow: inset 0 0 0 1px rgba(217,188,156,0.2);"></div>

          <img
            v-if="photos.length > 0"
            :key="currentIndex"
            :src="photos[currentIndex]"
            :alt="`Foto ${currentIndex + 1} de nuestra historia`"
            class="gallery-main-img absolute inset-0 w-full h-full object-cover cursor-zoom-in"
            @click="openLightbox(currentIndex)"
          />
          <div v-else class="absolute inset-0 flex items-center justify-center" style="background: rgba(44,57,92,0.04);">
            <p class="font-body text-slate/40 text-sm">Sin fotos</p>
          </div>

          <!-- Gradient bottom for overlay text effect -->
          <div
            class="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[2]"
            style="background: linear-gradient(to top, rgba(44,57,92,0.35) 0%, transparent 100%);"
          ></div>

          <!-- Counter badge -->
          <div
            v-if="totalPhotos > 1"
            class="absolute bottom-4 right-4 z-[3] font-body text-cream/80 text-xs tracking-widest"
            style="text-shadow: 0 1px 4px rgba(0,0,0,0.4);"
          >
            {{ String(currentIndex + 1).padStart(2,'0') }} / {{ String(totalPhotos).padStart(2,'0') }}
          </div>

          <!-- Prev arrow — minimal elegant -->
          <button
            v-if="totalPhotos > 1"
            aria-label="Foto anterior"
            class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style="background: rgba(252,244,239,0.15); backdrop-filter: blur(8px); border: 1px solid rgba(252,244,239,0.2);"
            @click.stop="prevSlide"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M12 5L7 10L12 15" stroke="#FCF4EF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Next arrow -->
          <button
            v-if="totalPhotos > 1"
            aria-label="Siguiente foto"
            class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style="background: rgba(252,244,239,0.15); backdrop-filter: blur(8px); border: 1px solid rgba(252,244,239,0.2);"
            @click.stop="nextSlide"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M8 5L13 10L8 15" stroke="#FCF4EF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Thumbnail strip -->
        <div v-if="totalPhotos > 1" class="gallery-strip flex justify-center gap-2 mt-5">
          <button
            v-for="(photo, i) in photos"
            :key="i"
            :aria-label="`Ir a foto ${i + 1}`"
            class="relative overflow-hidden flex-shrink-0 transition-all duration-300 focus:outline-none"
            :class="i === currentIndex
              ? 'ring-1 ring-offset-1 ring-offset-cream rounded-md'
              : 'opacity-40 hover:opacity-70 rounded-md'"
            :style="i === currentIndex ? 'ring-color: #D9BC9C;' : ''"
            style="width: 52px; height: 38px;"
            @click="goToSlide(i)"
          >
            <img :src="photo" :alt="`Miniatura ${i + 1}`" class="w-full h-full object-cover rounded-md" />
            <div
              v-if="i === currentIndex"
              class="absolute inset-0 rounded-md pointer-events-none"
              style="box-shadow: inset 0 0 0 1.5px #D9BC9C;"
            ></div>
          </button>
        </div>
      </div>

    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox-fade">
        <div
          v-if="lightboxOpen"
          role="dialog"
          aria-modal="true"
          aria-label="Galería de fotos"
          class="fixed inset-0 z-50 flex items-center justify-center p-6"
          style="background: rgba(20,28,48,0.96); backdrop-filter: blur(6px);"
          @click.self="closeLightbox"
        >
          <button
            aria-label="Cerrar"
            class="absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
            style="background: rgba(252,244,239,0.08); border: 1px solid rgba(252,244,239,0.15);"
            @click="closeLightbox"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M15 5L5 15" stroke="#FCF4EF" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>

          <img
            :src="photos[lightboxIndex]"
            :alt="`Foto ${lightboxIndex + 1}`"
            class="max-w-full max-h-[88vh] rounded-lg object-contain"
            style="box-shadow: 0 30px 80px rgba(0,0,0,0.5);"
          />

          <button
            v-if="totalPhotos > 1"
            aria-label="Anterior"
            class="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
            style="background: rgba(252,244,239,0.08); border: 1px solid rgba(252,244,239,0.15);"
            @click="lightboxIndex = (lightboxIndex - 1 + totalPhotos) % totalPhotos"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M12 5L7 10L12 15" stroke="#FCF4EF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <button
            v-if="totalPhotos > 1"
            aria-label="Siguiente"
            class="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
            style="background: rgba(252,244,239,0.08); border: 1px solid rgba(252,244,239,0.15);"
            @click="lightboxIndex = (lightboxIndex + 1) % totalPhotos"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M8 5L13 10L8 15" stroke="#FCF4EF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <p
            v-if="totalPhotos > 1"
            class="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-cream/40 text-xs tracking-widest"
          >
            {{ lightboxIndex + 1 }} · {{ totalPhotos }}
          </p>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.35s ease;
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
