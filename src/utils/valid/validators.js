export const required = value => {
    if (value) return undefined
    return "Поле не должно быть пустым"
}

export const minLengthCreator = (minLength) => (value) => {
    if (value.length < minLength) return `Минимум ${minLength} символов!`
    return undefined
}

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Некорректный email'
        : undefined
