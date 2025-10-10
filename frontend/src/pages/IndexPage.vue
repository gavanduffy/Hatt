<template>
  <div class="index-page" id="index-page">
    <img src="images/hatt-logo.png" class="logo" />
    <div class="quote">{{ $t('home.quote') }}</div>
    <SearchBar
      v-model="input"
      @search="search"
      :searching="searching"
      bgColorWhite="blue-grey-3"
      bgColorDark="blue-grey-8"
    />

    <CategorySelector ref="categories" @selection-updated="updateWebsites" />

    <DisplayedWebsites
      ref="selectedWebsitesComponent"
      :websites="selectedWebsites"
      :doneWebsites="doneWebsites"
      :searching="searching"
      v-if="selectedWebsites.length !== 0"
    />

    <SearchResults
      v-if="results.length !== 0"
      :results="results"
      :query="input"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CategorySelector from 'src/components/categories/CategorySelector.vue'
import DisplayedWebsites from 'src/components/websites/DisplayedWebsites.vue'
import SearchResults from 'src/components/results/SearchResults.vue'
import SearchBar from 'src/components/SearchBar.vue'
import { api } from 'src/services/api.js'

export default defineComponent({
  name: 'IndexPage',
  components: { CategorySelector, SearchResults, DisplayedWebsites, SearchBar },
  data() {
    return {
      input: '',
      results: [],
      selectedWebsites: [],
      doneWebsites: [],
      searching: false,
    }
  },
  methods: {
    async updateWebsites() {
      let categories = this.$refs.categories.getSelectedCategories
      let customLists = this.$refs.categories.getSelectedCustomLists
      try {
        const data = await api.getWebsitesWithCategories(categories)
        this.selectedWebsites = data ?? []
        customLists.forEach((list) => {
          this.selectedWebsites = this.selectedWebsites.concat(list.sources)
        })
        let set = new Set(this.selectedWebsites)
        this.selectedWebsites = Array.from(set)
      } catch (error) {
        console.error('Error updating websites:', error)
        this.$q.notify({
          type: 'negative',
          message: 'Failed to load websites'
        })
      }
    },
    async search() {
      this.searching = true
      this.results = []
      this.doneWebsites = []

      let selectedWebsites = []
      if (this.$refs.selectedWebsitesComponent) {
        selectedWebsites =
          this.$refs.selectedWebsitesComponent.getSelectedWebsites
      }
      let selectedCategories = this.$refs.categories.getSelectedCategories
      if (selectedWebsites.length === 0) {
        this.$q.notify(this.$t('notifications.choose_a_category'))
        this.searching = false
        return
      }
      
      try {
        const searchResults = await api.search(this.input, selectedWebsites, selectedCategories)
        // Process results as they come in (simulate the Go behavior)
        searchResults.forEach(result => {
          this.results.push({
            Website: result.website,
            Items: result.items,
            CompatibleDownloaders: result.compatibleDownloaders
          })
          this.doneWebsites.push(result.website)
        })
      } catch (error) {
        console.error('Search error:', error)
        this.$q.notify({
          type: 'negative',
          message: 'Search failed: ' + error.message
        })
      } finally {
        this.searching = false
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.index-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    margin-top: -10px;
    width: 150px;
  }
  .quote {
    color: var(--q-primary);
  }
  .search-bar {
    width: 40%;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .items-table {
    margin: 20px 0px;
    .thumbnail {
      max-width: 150px;
      max-height: 150px;
    }
  }
}
</style>
<style lang="scss">
#index-page {
  .search-bar {
    .q-field__control {
      border-radius: 15px !important;
    }
  }
}
</style>
