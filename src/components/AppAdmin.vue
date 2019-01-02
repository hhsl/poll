<template>
    <UserList></UserList>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserList from '@/components/admin/UserList.vue';

@Component({
    components: {
       UserList
    }
})
export default class AppAdmin extends Vue {}
</script>
