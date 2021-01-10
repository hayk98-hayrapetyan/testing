<template>
  <div class="nav-item position-relative">
    <a class="nav-link" @click.stop="toggleVisibility">
      <h6 class="text-uppercase">{{ $i18n.locale }}
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"></path></svg>
      </h6>
    </a>
    <transition name="dropdown-fade">
      <ul v-if="isVisible" class="position-absolute">
        <li>
          <a
            @click.prevent="setLocale('ru')"
            class="text-center">
            <h6>RU</h6>
          </a>
        </li>
        <li>
          <a
            @click.prevent="setLocale('en')"
            class="text-center">
            EN
          </a>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import {bus} from "@/main";

export default {
  data() {
    return {
      isVisible: false,
    }
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible
    },
    hideDropdown() {
      this.isVisible = false
      this.focusedIndex = 0
    },
    setLocale(locale) {
      this.$i18n.locale = locale
      this.$router.push({
        params: { lang: locale }
      })
      this.hideDropdown();
    }
  },
  created() {
    bus.$on("hideBurger", () => {
      this.hideDropdown()
    })
  }
}
</script>

<style lang='scss' scoped>
ul {
  list-style: none;
  margin-left: 16px;
  z-index: 5555;
  top: 30px;
  a {
    padding-top: 15px;
    display: block;
  }
}
a {
  cursor: pointer;
  color: #ffffff;
}

svg {
    vertical-align: middle;
}
</style>