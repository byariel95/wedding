<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import weddingConfig from "@/config/weddingConfig";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const ctx = ref<gsap.Context | null>(null);

const date = new Date(weddingConfig.weddingDate);
const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const weddingDayShort = weekdays[date.getDay()]
  .substring(0, 3)
  .toUpperCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");
const weddingDayNum = date.getDate();
const weddingMonth = months[date.getMonth()].toUpperCase();

onMounted(() => {
    ctx.value = gsap.context(() => {
      // Timeline secuencial vinculado al scroll
      const tl = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "power3.out",
        },
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1,
        },
      });

      // Orden visual de arriba hacia abajo:
      tl.from(".invitation-logo", {
        autoAlpha: 0,
        y: 30,
        scale: 0.96,
      })
        .from(
          ".invitation-parents",
          { autoAlpha: 0, y: 25 },
          "-=0.5",
        )
        .from(
          ".invitation-names",
          { autoAlpha: 0, y: 30, scale: 0.97 },
          "-=0.5",
        )
        .from(
          ".invitation-details",
          { autoAlpha: 0, y: 30 },
          "-=0.5",
        )
        .from(
          ".invitation-date",
          { autoAlpha: 0, y: 30, scale: 0.97 },
          "-=0.5",
        )
        .from(
          ".invitation-location",
          { autoAlpha: 0, y: 25 },
          "-=0.5",
        )
        .from(
          ".invitation-reception",
          { autoAlpha: 0, y: 25 },
          "-=0.5",
        )
        .from(
          ".invitation-gift",
          { autoAlpha: 0, y: 20 },
          "-=0.5",
        );
    }, sectionRef.value!);
});

onUnmounted(() => {
  ctx.value?.revert();
});
</script>

<template>
  <section
    id="invitation"
    ref="sectionRef"
    class="relative overflow-hidden"
    style="background: #F5F1EB;"
  >
    <div
      class="relative z-10 max-w-xl mx-auto px-6 text-center"
      style="padding-top: 72px; padding-bottom: 80px;"
    >
      <!-- Logo -->
      <div class="invitation-logo mb-14">
        <img
          :src="weddingConfig.logoUrl"
          alt="Mishell & Ariel Escudo"
          style="width: 200px; height: auto; margin: 0 auto; display: block;"
        />
      </div>

      <!-- Parents -->
      <div class="invitation-parents mb-12">
        <p class="label-text" style="margin-bottom: 18px;">Hijos de</p>
        <div class="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <div class="text-center">
            <p class="parent-name">{{ weddingConfig.groomParents.father }}</p>
            <p class="font-body text-navy/40" style="font-size: 11px; margin: 2px 0;">&amp;</p>
            <p class="parent-name">{{ weddingConfig.groomParents.mother }}</p>
          </div>
          <div
            class="hidden md:block"
            style="width: 1px; height: 36px; background: rgba(46, 74, 110, 0.2);"
          ></div>
          <div class="text-center">
            <p class="parent-name">{{ weddingConfig.brideParents.father }}</p>
            <p class="font-body text-navy/40" style="font-size: 11px; margin: 2px 0;">&amp;</p>
            <p class="parent-name">{{ weddingConfig.brideParents.mother }}</p>
          </div>
        </div>
      </div>

      <!-- Couple names -->
      <div class="invitation-names mb-12">
        <h2 class="name-text">{{ weddingConfig.bride.fullName }}</h2>
        <p class="and-text">y</p>
        <h2 class="name-text">{{ weddingConfig.groom.fullName }}</h2>
      </div>

      <!-- Invitation text -->
      <div class="invitation-details mb-12">
        <p class="body-text" style="font-size: 12px; line-height: 2.4; margin-bottom: 18px;">
          CON MUCHA ALEGRÍA LES QUEREMOS HACER PARTICIPES DE LA<br>
          CELEBRACIÓN DE NUESTRA
        </p>
        <h3 class="event-title">BODA CIVIL</h3>
      </div>

      <!-- Date block -->
      <div class="invitation-date flex items-center justify-center gap-5 mb-12">
        <span class="date-side">{{ weddingDayShort }}</span>
        <div class="date-divider"></div>
        <div class="date-center">
          <span class="date-day">{{ weddingDayNum }}</span>
          <span class="date-month">{{ weddingMonth }}</span>
        </div>
        <div class="date-divider"></div>
        <span class="date-side">{{ weddingConfig.weddingTime }}</span>
      </div>

      <!-- Location -->
      <div class="invitation-location mb-8">
        <p class="body-text" style="line-height: 2.2;">
          {{ weddingConfig.venue.name.toUpperCase() }},<br>
          {{ weddingConfig.venue.address.toUpperCase() }}, {{ weddingConfig.venue.city.toUpperCase() }}
        </p>
      </div>

      <!-- Reception -->
      <div class="invitation-reception mb-12">
        <p class="script-text">
          recepción inicia a las {{ weddingConfig.receptionTime }}
        </p>
      </div>

      <!-- Gift note -->
      <div class="invitation-gift">
        <p class="body-text" style="font-size: 12px; line-height: 2.2;">
          SU PRESENCIA ES EL MEJOR REGALO. SI<br>
          DESEAS AYUDARNOS EN ESTA NUEVA<br>
          ETAPA, PREFERIMOS UNA<br>
          CONTRIBUCIÓN ECONÓMICA.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Great+Vibes&display=swap');

.invitation-logo,
.invitation-parents,
.invitation-names,
.invitation-details,
.invitation-date,
.invitation-location,
.invitation-reception,
.invitation-gift {
  will-change: transform, opacity;
}

.name-text {
  font-family: 'Cinzel', serif;
  color: #2E4A6E;
  font-size: clamp(26px, 5vw, 36px);
  letter-spacing: 0.28em;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 1.15;
}

.and-text {
  font-family: 'Great Vibes', cursive;
  color: #2E4A6E;
  font-size: clamp(30px, 6vw, 44px);
  margin: 4px 0;
  line-height: 1;
}

.event-title {
  font-family: 'Cinzel', serif;
  color: #2E4A6E;
  font-size: clamp(22px, 4.5vw, 30px);
  letter-spacing: 0.22em;
  font-weight: 700;
  text-transform: uppercase;
}

.body-text {
  font-family: 'Cinzel', serif;
  color: #2E4A6E;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.script-text {
  font-family: 'Great Vibes', cursive;
  color: #2E4A6E;
  font-size: clamp(26px, 5vw, 34px);
  line-height: 1.3;
}

.label-text {
  font-family: 'Cinzel', serif;
  color: #2E4A6E;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.7;
}

.parent-name {
  font-family: 'Cinzel', serif;
  color: #2E4A6E;
  font-size: clamp(14px, 2vw, 13px);
  letter-spacing: 0.06em;
  line-height: 1.5;
}

.date-side {
  font-family: 'Cinzel', serif;
  color: #2E4A6E;
  font-size: clamp(12px, 2.5vw, 14px);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.date-divider {
  width: 1px;
  height: 44px;
  background: #2E4A6E;
  opacity: 0.35;
}

.date-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.date-day {
  font-family: 'Cinzel', serif;
  color: #2E4A6E;
  font-size: clamp(32px, 6.5vw, 44px);
  font-weight: 700;
  line-height: 1;
  display: block;
}

.date-month {
  font-family: 'Cinzel', serif;
  color: #2E4A6E;
  font-size: clamp(11px, 2vw, 13px);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  display: block;
  margin-top: 2px;
}
</style>
