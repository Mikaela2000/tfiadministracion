const validate = (formData) => {
    let errors = {};

    const regexUpperCase = /[A-Z]/;
    const regexNumber = /\d/;
    const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const minLength = 8;
    const maxLength = 16;

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación del email (solo si no está vacío)
    if (formData.email && !emailFormat.test(formData.email)) {
        errors.email = "⚠ El formato del correo electrónico no es válido";
    }

    // Validación de la contraseña (solo si no está vacía)
    if (formData.password) {
        if (formData.password.length < minLength) {
            errors.password = `⚠ La contraseña debe tener al menos ${minLength} caracteres`;
        } else if (formData.password.length > maxLength) {
            errors.password = `⚠ La contraseña no puede tener más de ${maxLength} caracteres`;
        } else if (!regexUpperCase.test(formData.password)) {
            errors.password = "⚠ La contraseña debe contener al menos una letra mayúscula";
        } else if (!regexNumber.test(formData.password)) {
            errors.password = "⚠ La contraseña debe contener al menos un número";
        } else if (!regexSpecialChar.test(formData.password)) {
            errors.password = "⚠ La contraseña debe contener al menos un carácter especial (!@#$%^&*)";
        }
    }

    // Validación de confirmación de contraseña (solo si existe password y confirmPassword)
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "⚠ Las contraseñas no coinciden";
    }

    return errors;
};

export default validate;
