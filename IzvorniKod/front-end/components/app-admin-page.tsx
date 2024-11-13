'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

type Event = {
  id: number
  title: string
  date: Date
  location: string
  description: string
  isOpenToAll: boolean
  invitedUsers: string[]
  attendees: number
  declines: number
  rescheduleRequests: number
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Team Building Workshop",
    date: new Date(2024, 11, 15),
    location: "Conference Center, 123 Main St",
    description: "Annual team building event with various activities and discussions.",
    isOpenToAll: false,
    invitedUsers: ["user1@example.com", "user2@example.com", "user3@example.com"],
    attendees: 15,
    declines: 3,
    rescheduleRequests: 2
  },
  {
    id: 2,
    title: "Product Launch Party",
    date: new Date(2024, 11, 20),
    location: "Rooftop Lounge, 456 High St",
    description: "Celebrating the launch of our new product line with demos and networking.",
    isOpenToAll: true,
    invitedUsers: [],
    attendees: 50,
    declines: 10,
    rescheduleRequests: 5
  }
]

export function Page() {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const { register, handleSubmit, control, reset } = useForm<Event>()

  const onSubmit = (data: Event) => {
    const newEvent = {
      ...data,
      id: events.length + 1,
      attendees: 0,
      declines: 0,
      rescheduleRequests: 0
    }
    setEvents([...events, newEvent])
    reset()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input id="title" {...register('title', { required: true })} />
            </div>
            
            <div>
              <Label htmlFor="date">Date</Label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register('location', { required: true })} />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register('description')} />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="isOpenToAll" {...register('isOpenToAll')} />
              <Label htmlFor="isOpenToAll">Open to all users</Label>
            </div>
            
            <div>
              <Label htmlFor="invitedUsers">Invited Users (comma-separated emails)</Label>
              <Input id="invitedUsers" {...register('invitedUsers')} />
            </div>
            
            <Button type="submit">Create Event</Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Existing Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Open to All</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Declines</TableHead>
                <TableHead>Reschedule Requests</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{format(event.date, 'PP')}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.isOpenToAll ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{event.attendees}</TableCell>
                  <TableCell>{event.declines}</TableCell>
                  <TableCell>{event.rescheduleRequests}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}