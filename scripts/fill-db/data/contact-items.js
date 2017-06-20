import random from './random';

const TYPES = [
    'мобильный',
    'домашний',
    'рабочий'
];
let id = 0;

const phone = ()=> {
    return `+7(9${10 + random(89)})-${100 + random(899)}-${10 + random(89)}-${10 + random(89)}`
};

export default (contacts)=> {
    const result = [];
    contacts.forEach((contact)=> {
        for (let i = 0; i < 1 + random(2); i++) {
            result.push({ id: id++, contact: contact.id, type: TYPES[i], text: phone() });
        }
    });

    return result;
};