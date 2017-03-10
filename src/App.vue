<template>
  <div id="app" class="websiteWrapper">
    <div class="wrapper contentWrapper">
      <div class="row">
        <div class="column-df-12">
          <h1>Gifs</h1>
        </div>
        <div class="column-df-12">
          <search-form
            :term='searchParams.q'
            @search='search($event)'
          />
        </div>
      </div>

      <div class="row">
        <p v-if='!items'>Loading...</p>
        <p v-else-if='error'>Opps, something went wrong: {{error.message}}</p>
        <p v-else-if='items && !items.length'>Oops! No images found!</p>
        <item v-else-if='items' v-for='item in items'
          :item='item'
          @openModal='toggleModal(item)'
        />
      </div>
    </div>
    <myFooter />
    <modal v-if='showModal'
      :item='activeItem'
      @close='toggleModal()'
    />
  </div>
</template>

<style lang="sass">
    @import './src/global-styles/index.sass';
</style>

<script>
  import FooterComponent from './components/Footer.vue'
  import ItemComponent from './components/Item.vue'
  import ModalComponent from './components/Modal.vue'
  import SearchFormComponent from './components/SearchForm.vue'

  export default{
    data() {
      return {
        config: {
          giphy: {
            apiKey: 'dc6zaTOxFJmzC', // beta key
            apiRoot: 'http://api.giphy.com/v1/',
          }
        },
        // Giphy API search parameters
        // @see https://github.com/Giphy/GiphyAPI#search-endpoint
        searchParams: {
          q: 'cat',
          offset: 0,
          rating: 'pg-13',
        },
        items: undefined,
        activeItem: undefined,
        error: null,
        showModal: false,
      }
    },
    mounted() {
      // perform a search with the default search term as soon as the
      // app vue is mounted
      this.search(this.searchParams.q);
    },
    components: {
      'item': ItemComponent,
      'modal': ModalComponent,
      'myFooter': FooterComponent,
      'search-form': SearchFormComponent,
    },
    methods: {
      search(newTerm) {
        // mutate the application state
        this.searchParams.q = newTerm;

        // gather the details necessary to make an API call
        var apiEndpoint = this.config.giphy.apiRoot + 'gifs/search?',
          apiParams = this.searchParams;

        // add the giphy API key from the config to the query parameters
        apiParams.api_key = this.config.giphy.apiKey;

        // transform the query parameters object into a string of GET
        // params, then construct the final query
        var queryParams = Object.keys(apiParams).map(function(key) { return key + '=' + encodeURIComponent(apiParams[key]); }).join('&'),
          apiQuery = apiEndpoint + queryParams;

        // use the new Fetch API to query the API endpoint
        // @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        var self = this;
        fetch(apiQuery)
          .then(function(response) {
              // first convert the response into an object
              if (response.ok) {
                  return response.json();
              }
          })
          .then(function(jsonResponse) {
              self.items = jsonResponse.data;
              self.error = null;
          })
          .catch(function(error) {
              self.error = error;
              self.items = [];
          });
      },
      toggleModal(item) {
        this.showModal = !this.showModal;
        this.activeItem = item;
      },
    },
  }
</script>
