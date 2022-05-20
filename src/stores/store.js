import { writable } from 'svelte-local-storage-store'

// First param `preferences` is the local storage key.
// Second param is the initial value.
export const user = writable('user', {
    // user-structure
})

export const isValid = (ts) => {
    return !(Date.now() - 432000000 > ts)
}