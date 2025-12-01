// GET vocabulary words or POST new vocabulary
export default function handler(req, res) {
  if (req.method === 'GET') {
    const { level, category } = req.query;

    const vocabulary = [
      {
        id: 1,
        word: 'Hello',
        pronunciation: 'hə-ˈlō',
        translation: 'مرحبا',
        level: 'A1',
        category: 'Greetings',
        exampleSentence: 'Hello, how are you?',
      },
      {
        id: 2,
        word: 'Good morning',
        pronunciation: 'ˌɡu̇d-ˈmȯr-niŋ',
        translation: 'صباح الخير',
        level: 'A1',
        category: 'Greetings',
        exampleSentence: 'Good morning! Did you sleep well?',
      },
      {
        id: 3,
        word: 'Thank you',
        pronunciation: 'ˈθaŋk ˌyu̇',
        translation: 'شكرا لك',
        level: 'A1',
        category: 'Polite expressions',
        exampleSentence: 'Thank you for your help!',
      },
      {
        id: 4,
        word: 'Conversation',
        pronunciation: 'ˌkän-vər-ˈsā-shən',
        translation: 'محادثة',
        level: 'B1',
        category: 'Communication',
        exampleSentence: 'We had a long conversation about the project.',
      },
    ];

    let filtered = vocabulary;

    if (level) {
      filtered = filtered.filter((v) => v.level === level);
    }

    if (category) {
      filtered = filtered.filter((v) => v.category === category);
    }

    res.status(200).json({ success: true, data: filtered });
  } else if (req.method === 'POST') {
    const { word, pronunciation, translation, level, category, exampleSentence } =
      req.body;

    if (!word || !level || !category) {
      return res
        .status(400)
        .json({ success: false, error: 'Missing required fields' });
    }

    const newVocabulary = {
      id: Math.random(),
      word,
      pronunciation: pronunciation || '',
      translation: translation || '',
      level,
      category,
      exampleSentence: exampleSentence || '',
    };

    res.status(201).json({ success: true, data: newVocabulary });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
