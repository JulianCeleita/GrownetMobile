import { StyleSheet } from 'react-native'

export const ChatStyle = StyleSheet.create({
  chat: {
    backgroundColor: 'white',
    height: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  tittle: {
    fontFamily: 'PoppinsSemi',
    fontSize: 24,
    color: '#026cd2',
    marginTop: 25,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    color: '#04444f',
    textAlign: 'center',
    marginHorizontal: 35,
  },
  image: {
    marginTop: -45,
  },
})
