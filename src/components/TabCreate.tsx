import type { PublicKeyCredentialWithAttestationJSON } from '@github/webauthn-json'
import { create } from '@github/webauthn-json/browser-ponyfill'
import {
	Button,
	Description,
	Dialog,
	DialogPanel,
	DialogTitle,
	Field,
	Fieldset,
	Legend,
	Radio,
	RadioGroup,
} from '@headlessui/react'
import { useState } from 'react'
import { css } from '../../styled-system/css'
import { container } from '../../styled-system/patterns'
import { JsonBlock } from './JsonBlock'
import { bordered, button, clickable } from './style'

const radioGroup = css(bordered, {
	display: 'flex',
	flexDir: 'column',
	md: {
		flexDir: 'row',
		justifyContent: 'stretch',
		'&>*': {
			flex: 1,
			display: 'flex',
		},
	},
})

const radioBlock = css(clickable, {
	display: 'flex',
	alignItems: 'center',
	gap: 'sm',
	p: 'sm',
	textWrap: 'nowrap',
	color: 'neutral.500',
	_checked: {
		color: 'green.500',
		bg: 'white/8',
	},
})

const radioLabel = css({
	fontSize: 'lg',
	color: 'neutral.500',
	display: 'flex',
	alignItems: 'center',
})

const RadioCheck = () => {
	return (
		<div
			className={`group ${css({
				w: 3,
				h: 3,
				borderRadius: 'full',
				bg: 'white/10',
				color: 'green.500',
				boxShadow: 'inset 0 0 0 0',
				transition: 'box-shadow 120ms',
				_groupChecked: {
					boxShadow: 'inset 0 0 0 3px',
				},
			})}`}
		/>
	)
}

type RegistrationProps = {
	credential?: PublicKeyCredentialWithAttestationJSON
	setCredential: (x: PublicKeyCredentialWithAttestationJSON) => void
}

export function TabCreate(props: RegistrationProps) {
	const [challenge, _setChallenge] = useState<Uint8Array>(
		crypto.getRandomValues(new Uint8Array(16)),
	)

	const [attestation, setAttestation] =
		useState<AttestationConveyancePreference>('direct')

	const [userVerification, setUserVerification] =
		useState<UserVerificationRequirement>('preferred')

	const [residentKey, setResidentKey] =
		useState<ResidentKeyRequirement>('required')

	const [attachment, setAttachment] = useState<AuthenticatorAttachment | ''>('')

	const publicKey: PublicKeyCredentialCreationOptions = {
		rp: {
			name: 'passkey-inspector',
		},
		user: {
			id: new Uint8Array([
				1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
			]),
			name: 'test@example.com',
			displayName: 'Test User',
		},
		pubKeyCredParams: [
			{ type: 'public-key', alg: -7 },
			{ type: 'public-key', alg: -257 },
		],
		challenge,
		attestation,
		authenticatorSelection: {
			userVerification,
			residentKey,
			authenticatorAttachment: attachment || undefined,
		},
		extensions: {
			credProps: true,
		},
	}

	const [error, setError] = useState<Error | null>(null)

	function startCreateKey() {
		// TODO: useEffect and aborting
		const ac = new AbortController()
		create({ publicKey, signal: ac.signal })
			.then(key => props.setCredential(key.toJSON()))
			.catch(err => setError(err))
	}

	return (
		<>
			{/* <Fieldset>
				<Field className={css({ w: 'sm' })}>
					<Label className={css({ fontSize: 'lg' })}>Presets</Label>
					<Button className={button()}>Passkey</Button>
					<Button className={button()}>External device</Button>
				</Field>
			</Fieldset> */}

			{/* <Fieldset>
				<Field>
					<Label className={css({ fontSize: 'lg' })}>
						AttestationConveyancePreference
					</Label>
					<Listbox value={attestation} onChange={setAttestation}>
						<ListboxButton className={css(button.raw(), containerBtn)}>
							<ChevronDownIcon aria-hidden="true" className={icon()} />
							{attestation}
						</ListboxButton>
						<ListboxOptions anchor="bottom" className={listBoxOptions}>
							{ATTESTATIONS.map(x => (
								<ListboxOption
									key={x}
									value={x}
									className={css(clickable, containerBtn, listboxOption)}
								>
									<CheckIcon className={icon()} />
									{x}
								</ListboxOption>
							))}
						</ListboxOptions>
					</Listbox>
				</Field>
			</Fieldset> */}

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
				<Fieldset>
					<Legend className={radioLabel}>User Verification Requirement</Legend>
					<RadioGroup
						value={userVerification}
						onChange={setUserVerification}
						className={radioGroup}
					>
						<Field>
							<Radio value="discouraged" className={`group ${radioBlock}`}>
								<RadioCheck />
								<code>discouraged</code>
							</Radio>
						</Field>
						<Field>
							<Radio value="preferred" className={`group ${radioBlock}`}>
								<RadioCheck />
								<code>preferred</code>
							</Radio>
						</Field>
						<Field>
							<Radio value="required" className={`group ${radioBlock}`}>
								<RadioCheck />
								<code>required</code>
							</Radio>
						</Field>
					</RadioGroup>
				</Fieldset>

				<Fieldset>
					<Legend className={radioLabel}>Resident Key Requirement</Legend>
					<RadioGroup
						value={residentKey}
						onChange={setResidentKey}
						className={radioGroup}
					>
						<Field>
							<Radio value="discouraged" className={`group ${radioBlock}`}>
								<RadioCheck />
								<code>discouraged</code>
							</Radio>
						</Field>
						<Field>
							<Radio value="preferred" className={`group ${radioBlock}`}>
								<RadioCheck />
								<code>preferred</code>
							</Radio>
						</Field>
						<Field>
							<Radio value="required" className={`group ${radioBlock}`}>
								<RadioCheck />
								<code>required</code>
							</Radio>
						</Field>
					</RadioGroup>
				</Fieldset>

				<Fieldset>
					<Legend className={radioLabel}>Authenticator Attachment</Legend>
					<RadioGroup
						value={attachment}
						onChange={setAttachment}
						className={radioGroup}
					>
						<Field>
							<Radio value="" className={`group ${radioBlock}`}>
								<RadioCheck />
								<code>undefined</code>
							</Radio>
						</Field>
						<Field>
							<Radio value="cross-platform" className={`group ${radioBlock}`}>
								<RadioCheck />
								<code>cross-platform</code>
							</Radio>
						</Field>
						<Field>
							<Radio value="platform" className={`group ${radioBlock}`}>
								<RadioCheck />
								<code>plaform</code>
							</Radio>
						</Field>
					</RadioGroup>
				</Fieldset>

				<Fieldset>
					<Legend className={radioLabel}>
						Attestation Conveyance Preference
					</Legend>
					<RadioGroup
						value={attestation}
						onChange={setAttestation}
						className={radioGroup}
					>
						<Field>
							<Radio value="none" className={`group ${radioBlock}`}>
								<RadioCheck />
								<code>none</code>
							</Radio>
						</Field>
						<Field>
							<Radio value="direct" className={`group ${radioBlock}`}>
								<RadioCheck />
								<code>direct</code>
							</Radio>
						</Field>
						<Field>
							<Radio value="indirect" className={`group ${radioBlock}`}>
								<RadioCheck />
								<code>indirect</code>
							</Radio>
						</Field>
						<Field>
							<Radio value="enterprise" className={`group ${radioBlock}`}>
								<RadioCheck />
								<code>enterprise</code>
							</Radio>
						</Field>
					</RadioGroup>
				</Fieldset>

				<Button onClick={startCreateKey} className={button()}>
					Create key
				</Button>
			</div>

			<div className={css(container.raw(), { maxW: '3xl', p: 'md' })}>
				<JsonBlock data={publicKey} />
			</div>

			<Dialog
				open={!!error}
				onClose={() => setError(null)}
				className={css({ position: 'relative', zIndex: 50 })}
			>
				<div
					className={css({
						position: 'fixed',
						display: 'flex',
						w: 'screen',
						h: 'screen',
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						alignItems: 'center',
						justifyContent: 'center',
						bg: 'black/80',
						backdropFilter: 'auto',
						backdropBlur: 'sm',
					})}
				>
					<DialogPanel
						className={css({
							borderRadius: 'md',
							borderColor: 'white/10',
							borderStyle: 'solid',
							borderWidth: '1px',
							bg: 'black',
							p: 'md',
							display: 'flex',
							flexDir: 'column',
							gap: 'md',
							maxW: 'xl',
						})}
					>
						<DialogTitle className={css({ fontSize: 'xl' })}>
							Operation failed
						</DialogTitle>
						<Description>
							An error was caught while calling the WebAuthn API.
						</Description>
						<output
							className={css({ color: 'red.500', fontFamily: 'monospace' })}
						>
							{String(error)}
						</output>
						<p className={css({ color: 'neutral.500' })}>
							More details logged to console.
						</p>
						<Button onClick={() => setError(null)} className={button()}>
							Close
						</Button>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	)
}
