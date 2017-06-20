module.exports = (value, params)=> {
    const tokens = value.split(' ').filter((i)=>(i != null && i != ''));
    if (tokens.length == 0) { return; }
    
    return tokens.map((token)=> (
        `(lower("surname") LIKE $${params.push(`%${token}%`)} OR lower("name") LIKE $${params.push(`%${token}%`)})`
    )).join(' AND ');
};