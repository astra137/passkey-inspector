import type { PublicKeyCredentialWithAttestationJSON } from '@github/webauthn-json'
import { useMemo } from 'react'
import { css } from '../../styled-system/css'
import { container } from '../../styled-system/patterns'
import {
	decodeAttestationObject,
	decodeAuthData,
	decodeClientDataJSON,
} from '../lib/webauthn'
import { JsonBlock } from './JsonBlock'

type Props = {
	credential: PublicKeyCredentialWithAttestationJSON
}

export function TabInspect({ credential }: Props) {
	const clientDataJSON = useMemo(
		() => decodeClientDataJSON(credential.response.clientDataJSON),
		[credential.response.clientDataJSON],
	)

	const attestationObject = useMemo(
		() => decodeAttestationObject(credential.response.attestationObject),
		[credential.response.attestationObject],
	)

	const authData = useMemo(
		() => decodeAuthData(attestationObject.authData),
		[attestationObject.authData],
	)

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
				<section>
					<h2>https://github.com/github/webauthn-json</h2>
					<JsonBlock data={credential} />
				</section>

				<section>
					<h2>https://www.w3.org/TR/webauthn-2/#dictionary-client-data</h2>
					<JsonBlock data={clientDataJSON} />
				</section>

				<section>
					<h2>https://www.w3.org/TR/webauthn-2/#sctn-attestation</h2>
					<JsonBlock data={attestationObject} />
				</section>

				<section>
					<h2>https://www.w3.org/TR/webauthn-2/#sctn-authenticator-data</h2>
					<JsonBlock data={authData} />
				</section>
			</div>
		</>
	)
}
