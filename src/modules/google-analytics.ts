import { useGtag } from 'vue-gtag-next'
const { event } = useGtag()

const $ga = (eventName: string, value?: string) => {
  event(eventName, {
    value: value || '',
  })
}
export default $ga
