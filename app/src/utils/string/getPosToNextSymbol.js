export default (str, pos = 0, reverse = false) => {
    const arrPos = str
        .split(/[A-z0-9]/g)
        .map(el => el.length > 0 ? [...el.split(''), ''] : [''])
        .flat()
        .map((el, id) => el.length > 0 && id)
        .filter(el => el !== false);
    const nextPos = arrPos[reverse ? 'findLast' : 'find'](
        el => reverse ? el < pos : el > pos
    );
    return nextPos || -1;
}