import { Decoder } from 'cbor-x'
import { decodeAuthData } from './authdata'
import type { AttestationObject } from './types'

export function inspectAttestationObject(data: Uint8Array): AttestationObject {
	const decoder = new Decoder({ useRecords: true })
	const attObj = decoder.decode(data)
	return {
		fmt: attObj.get('fmt'),
		attStmt: attObj.get('attStmt'),
		authData: decodeAuthData(attObj.get('authData')),
	}
}
