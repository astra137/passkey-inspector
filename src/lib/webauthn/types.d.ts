export interface CollectedClientData {
	type: 'webauthn.get' | 'webauthn.create'
	challenge: string
	origin: string
	/** https://www.w3.org/TR/webauthn-1/#dom-collectedclientdata-tokenbinding */
	tokenBinding?: {
		status: 'supported' | 'present'
		id?: string
	}
	/** Chrome Windows 10 added this */
	crossOrigin?: boolean
	/** Observed to be added by Chrome Android 11 Pixel 5 */
	androidPackageName?: string
}

export interface AuthenticatorData {
	rpIdHash: Uint8Array
	flags: {
		up: boolean
		uv: boolean
		be: boolean
		bs: boolean
		at: boolean
		ed: boolean
	}
	signCount: number
	attestedCredentialData?: {
		aaguid: Uint8Array
		credentialId: Uint8Array
		credentialPublicKey: Map<unknown, unknown>
	}
	extensions?: Map<unknown, unknown>
}

export type AttestationObject = {
	fmt: string
	attStmt: Uint8Array
	authData: Uint8Array
}
