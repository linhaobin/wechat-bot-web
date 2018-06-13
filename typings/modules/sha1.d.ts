// Type definitions for sha1 1.1
// Project: https://github.com/pvorb/node-sha1
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'sha1' {
  /**
   * js function for hashing messages with SHA1
   *
   * @param message - a string or buffer to hash
   * @param options - an options object
   * @returns the resultant SHA1 hash of the given message
   */
  function sha1(message: string | Buffer, options?: Sha1Options): string | Uint8Array
  namespace sha1 {

  }
  export = sha1

  interface Sha1Options {
    asBytes?: boolean
    asString?: boolean
  }
}
