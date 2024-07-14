import type { PublicKeyCredentialWithAttestationJSON } from '@github/webauthn-json'
import { Button } from '@headlessui/react'
import { useMemo } from 'react'
import { base64ToUint8Array } from 'uint8array-extras'
import { css } from '../../styled-system/css'
import { container } from '../../styled-system/patterns'
import { inspectAttestationObject } from '../lib/webauthn'
import { JsonBlock } from './JsonBlock'
import { bordered, button } from './style'

type Props = {
	credential: PublicKeyCredentialWithAttestationJSON
	clearCredential: () => void
}

export function TabAttestation({ credential, clearCredential }: Props) {
	const clientDataJSON = useMemo(() => {
		return JSON.parse(
			new TextDecoder().decode(
				base64ToUint8Array(credential.response.clientDataJSON),
			),
		)
	}, [credential.response.clientDataJSON])

	const attestationObject = useMemo(() => {
		return inspectAttestationObject(
			base64ToUint8Array(credential.response.attestationObject),
		)
	}, [credential.response.attestationObject])

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

				<JsonBlock
					data={clientDataJSON}
					className={css(bordered, {
						p: 'sm',
						color: 'neutral.500',
						overflowX: 'auto',
					})}
				/>

				<JsonBlock
					data={attestationObject}
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
