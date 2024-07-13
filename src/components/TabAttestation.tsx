import type { RegistrationPublicKeyCredential } from '@github/webauthn-json/browser-ponyfill'
import { Button } from '@headlessui/react'
import { css } from '../../styled-system/css'
import { container } from '../../styled-system/patterns'
import { JsonBlock } from './JsonBlock'
import { bordered, button } from './style'

type Props = {
	credential?: RegistrationPublicKeyCredential
	clearCredential: () => void
}

export function TabAttestation({ credential, clearCredential }: Props) {
	if (!credential) {
		return <></>
	}

	return (
		<>
			<div
				className={css(container.raw(), {
					display: 'flex',
					flexDir: 'column',
					gap: 'md',
					'&>fieldset': {
						display: 'flex',
						justifyContent: 'space-between',
					},
					maxW: '3xl',
				})}
			>
				<Button onClick={clearCredential} className={button()}>
					Forget key
				</Button>
				<JsonBlock
					data={credential}
					className={css(bordered, {
						p: 'sm',
						color: 'neutral.500',
						overflowX: 'auto',
					})}
				/>
			</div>
		</>
	)
}
