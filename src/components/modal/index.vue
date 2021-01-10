<template>
  <div class="popup_bg">
    <div class="popup">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
    
}
</script>

<style scoped>
.popup_bg {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.8);
  z-index: 5555555;
}
.popup {
  max-width: 75%;
  width: 100%;
  background: #1C1C1C;
  border-radius: 20px;
  padding: 20px;
  z-index: 999999;
  position: relative;
}
</style>
