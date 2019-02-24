<template>
    <footer>
        <div>
            made with fun, <a href="http://hasura.io">Hasura</a> and <a href="http://vuejs.org/">vuejs</a>
        </div>
        <div>
            alpha release . fcknsbm
        </div>
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
    width: 100%;
    padding-top: 50px;
    padding-bottom: 60px;
    margin-top: 24px;
    font-size: 12px;
    background: lightblue;
    border-top: 1px solid gray;
}
</style>

