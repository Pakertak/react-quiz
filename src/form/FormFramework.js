export function createControl(config, validation) {
	return {
		value:'',
		...config,
		validation,
		valid: !validation,
		touched: false
	}
}