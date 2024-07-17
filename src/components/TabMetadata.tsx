import type { PublicKeyCredentialWithAttestationJSON } from '@github/webauthn-json'
import { useMemo } from 'react'
import { UuidTool } from 'uuid-tool'
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

	const aaguid = useMemo(() => {
		return authData.attestedCredentialData
			? UuidTool.toString([...authData.attestedCredentialData.aaguid])
			: null
	}, [authData])

	const mdsEntry = useMemo(() => {
		return aaguid ? findEntry(aaguid) : null
	}, [aaguid])

	const mdsExplorerUrl = `https://opotonniee.github.io/fido-mds-explorer/?aaguid=${aaguid}`

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
				<section
					className={css({ display: 'flex', flexDir: 'column', gap: 'md' })}
				>
					<a
						className={css({ _hover: { color: 'green.500' } })}
						href={mdsExplorerUrl}
					>
						{mdsExplorerUrl}
					</a>
				</section>

				<section>
					<h2>https://fidoalliance.org/metadata/</h2>
					<JsonBlock data={mdsEntry} />
				</section>
			</div>
		</>
	)
}
