<template>
  <view @touchstart="touchStart" @touchend="touchEnd">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      startTime: 0,
      startClientX: 0,
      startClientY:0
    }
  },
  methods: {
    touchStart(e) {
      this.startTime = Date.now()
      this.startClientX = e.changedTouches[0].clientX
      this.startClientY = e.changedTouches[0].clientY
    },
    touchEnd(e) {
      const endTime = Date.now()
      if(endTime-this.startTime > 2000) return false
      const endClientX = e.changedTouches[0].clientX
      const endClientY = e.changedTouches[0].clientY
      if(Math.abs(endClientX-this.startClientX) > 50) {
        let dicration = ''
        dicration = endClientX-this.startClientX > 50 ? 'right' : 'left'
        this.$emit('swiperAction',{dicration})
      }
    }
  },
}
</script>

<style>

</style>