// Mock database for gamers
let gamersDB = [
  {
    id: 1,
    name: 'Alex Johnson',
    username: 'alex_gamer',
    level: 45,
    points: 15000,
    badges: ['Pro Player', 'Tournament Winner'],
    games: ['CS:GO', 'Valorant', 'League of Legends'],
    joinedDate: '2022-01-15',
    avatar: '👤'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    username: 'sarah_pro',
    level: 52,
    points: 25000,
    badges: ['Streamer', 'Champion'],
    games: ['Valorant', 'Fortnite', 'Apex Legends'],
    joinedDate: '2021-06-20',
    avatar: '👩'
  },
  {
    id: 3,
    name: 'Mike Rodriguez',
    username: 'mike_casual',
    level: 28,
    points: 8500,
    badges: ['Active Player'],
    games: ['Minecraft', 'Among Us'],
    joinedDate: '2023-03-10',
    avatar: '👨'
  }
];

let nextId = 4;

export default function handler(req, res) {
  const { method, query, body } = req;

  // GET all gamers or GET by ID
  if (method === 'GET') {
    if (query.id) {
      const gamer = gamersDB.find(g => g.id === parseInt(query.id));
      if (!gamer) {
        return res.status(404).json({ success: false, message: 'Gamer not found' });
      }
      return res.status(200).json({ success: true, data: gamer });
    }

    // Filter by level or points
    let filtered = gamersDB;
    if (query.minLevel) {
      filtered = filtered.filter(g => g.level >= parseInt(query.minLevel));
    }
    if (query.sortBy === 'points') {
      filtered.sort((a, b) => b.points - a.points);
    } else if (query.sortBy === 'level') {
      filtered.sort((a, b) => b.level - a.level);
    }

    return res.status(200).json({ success: true, data: filtered, total: filtered.length });
  }

  // POST - Create new gamer
  if (method === 'POST') {
    const { name, username, games } = body;

    if (!name || !username) {
      return res.status(400).json({ success: false, message: 'Name and username required' });
    }

    const newGamer = {
      id: nextId++,
      name,
      username,
      level: 1,
      points: 0,
      badges: [],
      games: games || [],
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: '👤'
    };

    gamersDB.push(newGamer);
    res.status(201).json({ success: true, message: 'Gamer created successfully', data: newGamer });
  }

  // PUT - Update gamer
  if (method === 'PUT') {
    const { id } = query;
    const gamer = gamersDB.find(g => g.id === parseInt(id));

    if (!gamer) {
      return res.status(404).json({ success: false, message: 'Gamer not found' });
    }

    // Update fields
    if (body.name) gamer.name = body.name;
    if (body.level) gamer.level = body.level;
    if (body.points) gamer.points = body.points;
    if (body.badges) gamer.badges = body.badges;
    if (body.games) gamer.games = body.games;

    res.status(200).json({ success: true, message: 'Gamer updated successfully', data: gamer });
  }

  // DELETE - Remove gamer
  if (method === 'DELETE') {
    const { id } = query;
    const index = gamersDB.findIndex(g => g.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Gamer not found' });
    }

    gamersDB.splice(index, 1);
    res.status(200).json({ success: true, message: 'Gamer deleted successfully' });
  }

  res.status(405).json({ success: false, message: 'Method not allowed' });
}
