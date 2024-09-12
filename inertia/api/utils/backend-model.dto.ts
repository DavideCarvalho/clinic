import { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

export type BackendModel<T> = {
  [K in keyof T as K extends `$${string}`
    ? never
    : T[K] extends Function
      ? never
      : K]: T[K] extends BelongsTo<infer U>
    ? BackendModel<InstanceType<U>>
    : T[K] extends ManyToMany<infer U>
      ? BackendModel<InstanceType<U>>[]
      : T[K] extends object
        ? BackendModel<T[K]>
        : T[K]
}
