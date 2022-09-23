"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
/**
 * Valida se o valor do ipnut fornecido é valido para as regras de validação
 * @param input Valor a ser validado
 * @param schema Schema de validação
 */
function validate(input, schema) {
    const errors = [];
    Object.keys(schema).forEach(key => {
        const value = input[key];
        const { type, required } = schema[key];
        if (!required && !value)
            return;
        if (required && value === undefined) {
            errors.push(`${key} is required`);
            return;
        }
        if (type === 'string' && typeof value !== 'string') {
            errors.push(`${key} must be a string`);
            return;
        }
        if (type === 'number' && typeof value !== 'number') {
            errors.push(`${key} must be a number`);
            return;
        }
        if (type === 'array') {
            if (!Array.isArray(value)) {
                errors.push(`${key} must be an array`);
                return;
            }
            const { items } = schema[key];
            value.forEach((item, index) => {
                if (!items) {
                    errors.push(`${key} must be an schema`);
                    return;
                }
                const itemErrors = validate(item, items);
                if (itemErrors.errors.length) {
                    errors.push(`${key}[${index}].${itemErrors.errors.join(', ')}`);
                    return;
                }
            });
        }
        if (type === 'object') {
            if (typeof value !== 'object') {
                errors.push(`${key} must be an object`);
                return;
            }
            const { items } = schema[key];
            if (!items) {
                errors.push(`${key} must be an schema`);
                return;
            }
            const itemErrors = validate(value, items);
            if (itemErrors.errors.length) {
                errors.push(`${key}.${itemErrors.errors.join(', ')}`);
                return;
            }
        }
    });
    return {
        isValid: !errors.length,
        errors,
    };
}
exports.validate = validate;
//# sourceMappingURL=index.js.map