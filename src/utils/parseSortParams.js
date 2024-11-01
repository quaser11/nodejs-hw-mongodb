import {sortOrders} from "../constants/constants.js";

const parseSortOrder = (value) => {
    return [sortOrders.ASC, sortOrders.DESC].includes(value) ? value : sortOrders.ASC
}

const parseSortBy = (value) => {
    return value === 'name' ? value : '_id'
}

export const parseSortParams = (req) => {
    const {sortBy, sortOrder} = req;

    const parsedSortBy = parseSortBy(sortBy);
    const parsedSortParams = parseSortOrder(sortOrder)

    return {sortBy: parsedSortBy, sortOrder: parsedSortParams};
}