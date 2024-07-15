import { uint8ArrayToHex } from 'uint8array-extras'
import { css } from '../../styled-system/css'
import { bordered } from './style'

function replacer(_key: string, value: unknown) {
	if (value instanceof Uint8Array) {
		return `Uint8Array(${value.length}) ${uint8ArrayToHex(value)}`
	}

	if (value instanceof Map) {
		return `Map(${value.size}) {${[...value.keys()]}}`
	}

	return value
}

type Props<T> = {
	data: T
}

export function JsonBlock<T>(props: Props<T>) {
	const json = JSON.stringify(props.data, replacer, '\t')
	return (
		<pre
			className={css(bordered, {
				p: 'sm',
				color: 'neutral.500',
				overflowX: 'auto',
			})}
		>
			<code>{json}</code>
		</pre>
	)
}
