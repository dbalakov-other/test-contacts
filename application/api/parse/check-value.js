import ApiError from '../error';

export default (parameterName, value, rule)=> {
    if (!rule.value) { return; }

    //Array (list available values)
    if (Array.isArray(rule.value) && rule.value.indexOf(value) <= 0) {
        throw new ApiError(400, [ 'Parameter "', parameterName, '" must be one of the following:', rule.value.join(',')].join(''));
    }

    //Min value
    if (rule.value.min != null && rule.value.min >= value) {
        throw new ApiError(400, 'Parameter "' + parameterName + '" must be greater than ' + rule.value.min);
    }

    //Min or equal value
    if (rule.value.minOrEqual != null && rule.value.minOrEqual > value) {
        throw new ApiError(400, 'Parameter "' + parameterName + '" must be greater or equal than ' + rule.value.minOrEqual);
    }

    //Max value
    if (rule.value.max != null && rule.value.max <= value) {
        throw new ApiError(400, 'Parameter "' + parameterName + '" must be less than ' + rule.value.max);
    }

    //Max or equal value
    if (rule.value.maxOrEqual != null && rule.value.maxOrEqual < value) {
        throw new ApiError(400, 'Parameter "' + parameterName + '" must be less or equal than ' + rule.value.maxOrEqual);
    }
};