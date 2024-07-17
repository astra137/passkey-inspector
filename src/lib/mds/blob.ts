import { UuidTool } from 'uuid-tool'
import blob from './blob.json'

export function findEntry(aaguid: Uint8Array) {
	const uuid = UuidTool.toString([...aaguid])
	return blob.entries.find((x) => x.aaguid === uuid)
}
