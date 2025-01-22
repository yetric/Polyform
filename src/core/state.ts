export function createState<T>(initialValue: T) {
    let value = initialValue;
    const listeners = new Set<(val: T) => void>();

    return {
        get: () => value,
        set: (newValue: T) => {
            value = newValue;
            listeners.forEach((listener) => listener(value));
        },
        subscribe: (listener: (val: T) => void) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    };
}
