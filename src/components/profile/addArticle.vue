<template>
  <div class="edit">
    <the-modal>
        <svg @click="$emit('close-popup')" class="position-absolute closes cursor" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="20.3428" width="28.7692" height="2.61538" rx="1.30769" transform="rotate(-45 0 20.3428)" fill="#282827"/>
            <rect x="1.84961" y="0.342773" width="28.7692" height="2.61538" rx="1.30769" transform="rotate(45 1.84961 0.342773)" fill="#282827"/>
        </svg>
        <div class="title">
            <h6 class="mr">{{$t('article.title')}}</h6>
            <input :class="{error: !article.title && error}" type="text" v-model="article.title">
        </div>
        <div class="title">
            <h6 class="mr">{{$t('article.text')}}</h6>
            <textarea :class="{error: !article.text && error}" v-model="article.text"></textarea>
        </div>
        <div class="title">
            <h6 class="mr">{{$t('article.author')}}</h6>
            <input :class="{error: !article.author && error}" type="text" v-model="article.author" />
        </div>
        <div class="title">
            <h6 class="mr">{{$t('article.date')}}</h6>
            <input type="text" readonly v-model="article.date" />
        </div>
        <div class="title">
            <h6 class="mr">{{$t('article.tema')}}</h6>
            <input :class="{error: !article.tema && error}" type="text" v-model="article.tema" />
        </div>
        <div class="title">
            <h6 class="mr">{{$t('article.image')}}</h6>
            <img 
                :src="article.img"  
                class="mr"
            />
            <input :class="{error: !article.img && error}" ref="changeImg" type="file" @change="changeImg($event)">
        </div>
        <span v-if="size_error">{{$t('size_error')}}</span>
        <div class="text-center button">
            <button class="login cursor" @click="add">{{$t('article.add')}}</button>
        </div>
    </the-modal>
  </div>
</template>

<script>
import TheModal from "@/components/modal/";
import { mapMutations } from 'vuex';

export default {
    components: {TheModal},
    data(){
        return {
            article: {
                title: "",
                text: "",
                date: '',
                author: "",
                tema: "",
                img: ""
            },
            error: false,
            size_error: false
        }
    },
    created(){
        let date = new Date();
        this.article.date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    },
    methods: {
        ...mapMutations({
            ADD_ARTICLE: "card/ADD_ARTICLE"
        }),
        changeImg(e){
            var files = e.target.files || e.dataTransfer.files
            if (!files.length) {
            return
            }
            this.createImage(files[0])
        },
        createImage(file) {
            if(file.size > 500000){
                this.size_error = true;
                return;
            }
            this.size_error = false;
            var reader = new FileReader()
            var vm = this

            reader.onload = (e) => {
                vm.article.img = e.target.result
            }
            reader.readAsDataURL(file)
        },
        add(){
            for(let field in this.article){
                if(!this.article[field]){
                    this.error = true;
                    return;
                }
            }
            this.ADD_ARTICLE(this.article)
            this.$emit('close-popup');
        },
    }
}
</script>

<style lang='scss' scoped>
.edit {
    text-align: center!important;
    .button {
        margin: 25px auto;
    }
    .mr {
        margin-right: 20px;
    }
    .title {
        display: flex;
        align-items: center;
        margin: 15px 0;
    }
    h6 {
        width: 120px;
        text-align: left;
    }
    input[type = "text"], textarea {
        background: transparent;
        outline: none;
        width: 500px;
        padding: 15px 10px;
        border: 1px solid #282827;
        -webkit-box-shadow: inset 4px 3px 8px -1px rgba(0, 0, 0, 0.25);
                box-shadow: inset 4px 3px 8px -1px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        color: #ffffff;
    }
    textarea {
        height: 100px;
    }
    img {
        height: 100px;
    }
    span {
        color: red;
    }
}
</style>