<template>
  <div class="search w-100 position-relative mx-auto">
    <input
      type="text"
      class="w-100 h-100"
      :placeholder="$t('search')"
      v-model="search"
      @input="showResults"
    />
    <svg class="position-absolute search_icon cursor" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7.21125 14.0974C3.23544 14.0974 0 10.9338 0 7.04627C0 3.15872 3.23544 -0.00488281 7.21125 -0.00488281C11.1871 -0.00488281 14.4225 3.15872 14.4225 7.04627C14.4225 10.9338 11.1871 14.0974 7.21125 14.0974ZM7.21125 1.08823C3.84995 1.08823 1.11056 3.76684 1.11056 7.05352C1.11056 10.3402 3.84995 13.0188 7.21125 13.0188C10.5726 13.0188 13.3119 10.3402 13.3119 7.05352C13.3119 3.76684 10.5726 1.08823 7.21125 1.08823Z" fill="white"/>
        <path d="M14.4447 15.003C14.304 15.003 14.1634 14.9523 14.0523 14.8437L11.4462 12.2954C11.2315 12.0855 11.2315 11.738 11.4462 11.5281C11.6609 11.3181 12.0163 11.3181 12.231 11.5281L14.8371 14.0763C15.0518 14.2862 15.0518 14.6337 14.8371 14.8437C14.7335 14.9523 14.5928 15.003 14.4447 15.003Z" fill="white"/>
    </svg>
    <transition name="dropdown-fade">
      <div v-if="results" class="brandOptions position-absolute w-100">
        <div class="brandOption w-100 py-2">
          <div
            class="all d-flex align-items-center cursor p-2 px-3 w-100"
            v-for="result in articles"
            :key="result.id"
            @mousedown="search = result.name"
          >
            <h6 @click="search = result.title; showResults()">{{ result.title }}</h6>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {bus} from "@/main";

export default {
    data(){
      return {
          search: "",
          results: false
      }
    },
    computed: {
      ...mapGetters({
          articles: 'card/getArticles'
      }),
      searchResults(){
        return this.articles.filter((article) => {
          return article.title.toLowerCase().match(this.search.toLowerCase())
        })
      },
    },
    methods: {
      ...mapMutations({
        SET_SEARCH_RESULT: "card/SET_SEARCH_RESULT"
      }),
      showResults() {
        this.SET_SEARCH_RESULT(this.search);
        if(this.search != '' && this.articles.length > 0){
          this.results = true;
        } else {
          this.results = false;
        }
      },
    },
    created() {
      bus.$on("hideBurger", () => {
        this.results = false;
      })
    },
    destroyed(){
      this.SET_SEARCH_RESULT('');
    }
}
</script>



<style lang='scss' scoped>
.search {
    max-width: 301px;
    height: 36px;
    background: rgba(100, 100, 100, 0.4);
    -webkit-backdrop-filter: blur(5px);
            backdrop-filter: blur(5px);
    border-radius: 10px;
    .search_icon {
      right: 15px;
      top: 50%;
      -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
              transform: translateY(-50%);
  }
  input {
      color: #ffffff;
      background: transparent;
      padding: 0 35px 0 15px;
      border: none;
      outline: none;
  }
  .brandOptions {
    background: #191B1D;
    border: 1px solid #FFFFFF;
    -webkit-box-shadow: inset 4px 3px 8px -1px rgba(0, 0, 0, 0.25);
            box-shadow: inset 4px 3px 8px -1px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    left: 0;
    top: 115%;
    z-index: 30;
    overflow-x: hidden;
  }
  .brandOption {
    max-height: 200px;
    overflow-y: auto;
  }
  h6 {
    margin: 10px 5px;
  }
}



</style>

