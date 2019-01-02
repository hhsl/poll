<template>
    <div>
        <h1>
             Hi welcome to the new poll app
        </h1>
        <h2>
            yes its awesome!
            {{ count }}
        </h2>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AppHome extends Vue {

    get count() {
        return this.$store.state.count;
    }
}
</script>
