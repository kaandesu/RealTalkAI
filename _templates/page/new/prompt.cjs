module.exports = [
	{
		type: 'input',
		name: 'title',
		message: 'Page title:',
	},
	{
		type: 'input',
		name: 'href',
		message: 'Page URL path (leave empty to discard):',
	},
	{
		type: 'input',
		name: 'description',
		message: 'Provide a short description (or leave blank).',
	},
	{
		type: 'input',
		name: 'uid',
		message: 'Unique identifier (leave empty to derive from href):',
	},
	{
		type: 'input',
		name: 'icon',
		message: 'Icon name (leave empty to discard):',
	},
	{
		type: 'input',
		name: 'tour_description',
		message: 'Enter a guide description for onboarding (or leave blank).',
	},
	{
		type: 'confirm',
		name: 'hasTabs',
		message: 'Does this page have tabs?',
		default: false,
	},
	{
		type: 'input',
		name: 'tabs',
		message: 'List the tab names (comma-separated):',
		when: (answers) => answers.hasTabs,
	},
	{
		type: 'confirm',
		name: 'hasSubpages',
		message: 'Does this page have subpages?',
		default: false,
	},
	{
		type: 'input',
		name: 'subpages',
		message: 'List the subpage names (comma-separated):',
		when: (answers) => answers.hasSubpages,
	},
]
