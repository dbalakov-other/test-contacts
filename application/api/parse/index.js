import checkAndConvertType from './check-type';
import ApiError from '../error';
import isDefined from './is-defined';
import checkValue from './check-value';
import checkLength from './check-length';

function parseParams(request, rules) {
    const result = {};
    Object.keys(rules).forEach(function(parameterName) {
        const rule = rules[parameterName] || {};
        const context = rule.context ? request[rule.context] : request;
        if (context == null) { throw new ApiError(400, 'Context "' + rule.context + '" not found'); }
        
        const value = checkAndConvertType(parameterName, context[rule.name || parameterName], rule);
        CHECKS.forEach((check)=> (check(parameterName, value, rule)));

        result[parameterName] = value;
    });

    return result;
}

const CHECKS = [ isDefined, checkValue, checkLength ];

export default parseParams;