import ApiError from '../error';

export default (parameterName, value, rule)=> {
    if (!rule.type) { return value; }
    if (value == null || !rule.type) { return value; }

    let result;

    switch (rule.type) {
        case '[]':
            if (!Array.isArray(value)) {
                throw new ApiError(400, 'Parameter "' + parameterName + '" is not []');
            }
            return value;

        case 'object':
            if (typeof value !== 'object') {
                throw new ApiError(400, 'Parameter "' + parameterName + '" is not object');
            }
            return value;

        case 'object[]':
            if (!Array.isArray(value)) {
                throw new ApiError(400, 'Parameter "' + parameterName + '" is not object[]');
            }
            value.forEach((item, index)=> {
                if (typeof item !== 'object') {
                    throw new ApiError(400, 'Parameter "' + parameterName + '" is not object[] (index=' + index + ')');
                }
            });
            return value;
        
        case 'string':
            if (typeof value !== 'string') {
                throw new ApiError(400, 'Parameter "' + parameterName + '" is not string');
            }
            return value;

        case 'string[]':
            if (!Array.isArray(value)) {
                throw new ApiError(400, 'Parameter "' + parameterName + '" is not string[]');
            }
            value.forEach((item, index)=> {
                if (typeof item !== 'string') {
                    throw new ApiError(400, 'Parameter "' + parameterName + '" is not string[] (index=' + index + ')');
                }
            });
            return value;

        case 'numeric':
            result = parseFloat(value);
            if (result != value) {
                throw new ApiError(400, 'Parameter "' + parameterName + '" is not numeric');
            }
            return result;

        case 'numeric[]':
            if (!Array.isArray(value)) {
                throw new ApiError(400, 'Parameter "' + parameterName + '" is not numeric[]');
            }
            return value.map((item, index)=> {
                const result = parseFloat(item);
                if (result != item) {
                    throw new ApiError(400, 'Parameter "' + parameterName + '" is not numeric[] (index=' + index + ')');
                }
                return result;
            });

        case 'integer':
            result = parseFloat(value);
            if (result != value || result % 1 !== 0) {
                throw new ApiError(400, 'Parameter "' + parameterName + '" is not integer');
            }
            return result;

        case 'integer[]':
            if (!Array.isArray(value)) {
                throw new ApiError(400, 'Parameter "' + parameterName + '" is not integer[]');
            }
            return value.map((item, index)=> {
                const result = parseFloat(item);
                if (result != item || result % 1 !== 0) {
                    throw new ApiError(400, 'Parameter "' + parameterName + '" is not integer[] (index=' + index + ')');
                }
                return result;
            });

        case 'uuid':
            if (typeof value !== 'string' || !UUID_REGEXP.test(value)) {
                throw new ApiError(400, 'Parameter "' + parameterName + '" is not uuid');
            }
            return value;

        case 'uuid[]':
            if (!Array.isArray(value)) {
                throw new ApiError(400, 'Parameter "' + parameterName + '" is not uuid[]');
            }
            value.forEach((item, index)=> {
                if (typeof item !== 'string' || !UUID_REGEXP.test(item)) {
                    throw new ApiError(400, 'Parameter "' + parameterName + '" is not uuid[] (index=' + index + ')');
                }
            });
            return value;

        case 'boolean':
            if (BOOLEAN_VALUES.true.indexOf(value) < 0 && BOOLEAN_VALUES.false.indexOf(value) < 0) {
                throw new ApiError(400, 'Parameter "' + parameterName + '" is not boolean');
            }
            return BOOLEAN_VALUES.true.indexOf(value) >= 0;

        case 'boolean[]':
            if (!Array.isArray(value)) {
                throw new ApiError(400, 'Parameter "' + parameterName + '" is not boolean[]');
            }
            return value.map((item, index)=> {
                if (BOOLEAN_VALUES.true.indexOf(item) < 0 && BOOLEAN_VALUES.false.indexOf(item) < 0) {
                    throw new ApiError(400, 'Parameter "' + parameterName + '" is not boolean[] (index=' + index + ')');
                }
                return BOOLEAN_VALUES.true.indexOf(item) >= 0;
            });

        case 'date':
            result = parseFloat(value);
            if (result % 1 !== 0) {
                throw new ApiError(400, 'Parameter "' + parameterName + '" is not date');
            }
            return new Date(result);

        case 'date[]':
            if (!Array.isArray(value)) {
                throw new ApiError(400, 'Parameter "' + parameterName + '" is not date[]');
            }
            return value.map((item, index)=> {
                const result = parseFloat(item);
                if (result % 1 !== 0) {
                    throw new ApiError(400, 'Parameter "' + parameterName + '" is not date[] (index=' + index + ')');
                }
                return new Date(result);
            });

        default:
            throw new ApiError(400, 'Parameter "' + parameterName + '". Undefined type "' + rule.type + '"');
    }
};

const UUID_REGEXP = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
const BOOLEAN_VALUES = {
    true: [ 'true', true, 1 ],
    false: [ 'false', false, 0 ]
};