<template>
    <div class='search'>
        <input name='search' id='search' v-model='inputTerm' v-on:keyup.enter="search" />
        <input name='search-submit' id='search-submit' type='submit' v-on:click="search" />
    </div>
</template>

<style lang="sass" scoped>

</style>

<script>
    export default{
        data(){
            return{
                inputTerm: this.term
            }
        },
        props: {
            term: {
                type: String,
                required: true
            },
        },
        methods: {
            search() {
                this.$emit('search', this.inputTerm);
            }
        },
    }
</script>
