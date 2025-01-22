export function createState<T>(initialValue: T) {
    let value = initialValue;
    const listeners = new Set<(newValue: T) => void>();

    return {
        get: () => value,
        set: (newValue: T) => {
            value = newValue;
            listeners.forEach((listener) => listener(newValue));
        },
        subscribe: (listener: (newValue: T) => void) => {
            listeners.add(listener);
            return () => listeners.delete(listener); // Unsubscribe
        },
    };
}
