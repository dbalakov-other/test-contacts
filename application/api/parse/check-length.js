import ApiError from '../error';

export default (parameterName, value, rule)=> {
    if (!rule.length) { return; }
    const length = value.length;

    //Array (list available length)
    if (Array.isArray(rule.length) && rule.length.indexOf(length) <= 0) {
        throw new ApiError(400, [ 'Parameter "', parameterName, '" length must be one of the following:', rule.length.join(',')].join(''));
    }

    //Min length
    if (rule.length.min != null && rule.length.min >= length) {
        throw new ApiError(400, 'Parameter "' + parameterName + '" length must be greater than ' + rule.length.min);
    }

    //Min or equal length
    if (rule.length.minOrEqual != null && rule.length.minOrEqual > length) {
        throw new ApiError(400, 'Parameter "' + parameterName + '" length must be greater or equal than ' + rule.length.minOrEqual);
    }

    //Max length
    if (rule.length.max != null && rule.length.max <= length) {
        throw new ApiError(400, 'Parameter "' + parameterName + '" length must be less than ' + rule.length.max);
    }

    //Max or equal length
    if (rule.length.maxOrEqual != null && rule.length.maxOrEqual < length) {
        throw new ApiError(400, 'Parameter "' + parameterName + '" length must be less or equal than ' + rule.length.maxOrEqual);
    }
};