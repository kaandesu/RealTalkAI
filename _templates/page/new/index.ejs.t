---
to: config/pages/<%= title.replace(/\s+/g, '') %>.ts
---
<% if (tabs || subpages) { %>
<% if (tabs) { %>
<% tabs.split(',').forEach(function(tab) { %>
import { <%= tab.trim().replace(/\s+/g, '').replace(/^./, (char) => char.toUpperCase()) %> } from './<%= tab.trim().replace(/\s+/g, '').replace(/^./, (char) => char.toLowerCase()) %>'
<% }) %>
<% } %>
<% if (subpages) { %>
<% subpages.split(',').forEach(function(subpage) { %>
import { <%= subpage.trim().replace(/\s+/g, '').replace(/^./, (char) => char.toUpperCase()) %> } from './<%= subpage.trim().replace(/\s+/g, '').replace(/^./, (char) => char.toLowerCase()) %>'
<% }) %>
<% } %>
<% } %>

import type { Page } from '~/types/config'

export const <%= title.replace(/\s+/g, '').replace(/^./, (char) => char.toUpperCase()) %> = ref<Page>({
  title: '<%= title %>',
<% if (href) { %>  href: '<%= href %>',<% } %>
  uid: '<%= uid || href %>',
  desc: '<%= description %>',
  tourDesc: '<%= tour_description %>',
<% if (tabs) { %>  tabs: [<%= tabs.split(',').map(name => name.trim().replace(/\s+/g, '').replace(/^./, (char) => char.toUpperCase()) + '.value').join(', ') %>],<% } %>
<% if (subpages) { %>  sub: [<%= subpages.split(',').map(name => name.trim().replace(/\s+/g, '').replace(/^./, (char) => char.toUpperCase()) + '.value').join(', ') %>],<% } %>
})
