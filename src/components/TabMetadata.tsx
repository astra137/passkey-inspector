import type { PublicKeyCredentialWithAttestationJSON } from '@github/webauthn-json'
import { useMemo } from 'react'
import { css } from '../../styled-system/css'
import { container } from '../../styled-system/patterns'
import { findEntry } from '../lib/mds/blob'
import { decodeAttestationObject, decodeAuthData } from '../lib/webauthn'
import { JsonBlock } from './JsonBlock'

type Props = {
	credential: PublicKeyCredentialWithAttestationJSON
}

export function TabMetadata({ credential }: Props) {
	const attestationObject = useMemo(
		() => decodeAttestationObject(credential.response.attestationObject),
		[credential.response.attestationObject],
	)

	const authData = useMemo(
		() => decodeAuthData(attestationObject.authData),
		[attestationObject.authData],
	)

	const mdsEntry = useMemo(() => {
		if (authData.attestedCredentialData) {
			return findEntry(authData.attestedCredentialData.aaguid)
		}
		return null
	}, [authData])

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
					<h2>https://fidoalliance.org/metadata/</h2>
					<JsonBlock data={mdsEntry} />
				</section>
			</div>
		</>
	)
}
