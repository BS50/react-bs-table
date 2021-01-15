type PlainObject<T = unknown> = Record<string, T>

export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value)
}

export function isObject(value: unknown): value is PlainObject {
    return typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]'
}

// deep equal works with objects and arrays
export function isEqual(lhs: PlainObject | unknown[], rhs: PlainObject | unknown[]): boolean {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false
    }
    for (const [key, value] of Object.entries(lhs)) {
        let rightValue
        if (isArray(rhs)) {
            rightValue = rhs[Number.parseInt(key)]
        } else {
            rightValue = (rhs as PlainObject)[key]
        }
        if (typeof value === 'function' && typeof rightValue === 'function') {
            if (value.toString() === rightValue.toString()) {
                continue
            }
            return false
        } else if ((isArray(value) && isArray(rightValue)) || (isObject(value) && isObject(rightValue))) {
            if (isEqual(value, rightValue)) {
                continue
            }
            return false
        } else if (Number.isNaN(value) && Number.isNaN(rightValue)) {
            continue
        }
        if (value !== rightValue) {
            return false
        }
    }
    return true
}
