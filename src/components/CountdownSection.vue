<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import confetti from 'canvas-confetti'
import weddingConfig from '@/config/weddingConfig'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const ctx = ref<gsap.Context | null>(null)

let intervalId: ReturnType<typeof setInterval> | null = null
let confettiFired = false

const now = ref(new Date())
const targetDate = new Date(weddingConfig.weddingDate)

const isOver = computed(() => now.value >= targetDate)

const timeLeft = computed(() => {
  if (isOver.value) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  const diff = targetDate.getTime() - now.value.getTime()
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
})

const formattedWeddingDay = computed(() =>
  targetDate.toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
)

const countdownUnits = computed(() => [
  { value: timeLeft.value.days, label: 'Días' },
  { value: timeLeft.value.hours, label: 'Horas' },
  { value: timeLeft.value.minutes, label: 'Minutos' },
  { value: timeLeft.value.seconds, label: 'Segundos' },
])

function pad(n: number): string { return String(n).padStart(2, '0') }

function launchConfetti(): void {
  const colors = ['#2C395C', '#D9BC9C', '#A6BBCE', '#FCF4EF', '#8B98A9']
  confetti({ particleCount: 140, spread: 90, colors, origin: { y: 0.5 } })
  setTimeout(() => confetti({ particleCount: 90, spread: 65, colors, angle: 60, origin: { x: 0, y: 0.55 } }), 350)
  setTimeout(() => confetti({ particleCount: 90, spread: 65, colors, angle: 120, origin: { x: 1, y: 0.55 } }), 700)
  setTimeout(() => confetti({ particleCount: 60, spread: 120, colors, origin: { y: 0.3 } }), 1200)
}

onMounted(() => {
  if (isOver.value && !confettiFired) { confettiFired = true; launchConfetti() }

  intervalId = setInterval(() => {
    now.value = new Date()
    if (isOver.value && !confettiFired) { confettiFired = true; launchConfetti() }
  }, 1000)

  ctx.value = gsap.context(() => {
    gsap.from('.countdown-header', {
      opacity: 0, y: 35, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.countdown-header', start: 'top 88%' },
    })
    gsap.from('.countdown-card', {
      opacity: 0, y: 45, scale: 0.94, duration: 0.9,
      stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.countdown-cards', start: 'top 88%' },
    })
    gsap.from('.countdown-footer', {
      opacity: 0, y: 15, duration: 0.8, ease: 'power2.out', delay: 0.3,
      scrollTrigger: { trigger: '.countdown-footer', start: 'top 95%' },
    })
  }, sectionRef.value!)
})

onUnmounted(() => {
  if (intervalId !== null) { clearInterval(intervalId); intervalId = null }
  ctx.value?.revert()
})
</script>

<template>
  <section
    id="countdown"
    ref="sectionRef"
    class="py-24 md:py-32 relative overflow-hidden"
    style="background: #FCF4EF;"
  >
    <!-- Subtle background pattern -->
    <div
      class="absolute inset-0 pointer-events-none opacity-[0.025]"
      style="background-image: repeating-linear-gradient(0deg, #2C395C 0px, #2C395C 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #2C395C 0px, #2C395C 1px, transparent 1px, transparent 60px);"
    ></div>

    <!-- Mist tint wash top -->
    <div
      class="absolute top-0 left-0 right-0 h-64 pointer-events-none"
      style="background: linear-gradient(180deg, rgba(166,187,206,0.1) 0%, transparent 100%);"
    ></div>

    <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">

      <!-- Header -->
      <div class="countdown-header mb-14">
        <p class="font-body text-sand/60 text-xs tracking-[0.35em] uppercase mb-3">El gran momento</p>
        <h2 class="font-display text-navy font-light tracking-wide mb-5" style="font-size: clamp(2.4rem, 6vw, 3.8rem);">
          Cuenta Regresiva
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

      <!-- Countdown cards -->
      <div
        v-if="!isOver"
        class="countdown-cards flex flex-wrap justify-center gap-4 md:gap-5"
        aria-live="polite"
        aria-label="Tiempo restante para la boda"
      >
        <div
          v-for="unit in countdownUnits"
          :key="unit.label"
          class="countdown-card group relative flex flex-col items-center justify-center rounded-2xl min-w-[88px] md:min-w-[110px] px-5 py-6"
          style="background: #FFFFFF; box-shadow: 0 2px 20px rgba(44,57,92,0.07), 0 0 0 1px rgba(217,188,156,0.25);"
        >
          <!-- Gradient top accent bar -->
          <div
            class="absolute top-0 left-4 right-4 h-px rounded-full"
            style="background: linear-gradient(90deg, transparent, #D9BC9C, transparent);"
          ></div>

          <span
            class="font-display text-navy font-light leading-none tabular-nums"
            style="font-size: clamp(2.6rem, 6vw, 3.5rem); letter-spacing: -0.02em;"
            :aria-label="`${unit.value} ${unit.label}`"
          >
            {{ pad(unit.value) }}
          </span>
          <span class="font-body text-slate/70 text-[10px] uppercase tracking-[0.25em] mt-2.5">
            {{ unit.label }}
          </span>

          <!-- Gradient bottom accent bar -->
          <div
            class="absolute bottom-0 left-4 right-4 h-px rounded-full"
            style="background: linear-gradient(90deg, transparent, rgba(217,188,156,0.4), transparent);"
          ></div>
        </div>
      </div>

      <!-- Celebration state -->
      <div
        v-else
        class="flex flex-col items-center gap-5"
        aria-live="assertive"
        role="status"
      >
        <p class="font-display text-navy font-light" style="font-size: clamp(2rem, 5vw, 3.2rem);">
          ¡Hoy es nuestro gran día!
        </p>
        <div class="flex items-center gap-3">
          <div class="h-px w-12" style="background: linear-gradient(90deg, transparent, #D9BC9C);"></div>
          <svg width="12" height="12" viewBox="0 0 12 12"><rect x="3" y="0" width="6" height="6" rx="0.5" fill="#D9BC9C" transform="rotate(45 6 6)"/></svg>
          <div class="h-px w-12" style="background: linear-gradient(90deg, #D9BC9C, transparent);"></div>
        </div>
        <p class="font-body text-slate text-lg tracking-wide">
          {{ weddingConfig.groom.fullName }} &amp; {{ weddingConfig.bride.fullName }}
        </p>
      </div>

      <!-- Footer date -->
      <p
        v-if="!isOver"
        class="countdown-footer font-body text-slate/45 text-xs mt-10 tracking-widest capitalize"
      >
        {{ formattedWeddingDay }} · {{ weddingConfig.weddingTime }}
      </p>

    </div>
  </section>
</template>
