<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import weddingConfig from "@/config/weddingConfig";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const ctx = ref<gsap.Context | null>(null);

onMounted(() => {
  ctx.value = gsap.context(() => {
    gsap.from(".genderreveal-image", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 85%" },
    });
  }, sectionRef.value!);
});

onUnmounted(() => {
  ctx.value?.revert();
});
</script>

<template>
  <section
    id="genderreveal"
    ref="sectionRef"
    class="relative overflow-hidden"
    style="background: #E8E2D8;"
  >
    <div class="genderreveal-image px-4 sm:px-6" style="max-width: 520px; margin: 0 auto;">
      <img
        :src="weddingConfig.genderRevealImgUrl"
        alt="Revelación de Género"
        class="w-full h-auto block"
      />
    </div>
  </section>
</template>
