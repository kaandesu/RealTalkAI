import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'

type ToastPosition =
	| 'top-left'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-right'
	| 'top-center'
	| 'bottom-center'

type ToastTypes =
	| 'normal'
	| 'action'
	| 'success'
	| 'info'
	| 'warning'
	| 'error'
	| 'loading'
	| 'default'

type ToastT = {
	icon?: Component
	closeButton?: boolean
	dismissible?: boolean
	description?: string | Component
	duration?: number
	important?: boolean
	action?: {
		label: string | Component
		onClick: (event: MouseEvent) => void
	}
	cancel?: {
		label: string | Component
		onClick?: () => void
	}
	onDismiss?: (toast: ToastT) => void
	onAutoClose?: (toast: ToastT) => void
	unstyled?: boolean
	class?: string
	descriptionClass?: string
	position?: ToastPosition
}

export type ToastCreateParam = {
	message: string
	toastOps?: ToastT
	type?: ToastTypes
}

export const useToastManagerStore = defineStore(
	'ToastManagerStore',
	() => {
		const create = ({
			message,
			toastOps = {},
			type = 'default',
		}: ToastCreateParam): Function => {
			switch (type) {
				case 'success':
					return () => toast.success(message, { ...toastOps } as any)
				case 'info':
					return () => toast.info(message, { ...toastOps } as any)
				case 'warning':
					return () => toast.warning(message, { ...toastOps } as any)
				case 'error':
					return () => toast.error(message, { ...toastOps } as any)
				case 'loading':
					return () => toast.loading(message, { ...toastOps } as any)
				default:
					return () => toast(message, { ...toastOps } as any)
			}
		}

		return { create }
	},
	{
		persist: {
			paths: [],
		},
	},
)
