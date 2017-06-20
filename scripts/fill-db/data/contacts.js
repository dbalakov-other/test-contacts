import random from './random';

const NAMES = [
    [ 'Дмитрий', 'Олег', 'Иван', 'Василий', 'Михаил', 'Кирилл', 'Никита' ],
    [ 'Марина', 'Мария', 'Анастасия', 'Татьяна', 'Алена' ]
];
const SURNAMES = [
    [ 'Иванов', 'Петров', 'Сидоров' ],
    [ 'Иванова', 'Петрова', 'Сидорова' ]
];

let id = 0;
const result = [];

const contact = ()=> {
    const sex = random(1);
    const names = NAMES[sex];
    const surnames = SURNAMES[sex];

    return {
        id: id++,
        user: 0,
        name: names[random(names.length - 1)],
        surname: surnames[random(surnames.length - 1)]
    };
};
for (let i = 0; i < 10000; i++) { result.push(contact()); }

export default result;