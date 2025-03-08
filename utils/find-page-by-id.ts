import { pages } from '~/config/pages'
import type { Page } from '~/types/config'

export default function (id: string): Page {
	return pages.find((p) => p.uid === id) ?? pages[0]
}
