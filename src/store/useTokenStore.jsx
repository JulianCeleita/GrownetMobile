import AsyncStorage from '@react-native-async-storage/async-storage'

AsyncStorage.clear()
AsyncStorage.getItem('test')

import { persist } from 'zustand/middleware'
import { create } from 'zustand'

const useTokenStore = create(
  (set) => ({
    token: null,
    countryCode: null,
    setToken: (newToken) => set({ token: newToken }),
    initializeToken: async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token')

        if (storedToken) {
          set({ token: storedToken })
        } else {
          console.error('no se encontro el token')
        }
      } catch (error) {
        console.error('Error al obtener el token de AsyncStorage:', error)
      }
    },
    setCountryCode: (newCountryCode) => set({ countryCode: newCountryCode }),
  }),

  {
    name: 'token-storage',
  },

  persist,
)

export default useTokenStore
