import type { PublicKeyCredentialWithAttestationJSON } from '@github/webauthn-json'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useState } from 'react'
import { css } from '../styled-system/css'
import { PWABadge } from './PWABadge.tsx'
import { TabAttestation } from './components/TabAttestation.tsx'
import { TabRegistration } from './components/TabRegistration.tsx'
import { button } from './components/style.ts'

export function App() {
	const [credential, saveCredential] = useLocalStorage<
		PublicKeyCredentialWithAttestationJSON | undefined
	>('key')

	const [selectedIndex, setSelectedIndex] = useState(credential ? 1 : 0)

	function setCredential(x: PublicKeyCredentialWithAttestationJSON) {
		saveCredential(x)
		setSelectedIndex(1)
	}

	function clearCredential() {
		saveCredential(undefined)
		setSelectedIndex(0)
	}

	return (
		<>
			<PWABadge />
			<TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
				<TabList
					className={css({
						display: 'flex',
						flex: 'row',
						justifyContent: 'center',
						gap: 'md',
						padding: 'md',
					})}
				>
					<Tab className={button({ selectable: true })}>Create</Tab>
					<Tab className={button({ selectable: true })} disabled={!credential}>
						Attestation
					</Tab>
					<Tab className={button({ selectable: true })} disabled>
						Metadata
					</Tab>
					<Tab className={button({ selectable: true })} disabled>
						Assertion
					</Tab>
				</TabList>
				<TabPanels className={css({ padding: 'md' })}>
					<TabPanel>
						<TabRegistration
							credential={credential}
							setCredential={setCredential}
						/>
					</TabPanel>
					<TabPanel>
						{credential ? (
							<TabAttestation
								credential={credential}
								clearCredential={clearCredential}
							/>
						) : (
							<></>
						)}
					</TabPanel>
					<TabPanel>Not implemented</TabPanel>
					<TabPanel>Not implemented</TabPanel>
				</TabPanels>
			</TabGroup>
		</>
	)
}
