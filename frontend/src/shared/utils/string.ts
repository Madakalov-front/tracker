/**
 * Делает первую букву строки заглавной
 */
export const capitalizeFirstLetter = (str: string) => {
    return str.slice(0, 1).toLocaleUpperCase() + str.slice(1);
};
