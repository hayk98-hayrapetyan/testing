<template>
  <div class="article">
        <div class="img">
            <img :src="article.img.includes('http:') ? article.img : require(`@/assets/img/${article.img}`)"  :alt="article.title">
        </div>
        <div class="txt">
            <div class="text-right">
                <button class="login cursor" @click='openPopup = true'>{{$t('edit')}}</button>
            </div>
            <h5 class="text-left">{{article.author}}</h5>
            <div class="dates">
                <h6>{{article.date}}</h6>
                <h6>{{article.tema}}</h6>
            </div>
            <h4>{{article.title}}</h4>
            <p>{{article.text}}</p>
        </div>
        <EditArticle :article='article' v-if="openPopup" @close-popup='openPopup = false' />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import EditArticle from "@/components/profile/edit"

export default {
    components: {EditArticle},
    data(){
        return {
            openPopup: false
        }
    },
    computed: {
        ...mapGetters({
            articles: 'card/getArticles'
        }),
        article(){
            return this.articles.filter(article => {
                return article.id == this.$route.params.id;
            })[0]
        }
    },
}
</script>

<style lang="scss" scoped>
.article {
    display: flex;
    padding: 50px 30px;
    .img {
        margin-right: 30px;
    }
    img {
        width: 400px;
    }
    h4 {
        margin: 20px 0;
    }
    .dates {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
    }
    .login {
        min-width: 100px;
        padding-left: 10px;
        padding-right: 10px;
    }
}
</style>