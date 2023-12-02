import AsyncStorage from '@react-native-async-storage/async-storage'
import { persist } from 'zustand/middleware'
import { create } from 'zustand'

const useTokenStore = create(
  persist(
    (set) => ({
      token: null,
      countryCode: null,
      phoneNumber: '',
      setPhoneNumber: (newPhoneNumber) => set({ phoneNumber: newPhoneNumber }),
      setToken: (newToken) => {
        set({ token: newToken })
        console.log('Token guardado:', newToken)
      },
      initializeToken: async () => {
        try {
          const storedToken = await AsyncStorage.getItem('token')

          if (storedToken) {
            set({ token: JSON.parse(storedToken) })
            console.log('Token recuperado:', JSON.parse(storedToken))
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
      storage: {
        getItem: async (name) => {
          const result = await AsyncStorage.getItem(name)
          return result ? JSON.parse(result) : null
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value))
        },
      },
    },
  ),
)

export default useTokenStore
