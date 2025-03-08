import { useToastManagerStore } from '../stores/toast-manager'
import type { ToastCreateParam } from '../stores/toast-manager'

export default function (opts: ToastCreateParam): Function {
	return useToastManagerStore().create(opts)
}
