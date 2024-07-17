import blob from './blob.json'

export function findEntry(aaguid: string) {
	return blob.entries.find((x) => x.aaguid === aaguid)
}
