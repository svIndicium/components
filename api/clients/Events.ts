import { EndGateway } from "../../api/request/EndGateway"
import { Event } from "../../api/models/event"

export class EventClient {
  static readonly NAME = "eventClient"

  private readonly eventsRootUrl!: string

  constructor(private readonly gateway: EndGateway) {
	if (process.server) {
	  return
	}

	this.eventsRootUrl = global.apiConfig?.eventsRootUrl!
  }

  async getAllEvents(): Promise<Array<Event>> {
	return await this.gateway.getJson(`${ this.eventsRootUrl }`)
  }

  async createEvent(event: Event): Promise<Event> {
	return await this.gateway.postJson(`${ this.eventsRootUrl }`, event)
  }
}
