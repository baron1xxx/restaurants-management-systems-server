export const countPages = (count, limit) => Math.ceil(count / limit);
export const offset = (page, limit) => limit * (page - 1);
