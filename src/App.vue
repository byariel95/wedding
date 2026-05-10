<script setup lang="ts">
import HeroSection from './components/HeroSection.vue'
import GallerySection from './components/GallerySection.vue'
import CountdownSection from './components/CountdownSection.vue'
import InvitationSection from './components/InvitationSection.vue'
import DressCodeSection from './components/DressCodeSection.vue'
import GenderRevealSection from './components/GenderRevealSection.vue'
import LocationSection from './components/LocationSection.vue'
import ClosingSection from './components/ClosingSection.vue'
import MusicPlayer from './components/MusicPlayer.vue'
</script>

<template>
  <div class="relative">
    <!-- Main sections in scroll order -->
    <HeroSection />
    <GallerySection />
    <CountdownSection />
    <InvitationSection />
    <DressCodeSection />
    <GenderRevealSection />
    <LocationSection />
    <ClosingSection />

    <!-- Floating music player — always rendered, fixed position -->
    <MusicPlayer />
  </div>
</template>
