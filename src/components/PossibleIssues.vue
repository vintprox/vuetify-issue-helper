<template>
  <v-card flat class="grey lighten-5">
    <v-card-title primary-title class="title">
      <span>These issues look similar, did you mean...</span>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="issues"
        item-key="id"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" scope="props">
          <tr>
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-center">
              <v-btn tag="a" icon :href="props.item.url" target="_blank" flat>
                <v-icon>open_in_new</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'possible-issues',

  data () {
    return {
      headers: [
        {
          text: 'Issue Title',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        {
          text: 'Go To',
          align: 'center',
          sortable: false,
          value: 'link'
        }
      ]
    }
  },

  props: ['issues']
}
</script>
