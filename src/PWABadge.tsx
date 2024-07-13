import './PWABadge.css'

import { useRegisterSW } from 'virtual:pwa-register/react'

export function PWABadge() {
	// periodic sync is disabled, change the value to enable it, the period is in milliseconds
	// You can remove onRegisteredSW callback and registerPeriodicSync function

	const {
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW()

	function startUpdate() {
		void updateServiceWorker(true)
	}

	function close() {
		setNeedRefresh(false)
	}

	return (
		<div className="PWABadge" role="alert" aria-labelledby="toast-message">
			{needRefresh && (
				<div className="PWABadge-toast">
					<div className="PWABadge-message">
						<span id="toast-message">
							New content available, click on reload button to update.
						</span>
					</div>
					<div className="PWABadge-buttons">
						<button className="PWABadge-toast-button" onClick={startUpdate}>
							Reload
						</button>
						<button className="PWABadge-toast-button" onClick={close}>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
