const parseNumber = (value, defaultValue) => {
    if(typeof value !== 'string'){
        return defaultValue
    }

    const number = parseInt(value)

    if(isNaN(number)){
        return defaultValue
    }

    return number
}

export const parsePaginationParams = (req) => {
    const {page, perPage} = req;

    const parsedPage = parseNumber(page, 1);
    const parsedPerPage = parseNumber(perPage, 10);

    return {page: parsedPage, perPage: parsedPerPage}
}