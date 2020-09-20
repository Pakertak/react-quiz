export function createControl(config, validation) {
	return {
		...config,
		value:'',
		validation,
		validate: true,
		valid: !validation,
		touched: false
	}
}

export function validate(value, validation = null) {
	if(!validation) {
		return true
	}
	
	let isValid = true

	if(validation.required) {
		isValid = value.trim() !== '' && isValid
	}

	return isValid
}

export function validateForm(formControls) {
	let isFormValid = true
	isFormValid = isFormValid && formControls.question.valid
	formControls.options.forEach(option => {
		isFormValid = isFormValid && option.valid 
	}) 
	return isFormValid
}