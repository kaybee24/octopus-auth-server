import Event from '../models/Event.mjs'

async function getAllEvents (request, response) {
  try {
    if (request.token?.id) {
      const events = await Event.find()
      response.json({
        message: 'got all your events',
        data: events,
        success: true
      })
    } else {
      response.status(401).send({
        message: 'You must be logged in to see events',
        success: false,
        data: null
      })
    }
  } catch (error) {
    response.status(400).send({
      message: error.message,
      success: false,
      data: error
    })
  }
}

async function createEvent (request, response) {
  const eventmsg = {
    from: request.token.id,
    to: request.body.to,
    title: request.body.title,
    message: request.body.message,
    city: request.body.city,
    location: request.body.location,
    eventDateTime: request.body.eventDateTime,
    user: request.token.id
  }
  try {
    const res = await Event.create(eventmsg)
    response.send({ success: true, newEvent: res })
  } catch (error) {
    // TODO check kind of error

    response.status(400).send({
      success: false, error: error.message
    })
  }
}

async function getEvent (request, response) {
  const event = await Event.find({ _id: request.params.id })
  response.json(event)
}

const EventController = {
  getAllEvents,
  createEvent,
  getEvent
}

export default EventController
