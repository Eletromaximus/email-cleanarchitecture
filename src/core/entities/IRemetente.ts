export class IRemetente {
  email: string
  name: string
  description: string
  saveInMemory: boolean

  constructor (
    email: string,
    name: string,
    description: string,
    saveInMemory: boolean
  ) {
    this.email = email
    this.name = name
    this.description = description
    this.saveInMemory = saveInMemory
  }
}
