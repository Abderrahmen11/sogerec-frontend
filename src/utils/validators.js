export function validateEmail(email) {
  const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return re.test(email);
}

export function validatePassword(password) {
  return password && password.length >= 8;
}

export function validatePhoneNumber(phone) {
  const re = /^[0-9+\\-\\s()]+$/;
  return re.test(phone) && phone.length >= 10;
}

export function validateTicketTitle(title) {
  return title && title.length >= 5 && title.length <= 200;
}

export function validateForm(formData, rules) {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = formData[field];

    if (rule.required && (!value || value.toString().trim() === "")) {
      errors[field] = `${field} is required`;
    } else if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
    } else if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = `${field} must be at most ${rule.maxLength} characters`;
    } else if (rule.pattern && value && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${field} format is invalid`;
    }
  });

  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
