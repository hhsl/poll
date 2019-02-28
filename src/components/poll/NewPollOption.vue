<template>
    <div>
        <h3>
            add a new option:
        </h3>
        <input type="text" v-model="newOptionTitle" placeholder="New Option Title" />
        <button>
            create
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class NewPollOption extends Vue {
    public newOptionTitle: string = '';
}
</script>
