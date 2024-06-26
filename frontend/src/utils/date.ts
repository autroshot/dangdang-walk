export const getCurrentDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const nowdate = `${year}${month}${day}`;

    return nowdate;
};

export const getCurrentTime = (date: Date) => {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const nowtime = `${hour}${minute}`;

    return nowtime;
};

export const getHours = (date: Date) => {
    const hour = date.getHours().toString().padStart(2, '0');
    return hour;
};
export const formTime = (date: Date) => {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const nowtime = `${hour}:${minute}`;

    return nowtime;
};
export const getElapsedTime = (start: Date, end: Date) => {
    return (end.getTime() - start.getTime()) / 1000;
};

export const formDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const formDay = (date: Date): string => {
    return date.getDate().toString();
};
