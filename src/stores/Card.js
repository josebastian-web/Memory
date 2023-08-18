import { defineStore } from 'pinia'
import axios from 'axios';

export const useCard = defineStore('card-store', {
  state: () => {
    return {
      username: "",
      list: [],
      fetching: false
    }
  },

  getters: {
    duplicateList(state) {
      return state.list
    }
  },

  actions: {
    async fetchCards() {
      this.fetching = true;

      try {
        let formatedArray = []
        let listCardCopy = []
        const { data } = await axios.get('https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20')
        // Format data only with the info image
        data.entries.forEach(element => {
          formatedArray.push(element.fields)
        });
        formatedArray.forEach(element => {
          listCardCopy.push({ ...element, showCard: false }, {...element, showCard: false})
        });
  
        this.list = listCardCopy.sort(() => Math.random() - 0.5);;
      }
      catch (error) {
        alert(error)
        console.log(error)
      }

      this.fetching = false;
    }
  }
})