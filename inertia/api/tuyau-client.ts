/// <reference path="../../adonisrc.ts" />
import { createTuyau } from '@tuyau/client'
import { api } from '../../.adonisjs/api'

export const tuyau = createTuyau({
  api,
  baseUrl: 'http://192.168.15.89:3333',
})
