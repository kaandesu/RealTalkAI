---
to: config/commands/<%= name %>.ts
---
import type { ActionCommand } from '~/types/config'

export const <%= name %>: ActionCommand = {
  label: '<%= label %>',
  searchId: '<%= searchId %>',
  icon: '<%= icon %>',
  group: '<%= group %>',
  action: () => {
    console.log('<%= name %> executed');
  }
}
