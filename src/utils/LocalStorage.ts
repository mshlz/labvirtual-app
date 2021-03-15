export abstract class LocalStorage {
    public static get(key: string): string | object {
        const value = localStorage.getItem(key)
        try {
            const parsed = JSON.parse(value)
            return parsed
        }
        catch (err) {
            return value
        }
    }

    public static set(key: string, value: string | object): void {
        if (typeof value !== 'string') value = JSON.stringify(value)
        localStorage.setItem(key, value)
    }

    public static remove(key: string): void {
        localStorage.removeItem(key)
    }

    public static wipe() {
        localStorage.clear()
    }
}