<template>
  <div id="app">
    <Accordion :data="this.data"></Accordion>
  </div>
</template>

<script>

import {request} from '../api/index'
import Accordion from './accordion'
export default {
  components: {Accordion},
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    request('/data').then(res => {
      this.data = res
    })
  }
}
</script>

<style>

</style>
