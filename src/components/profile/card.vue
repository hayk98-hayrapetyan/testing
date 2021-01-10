<template>
    <div class="card">
        <router-link :to="`article/${article.id}`" class="w-100">
            <img :src="article.img.includes('data:') ? article.img : require(`@/assets/img/${article.img}`)" class="card-img-top" alt="card">
        </router-link>
        <div class="card-body">
            <p>{{article.author}}</p>
            <div class="dates">
                <h6>{{article.date}}</h6>
                <h6>{{article.tema}}</h6>
            </div>
            <h5 class="card-title">{{article.title}}</h5>
            <p class="card-text">{{article.text.length > 25 ? article.text.slice(0, 25) + '...' : article.text}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['article']
}
</script>

<style lang='scss' scoped>
.card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    border: 1px solid rgba(228, 219, 219, 0.125);
    background: rgb(43, 42, 42);
    border-radius: 20px;
    width: 18rem;
    .card-img-top {
        height: 200px;
        border-radius: 20px 20px 0 0;
        width: 100%;
    }
    .card-body {
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        padding: 1.25rem;
    }
    .card-title {
        margin-bottom: 1.5rem;
    }
    .dates {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
    }
}
</style>