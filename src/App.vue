<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import CardImg from './components/CardImg.vue'
import ModalDialog from './components/ModalDialog.vue'
import { useCard } from './stores/Card'
import { UserCircleIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'

// Setup
const store = useCard()
let cardOld = null
let cardOldIndex = null
let countSuccess = ref(0)
let countError = ref(0)
let name = ref('')
let stateModal = ref(true)
let stateModalSuccess = ref(false)

watch(name, (newValue) => {
  store.$patch({ username: newValue })
})

watch(countSuccess, (newValue) => {
  if (newValue == 20) {
    stateModalSuccess.value = true
  }
})

onMounted(() => {
  store.fetchCards()
})

// Computed
const listDuplicatedCards = computed(() => {
  return store.duplicateList
})

const userName = computed(() => {
  return store.username
})

// Methods
const compareCard = (value, index) => {
  changeStatusCard(index, true)

  if (!cardOld) {
    cardOld = value
    cardOldIndex = index
    return;
  }

  if (value === cardOld) {
    countSuccess.value++
    cardOld = null
    cardOldIndex = null
  } else {
    countError.value++
    setTimeout(() => {
      changeStatusCard(index, false)
      changeStatusCard(cardOldIndex, false)
      cardOld = null
      cardOldIndex = null
    }, 1000)
    
  }

}

const changeStatusCard = (index, show) => {
  store.list[index].showCard = show
}

const playGame = () => {
  if (userName !== "") {
    stateModal.value = false
    return;
  }
  stateModal.value = true
}
const playAgain = () => {
  location.reload()
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-3 lg:max-w-full lg:px-4">
    <div class="flex justify-center">
      <span>Hello {{ userName }}</span>
    </div>
    <div class="flex justify-center">
      <span class="mr-2"> Success {{ countSuccess }}</span>--<span class="ml-1">Error {{ countError }}</span> 
    </div>
    <div class="mt-6 grid grid-cols-4 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-10 xl:gap-x-8">
      <div class="group" v-for="(item, index) in listDuplicatedCards">
        <div class="card aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-44 lg:h-44">
          <CardImg :card-info="item" v-if="item.showCard" class="card__face card__face--back"/>
          <div v-else @click="compareCard(item.image.uuid, index)" class="card__face card__face--front h-full w-full object-cover object-center lg:h-full lg:w-full">
            <div class="flex justify-center h-full content-center items-center">
              <QuestionMarkCircleIcon class="h-10 w-10 text-red-600" aria-hidden="true" />          
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalDialog :show-modal="stateModal">
    <template v-slot:content>
      <div class="xl:flex w-full">
        <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <UserCircleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        <div class="grow mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <div class="mt-2">
            <div class="col-span-full">
              <label for="user-name" class="block text-sm font-medium leading-6 text-gray-900">
                Enter your name to play
              </label>
              <div class="mt-2">
                <input v-model="name" type="text" name="user-name" id="user-name" autocomplete="user-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:button>
      <button @click="playGame" type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
        Play
      </button>
    </template>
  </ModalDialog>
  <!-- Modal game complete-->
  <ModalDialog :show-modal="stateModalSuccess">
    <template v-slot:content>
      <div class="xl:flex w-full">
        <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <UserCircleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        <div class="grow mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <div class="mt-2">
            <div class="col-span-full">
              <label for="user-name" class="block text-sm font-medium leading-6 text-gray-900">
                Congratulation
              </label>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:button>
      <button @click="playAgain" type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
        Play again
      </button>
    </template>
  </ModalDialog>
</template>

<style scoped>
.card {
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
}
.card__face--back {
  transform: rotateY(180deg);
}
</style>
