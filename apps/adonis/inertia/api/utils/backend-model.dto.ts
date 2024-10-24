import { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export type BackendModel<T> = {
  [K in keyof T as K extends `$${string}`
    ? never
    : T[K] extends Function
      ? never
      : K]: T[K] extends BelongsTo<infer U>
    ? BackendModel<InstanceType<U>>
    : T[K] extends HasMany<infer U>
      ? BackendModel<InstanceType<U>>[]
      : T[K] extends DateTime
        ? string
        : T[K] extends object
          ? BackendModel<T[K]>
          : T[K]
}
