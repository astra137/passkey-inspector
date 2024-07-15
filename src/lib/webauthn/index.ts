import { Decoder } from 'cbor-x'
import { base64ToUint8Array } from 'uint8array-extras'
import type {
	AttestationObject,
	AuthenticatorData,
	CollectedClientData,
} from './types'

export function decodeClientDataJSON(base64url: string): CollectedClientData {
	return JSON.parse(new TextDecoder().decode(base64ToUint8Array(base64url)))
}

export function decodeAttestationObject(base64url: string): AttestationObject {
	const decoder = new Decoder({ useRecords: true })
	const attObj = decoder.decode(base64ToUint8Array(base64url))
	return {
		fmt: attObj.get('fmt'),
		attStmt: attObj.get('attStmt'),
		authData: attObj.get('authData'),
	}
}

function decodeCborMapSeq(data: Uint8Array): Map<unknown, unknown>[] {
	const decoder = new Decoder({ useRecords: true })
	const seq: unknown = decoder.decodeMultiple(data)
	if (!Array.isArray(seq)) {
		throw new Error(`expected array, decoded ${seq}`)
	}
	for (const map of seq) {
		if (!(map instanceof Map)) {
			throw new Error(`expected map, decoded ${map}`)
		}
	}
	return seq
}

function decodeFlags(authData: Uint8Array) {
	const x = authData[32]
	return {
		up: Boolean(x & (1 << 0)),
		uv: Boolean(x & (1 << 2)),
		be: Boolean(x & (1 << 3)),
		bs: Boolean(x & (1 << 4)),
		at: Boolean(x & (1 << 6)),
		ed: Boolean(x & (1 << 7)),
	}
}

/** https://www.w3.org/TR/webauthn-2/#authenticator-data */
export function decodeAuthData(data: Uint8Array): AuthenticatorData {
	const dv = new DataView(data.buffer, data.byteOffset, data.byteLength)

	// [0..     ][32   ][33..     ][37..    ]
	// [rpIdHash][flags][signCount][variable]
	const flags = decodeFlags(data)
	const rpIdHash = data.subarray(0, 32)
	const signCount = dv.getUint32(33)

	if (flags.at) {
		const aaguid = data.subarray(37, 53)
		const credentialIdLength = dv.getUint16(53)
		const credentialId = data.subarray(55, 55 + credentialIdLength)
		const credentialCbor = data.subarray(55 + credentialIdLength)
		const [credentialPublicKey, extensions] = decodeCborMapSeq(credentialCbor)
		return {
			rpIdHash,
			flags,
			signCount,
			extensions,
			attestedCredentialData: {
				aaguid,
				credentialId,
				credentialPublicKey,
			},
		}
	}

	const extensionsCbor = data.subarray(37)
	const [extensions] = decodeCborMapSeq(extensionsCbor)
	return {
		rpIdHash,
		flags,
		signCount,
		extensions,
	}
}
