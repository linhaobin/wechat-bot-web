type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type Overwrite<T, U> = Omit<T, Extract<keyof T, keyof U>> & U

type PartialWith<T, K extends keyof T> = Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>

// declare global {
interface NodeModule {
  hot: {
    accept(path?: string, callback?: () => void): void
  }
}
// }
