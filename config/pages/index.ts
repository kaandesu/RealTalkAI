/* AUTO-GENERATED FILE - DO NOT EDIT */
import type { Page } from '~/types/config'

import { Analytics } from './analytics'
import { Authentication } from './authentication'
import { ChangePassword } from './changePassword'
import { Dashboard } from './dashboard'
import { DashboardSettings } from './dashboardSettings'
import { ForgotPassword } from './forgotPassword'
import { Levels } from './levels'
import { NotFound } from './notFound'
import { Notifications } from './notifications'
import { Overview } from './overview'
import { Reports } from './reports'
import { Results } from './results'
import { Settings } from './settings'
import { SignIn } from './signIn'
import { SignUp } from './signUp'
import { Suggestions } from './suggestions'

export type PageId =
	| 'analytics'
	| 'authentication'
	| 'change-password'
	| 'dashboard'
	| 'dashboard-settings'
	| 'forgot-password'
	| 'levels'
	| 'not-found'
	| 'notifications'
	| 'overview'
	| 'reports'
	| 'results'
	| 'settings'
	| 'sign-in'
	| 'sign-up'
	| 'suggestions'

export const pages: Page[] = [
	Analytics.value,
	Authentication.value,
	ChangePassword.value,
	Dashboard.value,
	DashboardSettings.value,
	ForgotPassword.value,
	Levels.value,
	NotFound.value,
	Notifications.value,
	Overview.value,
	Reports.value,
	Results.value,
	Settings.value,
	SignIn.value,
	SignUp.value,
	Suggestions.value,
]

export const pagesDict: Record<string, Ref<Page>> = {
	Analytics,
	Authentication,
	ChangePassword,
	Dashboard,
	DashboardSettings,
	ForgotPassword,
	Levels,
	NotFound,
	Notifications,
	Overview,
	Reports,
	Results,
	Settings,
	SignIn,
	SignUp,
	Suggestions,
}
