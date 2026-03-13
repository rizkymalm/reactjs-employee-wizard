export function generateEmployeeId(dept: string, count: number) {
    const prefix = dept.slice(0, 3).toUpperCase();
    const seq = String(count + 1).padStart(3, '0');

    return `${prefix}-${seq}`;
}
