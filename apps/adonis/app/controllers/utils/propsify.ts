type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

export type Propsify<T> = {
  [K in keyof T]: T[K] extends () => Promise<infer R>
    ? UnwrapPromise<R>
    : T[K] extends () => infer R
      ? R
      : T[K]
}
