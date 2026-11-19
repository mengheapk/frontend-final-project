export const seedUsers = [
  { id: 'demo-boromey', name: 'Boromey Chan', email: 'boromey@aupp.edu.kh' },
  { id: 'demo-sievyiek', name: 'Sievyiek Chhea', email: 'sievyiek@aupp.edu.kh' },
]

export function createSeedEvents() {
  const now = new Date().toISOString()
  const base = { createdAt: now, rsvps: [], tasks: [] }

  return [
    {
      ...base,
      id: crypto.randomUUID(),
      ownerId: 'demo-boromey',
      title: 'Study group: Frontend final',
      description: 'Review React hooks and context before the final project deadline.',
      location: 'AUPP Library, Room 3',
      category: 'Study',
      date: '2026-11-23',
      startTime: '14:00',
      endTime: '16:00',
      rsvps: [
        { userId: 'demo-sievyiek', name: 'Sievyiek Chhea', status: 'going', respondedAt: now },
      ],
      tasks: [
        { id: crypto.randomUUID(), title: 'Book the room', assigneeId: 'demo-boromey', dueDate: '2026-11-19', done: true },
        { id: crypto.randomUUID(), title: 'Prepare practice questions', assigneeId: 'demo-sievyiek', dueDate: '2026-11-23', done: false },
      ],
    },
    {
      ...base,
      id: crypto.randomUUID(),
      ownerId: 'demo-sievyiek',
      title: 'Grammy Awards',
      description: 'The 69th Annual Grammy Awards.',
      location: 'Crypto.com Arena, Los Angeles',
      category: 'Social',
      date: '2027-02-07',
      startTime: '17:30',
      endTime: '19:00',
    },
    {
      ...base,
      id: crypto.randomUUID(),
      ownerId: 'demo-boromey',
      title: 'Christmas Dinner',
      description: 'Christmas dinner party at Boromey\'s house.',
      location: 'TK, Phnom Penh',
      category: 'Social',
      date: '2026-12-25',
      startTime: '18:30',
      endTime: '21:00',
    },
    {
      ...base,
      id: crypto.randomUUID(),
      ownerId: 'demo-sievyiek',
      title: 'Last-minute Meeting',
      description: 'Last-minute meeting to finalize group project.',
      location: 'AUPP (specifics TBC)',
      category: 'Study',
      date: '2026-11-24',
      startTime: '09:00',
      endTime: '11:00',
    },
    {
      ...base,
      id: crypto.randomUUID(),
      ownerId: 'demo-sievyiek',
      title: 'Midterm Celebration',
      description: 'Small get-together after midterms.',
      location: 'BKK1, Phnom Penh',
      category: 'Social',
      date: '2026-10-16',
      startTime: '18:00',
      endTime: '20:00',
    },
    {
      ...base,
      id: crypto.randomUUID(),
      ownerId: 'demo-boromey',
      title: 'Final Celebration',
      description: 'Small get-together after finals.',
      location: 'Riverside, Phnom Penh',
      category: 'Social',
      date: '2026-12-10',
      startTime: '19:00',
      endTime: '21:00',
    },
  ]
}