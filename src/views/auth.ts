
export function hasAuthData() {
    const item = localStorage.getItem("auth")
    if (item) {
        return true
    }
    return false
}