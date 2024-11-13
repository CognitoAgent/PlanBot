'use client'

import { useState } from 'react'
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import { format } from 'date-fns'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Mock data for events
const events = [
  {
    id: 1,
    title: "Team Dinner",
    date: new Date(2024, 10, 15, 19, 0),
    location: "123 Main St, Anytown, USA",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    organizer: "John Doe",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "Project Kickoff Meeting",
    date: new Date(2024, 10, 20, 10, 0),
    location: "456 Business Ave, Metropolis, USA",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    organizer: "Jane Smith",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "Birthday Celebration",
    date: new Date(2024, 11, 5, 15, 0),
    location: "789 Party Blvd, Funtown, USA",
    coordinates: { lat: 41.8781, lng: -87.6298 },
    organizer: "Mike Johnson",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
  },
]

type EventResponse = 'pending' | 'attending' | 'declined' | 'reschedule'

export function Page() {
  const [responses, setResponses] = useState<{ [key: number]: EventResponse }>({})
  const [rescheduleEvent, setRescheduleEvent] = useState<typeof events[0] | null>(null)
  const [newDate, setNewDate] = useState<Date | undefined>(undefined)
  const [newTime, setNewTime] = useState<string | undefined>(undefined)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  })

  const handleResponse = (eventId: number, response: EventResponse) => {
    setResponses(prev => ({ ...prev, [eventId]: response }))
  }

  const handleReschedule = (event: typeof events[0]) => {
    setRescheduleEvent(event)
    setNewDate(event.date)
    setNewTime(format(event.date, 'HH:mm'))
  }

  const submitReschedule = () => {
    if (rescheduleEvent && newDate && newTime) {
      // Here you would typically make an API call to update the event
      console.log(`Rescheduling event ${rescheduleEvent.id} to ${format(newDate, 'yyyy-MM-dd')} at ${newTime}`)
      setRescheduleEvent(null)
      setNewDate(undefined)
      setNewTime(undefined)
    }
  }

  const renderMap = (coordinates: { lat: number; lng: number }) => {
    if (!isLoaded) return <div>Loading map...</div>
    return (
      <GoogleMap
        zoom={14}
        center={coordinates}
        mapContainerClassName="w-full h-[150px] rounded-md"
      >
        <Marker position={coordinates} />
      </GoogleMap>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <Card key={event.id} className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{event.title}</CardTitle>
                <Avatar>
                  <AvatarImage src={event.organizerAvatar} alt={event.organizer} />
                  <AvatarFallback>{event.organizer[0]}</AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{format(event.date, 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{format(event.date, 'h:mm a')}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
              {renderMap(event.coordinates)}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant={responses[event.id] === 'attending' ? 'default' : 'outline'}
                onClick={() => handleResponse(event.id, 'attending')}
              >
                Attend
              </Button>
              <Button
                variant={responses[event.id] === 'declined' ? 'default' : 'outline'}
                onClick={() => handleResponse(event.id, 'declined')}
              >
                Decline
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant={responses[event.id] === 'reschedule' ? 'default' : 'outline'}
                    onClick={() => handleReschedule(event)}
                  >
                    Reschedule
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Reschedule Event</DialogTitle>
                    <DialogDescription>
                      Choose a new date and time for "{event.title}"
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Date
                      </Label>
                      <div className="col-span-3">
                        <CalendarComponent
                          mode="single"
                          selected={newDate}
                          onSelect={setNewDate}
                          className="rounded-md border"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Time
                      </Label>
                      <Select onValueChange={setNewTime} defaultValue={newTime}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                            <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                              {format(new Date().setHours(hour, 0), 'h:mm a')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={submitReschedule}>Submit Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}