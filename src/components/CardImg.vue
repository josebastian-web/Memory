<script setup>

defineProps({
  cardInfo: Object,
})
</script>

<template>
  <div class="group">
    <div class="card aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
      <img :src="cardInfo.image.url" :alt="cardInfo.imageAlt" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
      <div class="h-full w-full object-cover object-center lg:h-full lg:w-full card__back">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>            
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  transform-style: preserve-3d;
  transition: 0.5s;
}
.card__back {
  transform: rotateY(180deg);
}
</style>
