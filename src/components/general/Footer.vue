<template>
    <footer>
        made with fun, <a href="http://hasura.io">Hasura</a> and <a href="http://vuejs.org/">vuejs</a>
    </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
export default class Footer extends Vue {
}
</script>

<style lang="scss">
footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    background: lightblue;
    border-top: 1px solid gray;
}
</style>

