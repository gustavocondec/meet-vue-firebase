
export class db {
  add () {
    console.log('add')
  }
}

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

export class conectionWraper {
  async makeSaveRequest (path:string, data: object) {
    await firebase.firestore().doc(path).set(data)
  }

  async makeUpdateRequest (path:string, data: object) {
    await firebase.firestore().doc(path).update(data)
  }

  async makeDeleteRequest (path:string) {
    await firebase.firestore().doc(path).delete()
  }
}
