<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import weddingConfig from '@/config/weddingConfig'

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const showTooltip = ref(false)

async function toggleMusic(): Promise<void> {
  if (!audioRef.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    try {
      await audioRef.value.play()
      isPlaying.value = true
    } catch (err) {
      console.warn('Audio play failed:', err)
      isPlaying.value = false
    }
  }
}

onMounted(() => {
  if (!audioRef.value) return
  audioRef.value.volume = 0.55
  audioRef.value.addEventListener('ended', () => { isPlaying.value = false })
  audioRef.value.addEventListener('pause', () => { if (!audioRef.value?.ended) isPlaying.value = false })
  audioRef.value.addEventListener('play', () => { isPlaying.value = true })
})

onUnmounted(() => { audioRef.value?.pause() })
</script>

<template>
  <div class="fixed bottom-7 right-7 z-50 flex flex-col items-center gap-2.5">

    <!-- Tooltip -->
    <Transition name="tooltip-fade">
      <div
        v-if="showTooltip"
        class="font-body text-cream pointer-events-none whitespace-nowrap rounded-full px-3.5 py-1.5"
        style="
          background: rgba(44,57,92,0.92);
          backdrop-filter: blur(8px);
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          box-shadow: 0 4px 16px rgba(44,57,92,0.25);
          border: 1px solid rgba(217,188,156,0.2);
        "
      >
        MÚSICA
      </div>
    </Transition>

    <!-- Button wrapper with pulse rings -->
    <div class="relative w-12 h-12">

      <!-- Outer pulse ring -->
      <div
        v-if="isPlaying"
        class="absolute inset-0 rounded-full pointer-events-none music-pulse-outer"
        style="border: 1px solid rgba(217,188,156,0.5);"
      ></div>

      <!-- Inner pulse ring -->
      <div
        v-if="isPlaying"
        class="absolute inset-0 rounded-full pointer-events-none music-pulse-inner"
        style="border: 1px solid rgba(217,188,156,0.3);"
      ></div>

      <!-- Main button -->
      <button
        :aria-label="isPlaying ? 'Pausar música' : 'Reproducir música'"
        class="relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
        style="
          background: linear-gradient(135deg, #344668 0%, #2C395C 100%);
          box-shadow:
            0 4px 20px rgba(44,57,92,0.4),
            0 0 0 1px rgba(217,188,156,0.2),
            inset 0 1px 0 rgba(255,255,255,0.07);
        "
        @click="toggleMusic"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false"
      >
        <!-- Shimmer top highlight -->
        <div
          class="absolute inset-0 rounded-full pointer-events-none"
          style="background: linear-gradient(160deg, rgba(255,255,255,0.08) 0%, transparent 60%);"
        ></div>

        <!-- Play icon -->
        <svg
          v-if="!isPlaying"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          class="relative z-10 translate-x-0.5"
        >
          <path
            d="M7 4.5v15l12-7.5L7 4.5z"
            fill="#D9BC9C"
            opacity="0.9"
          />
        </svg>

        <!-- Pause icon -->
        <svg
          v-else
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          class="relative z-10"
        >
          <rect x="6" y="5" width="4" height="14" rx="1.5" fill="#D9BC9C" opacity="0.9"/>
          <rect x="14" y="5" width="4" height="14" rx="1.5" fill="#D9BC9C" opacity="0.9"/>
        </svg>
      </button>

    </div>

    <audio
      ref="audioRef"
      :src="weddingConfig.musicUrl"
      loop
      preload="none"
    ></audio>
  </div>
</template>

<style scoped>
.music-pulse-outer {
  animation: pulse-ring 2.2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}
.music-pulse-inner {
  animation: pulse-ring 2.2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite 0.55s;
}

@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: 0.7; }
  65%  { transform: scale(1.75); opacity: 0;   }
  100% { transform: scale(1.75); opacity: 0;   }
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
