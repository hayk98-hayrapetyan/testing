<template>
  <div class="container">
    <SearchField />
    <div class="add">
      <div>
        <button class="login cursor" @click='openPopup = true'>{{$t('article.add')}}</button>
      </div>
      <div class="filter">
        <h6 class="cursor" @click="SORT_BY_ALPHA">{{$t('sort_alpha')}}</h6>
        <h6 class="cursor" @click="SORT_BY_DATE">{{$t('sort_date')}}</h6>
      </div>

      <AddArticle v-if="openPopup" @close-popup='openPopup = false' />
    </div>
    <div class="board">
      <TheCard 
        v-for="article in articles"
        :key='article.id'
        :article='article'
      />
    </div>
  </div>
</template>

<script>
import SearchField from "@/components/profile/search";
import TheCard from "@/components/profile/card";
import AddArticle from "@/components/profile/addArticle";
import {mapGetters, mapMutations} from "vuex";

export default {
  components: {
    SearchField,
    TheCard,
    AddArticle
  },
  data(){
    return {
      openPopup: false
    }
  },
  computed: {
    ...mapGetters({
      articles: 'card/getArticles'
    })
  },
  methods: {
    ...mapMutations({
      SORT_BY_ALPHA: "card/SORT_BY_ALPHA",
      SORT_BY_DATE: "card/SORT_BY_DATE"
    })
  }
}
</script>

<style lang="scss" scoped>
.board {
  display: flex;
  flex-wrap: wrap;
  margin: 40px 30px;
}
.board > div {
    width: 23%;
    margin: 1%;
}
.add {
  margin: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .filter {
    display: flex;
    justify-content: flex-end;
    h6 {
      margin: 0 0 0 45px;
    }
  }
}
</style>