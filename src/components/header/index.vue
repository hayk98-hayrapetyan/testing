<template>
  <div id="app">
    <div id="nav">
      <div>
        <button class="login cursor" @click='openPopup = true'>{{$t('header.edit')}}</button>
      </div>
      <div class="info">
      <router-link :to="`/${$i18n.locale}/profile`" class="user">
        <img 
            :src="user.avatar" 
            :alt="user.name"
            height="45"
        />
        <span>{{user.name}}</span>
      </router-link>
      <router-link :to="`/${$i18n.locale}`">{{$t('header.home')}}</router-link>
      <TheLanguage />
      <ThePopup :user='user' v-if="openPopup" @close-popup='openPopup = false' />
      </div>
    </div>
  </div>
</template>

<script>
import TheLanguage from "./LanguageSwitcher";
import ThePopup from "./edit";
import {mapGetters} from "vuex"

export default {
    components: {
        TheLanguage,
        ThePopup
    },
    data(){
      return {
        openPopup: false
      }
    },
    computed: {
      ...mapGetters({
        user: 'auth/getUser'
      })
    }
}
</script>

<style lang="scss" scoped>
#nav, .info {
  padding: 15px 30px;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user {
    display: flex;
    align-items: center;
    img {
        margin-right:10px ;
    }
    span {
        color: #ffffff;
    }
  }
  a {
    font-weight: bold;
    color: #ffffff;
    text-decoration: none;
    margin: 0 20px;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .login {
      min-width: 100px;
      padding-left: 10px;
      padding-right: 10px;
  }
}
.info {
  justify-content: flex-end;
}
</style>
