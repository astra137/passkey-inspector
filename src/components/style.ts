import { css, cva } from '../../styled-system/css'

export const bordered = css.raw({
	borderColor: 'white/5',
	borderWidth: '1px',
	borderStyle: 'solid',
	borderRadius: 'lg',
	backgroundColor: 'neutral.900',
	// backdropFilter: 'auto',
	// backdropBlur: 'md',
})

export const clickable = css.raw({
	cursor: 'pointer',
	transition: 'background 120ms',
	_disabled: {
		color: 'white/15',
		cursor: 'not-allowed',
	},
	_hover: {
		backgroundColor: 'white/12',
	},
	_active: {
		backgroundColor: 'white/15',
		transition: 'background 0ms',
	},
})

export const button = cva({
	base: css.raw(bordered, clickable, {
		p: 'sm',
	}),
	variants: {
		selectable: {
			true: {
				_selected: {
					color: 'green.500',
				},
			},
		},
	},
})

export const icon = cva({
	base: {
		pointerEvents: 'none',
	},
	variants: {
		mode: {
			inline: {
				display: 'inline-block',
				width: 5,
				height: 5,
			},
		},
	},
	defaultVariants: {
		mode: 'inline',
	},
})
