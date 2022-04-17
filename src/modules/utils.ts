export const $copy = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
  } else {
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.style.position = 'fixed'
    textarea.style.clip = 'rect(0 0 0 0)'
    textarea.style.top = '10px'
    textarea.value = text
    textarea.select()
    document.execCommand('copy', true)
    document.body.removeChild(textarea)
  }
}

export const $address = (address: string) => {
  if (!address) {
    return ''
  }
  const prefix = address.slice(0, 6)
  const suffix = address.slice(-4)
  return prefix + '...' + suffix
}

export const $regex = {
  username(account: string) {
    return /^[a-z0-9_]{3,16}$/.test(account)
  },
  email(account: string) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      account,
    )
  },
  type(account: string) {
    if (this.username(account)) {
      return 'username'
    } else if (this.email(account)) {
      return 'email'
    } else {
      return ''
    }
  },
}
