export type Layout = 'dashboard' | 'auth'

export type AuthenticationStructure = {
	custom?: boolean
	providers?: FederatedAuthProviderOptions[]
	tosAndPrivacy?: {
		required: boolean
		tos: string
		privacy: string
	}
	mfa: boolean
}

export type ActionCommand = {
	label: string
	icon?: string
	group: string
	removed?: boolean
	disabled?: boolean | ComputedRef<boolean> | Ref<boolean>
	searchId: string
	shortCut?: MagicKey
	action: Function
}

export type CommandGroup = {
	name?: string
	commands: ActionCommand[]
}

export type Page = {
	title?: string
	uid: string
	label?: string
	href?: string
	icon?: string
	isCollapsed?: boolean
	layout?: Layout
	desc?: string
	hideMobile?: boolean
	sub?: Page[]
	action?: Function
	tabs?: Page[]
	tourDesc?: string
	auth?: {
		title?: string
		desc?: string
		resendButton?: boolean
		numOfChars?: number
		background?: string
		backgroundImage?: string
	}
	// NOTE: i don't know about this one
	sidebarSeperator?: boolean
}

export type DashboardConfig = {
	title?: string
	desc?: string
	logo?: string
	logoFallback?: string
	pages: Page[]
}

type UppercaseLetters =
	| 'A'
	| 'B'
	| 'C'
	| 'D'
	| 'E'
	| 'F'
	| 'G'
	| 'H'
	| 'I'
	| 'J'
	| 'K'
	| 'L'
	| 'M'
	| 'N'
	| 'O'
	| 'P'
	| 'Q'
	| 'R'
	| 'S'
	| 'T'
	| 'U'
	| 'V'
	| 'W'
	| 'X'
	| 'Y'
	| 'Z'

type Digits = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

type Keys = UppercaseLetters | Digits

// TODO: test if this is ackshually true
type LeaderKey = 'Cmd' | 'Alt' | 'Ctrl' | 'Shift'
export type MagicKey = `${LeaderKey}+${Keys}`
