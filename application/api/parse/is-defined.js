import ApiError from '../error';

export default (parameterName, value, rule)=> {
    if (!rule.isDefined || value != null) { return; }
    throw new ApiError(400, 'Parameter "' + parameterName + '" is required');
};