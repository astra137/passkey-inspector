import type { PublicKeyCredentialWithAttestationJSON } from '@github/webauthn-json'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { css } from '../styled-system/css'
import { TabCreate } from './components/TabCreate.tsx'
import { TabInspect } from './components/TabInspect.tsx'
import { button } from './components/style.ts'

export function App() {
	useRegisterSW({ immediate: true })

	const [credential, saveCredential] = useLocalStorage<
		PublicKeyCredentialWithAttestationJSON | undefined
	>('key')

	const [selectedIndex, setSelectedIndex] = useState(credential ? 1 : 0)

	function setCredential(x: PublicKeyCredentialWithAttestationJSON) {
		saveCredential(x)
		setSelectedIndex(1)
	}

	return (
		<>
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
						Inspect
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
						<TabCreate credential={credential} setCredential={setCredential} />
					</TabPanel>
					<TabPanel>
						{credential ? <TabInspect credential={credential} /> : <></>}
					</TabPanel>
					<TabPanel>Not implemented</TabPanel>
					<TabPanel>Not implemented</TabPanel>
				</TabPanels>
			</TabGroup>
		</>
	)
}
