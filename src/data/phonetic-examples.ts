export interface ExampleWord {
    word: string;
    ipa: string;
}

export const PHONETIC_EXAMPLES: Record<string, ExampleWord[]> = {
    // Vowels - High Vowels
    '/iː/': [
        { word: 'see', ipa: '/siː/' },
        { word: 'green', ipa: '/ɡriːn/' },
        { word: 'teacher', ipa: '/ˈtiːtʃə/' },
    ],
    '/ɪ/': [
        { word: 'sit', ipa: '/sɪt/' },
        { word: 'milk', ipa: '/mɪlk/' },
        { word: 'fish', ipa: '/fɪʃ/' },
    ],
    '/uː/': [
        { word: 'food', ipa: '/fuːd/' },
        { word: 'blue', ipa: '/bluː/' },
        { word: 'school', ipa: '/skuːl/' },
    ],
    '/ʊ/': [
        { word: 'book', ipa: '/bʊk/' },
        { word: 'good', ipa: '/ɡʊd/' },
        { word: 'put', ipa: '/pʊt/' },
    ],

    // Vowels - Mid Vowels
    '/e/': [
        { word: 'bed', ipa: '/bed/' },
        { word: 'pen', ipa: '/pen/' },
        { word: 'get', ipa: '/ɡet/' },
    ],
    '/ɜː/': [
        { word: 'bird', ipa: '/bɜːd/' },
        { word: 'girl', ipa: '/ɡɜːl/' },
        { word: 'work', ipa: '/wɜːk/' },
    ],
    '/ə/': [
        { word: 'about', ipa: '/əˈbaʊt/' },
        { word: 'ago', ipa: '/əˈɡəʊ/' },
        { word: 'teacher', ipa: '/ˈtiːtʃə/' },
    ],
    '/ʌ/': [
        { word: 'cup', ipa: '/kʌp/' },
        { word: 'luck', ipa: '/lʌk/' },
        { word: 'son', ipa: '/sʌn/' },
    ],
    '/ɔː/': [
        { word: 'door', ipa: '/dɔː/' },
        { word: 'talk', ipa: '/tɔːk/' },
        { word: 'short', ipa: '/ʃɔːt/' },
    ],

    // Vowels - Low Vowels
    '/æ/': [
        { word: 'cat', ipa: '/kæt/' },
        { word: 'black', ipa: '/blæk/' },
        { word: 'map', ipa: '/mæp/' },
    ],
    '/ɑː/': [
        { word: 'car', ipa: '/kɑː/' },
        { word: 'father', ipa: '/ˈfɑːðə/' },
        { word: 'start', ipa: '/stɑːt/' },
    ],
    '/ɒ/': [
        { word: 'dog', ipa: '/dɒɡ/' },
        { word: 'not', ipa: '/nɒt/' },
        { word: 'clock', ipa: '/klɒk/' },
    ],

    // Diphthongs
    '/eɪ/': [
        { word: 'day', ipa: '/deɪ/' },
        { word: 'name', ipa: '/neɪm/' },
        { word: 'face', ipa: '/feɪs/' },
    ],
    '/aɪ/': [
        { word: 'time', ipa: '/taɪm/' },
        { word: 'like', ipa: '/laɪk/' },
        { word: 'child', ipa: '/tʃaɪld/' },
    ],
    '/ɔɪ/': [
        { word: 'boy', ipa: '/bɔɪ/' },
        { word: 'choice', ipa: '/tʃɔɪs/' },
        { word: 'noise', ipa: '/nɔɪz/' },
    ],
    '/aʊ/': [
        { word: 'now', ipa: '/naʊ/' },
        { word: 'house', ipa: '/haʊs/' },
        { word: 'down', ipa: '/daʊn/' },
    ],
    '/əʊ/': [
        { word: 'go', ipa: '/ɡəʊ/' },
        { word: 'home', ipa: '/həʊm/' },
        { word: 'nose', ipa: '/nəʊz/' },
    ],
    '/ɪə/': [
        { word: 'here', ipa: '/hɪə/' },
        { word: 'ear', ipa: '/ɪə/' },
        { word: 'idea', ipa: '/aɪˈdɪə/' },
    ],
    '/eə/': [
        { word: 'hair', ipa: '/heə/' },
        { word: 'care', ipa: '/keə/' },
        { word: 'chair', ipa: '/tʃeə/' },
    ],
    '/ʊə/': [
        { word: 'pure', ipa: '/pjʊə/' },
        { word: 'sure', ipa: '/ʃʊə/' },
        { word: 'tourist', ipa: '/ˈtʊərɪst/' },
    ],

    // Consonants - Plosives
    '/p/': [
        { word: 'pen', ipa: '/pen/' },
        { word: 'apple', ipa: '/ˈæpəl/' },
        { word: 'map', ipa: '/mæp/' },
    ],
    '/b/': [
        { word: 'big', ipa: '/bɪɡ/' },
        { word: 'table', ipa: '/ˈteɪbəl/' },
        { word: 'number', ipa: '/ˈnʌmbə/' },
    ],
    '/t/': [
        { word: 'ten', ipa: '/ten/' },
        { word: 'water', ipa: '/ˈwɔːtə/' },
        { word: 'start', ipa: '/stɑːt/' },
    ],
    '/d/': [
        { word: 'dog', ipa: '/dɒɡ/' },
        { word: 'day', ipa: '/deɪ/' },
        { word: 'window', ipa: '/ˈwɪndəʊ/' },
    ],
    '/k/': [
        { word: 'cat', ipa: '/kæt/' },
        { word: 'back', ipa: '/bæk/' },
        { word: 'milk', ipa: '/mɪlk/' },
    ],
    '/g/': [
        { word: 'go', ipa: '/ɡəʊ/' },
        { word: 'game', ipa: '/ɡeɪm/' },
        { word: 'bag', ipa: '/bæɡ/' },
    ],

    // Consonants - Nasals
    '/m/': [
        { word: 'man', ipa: '/mæn/' },
        { word: 'time', ipa: '/taɪm/' },
        { word: 'summer', ipa: '/ˈsʌmə/' },
    ],
    '/n/': [
        { word: 'no', ipa: '/nəʊ/' },
        { word: 'ten', ipa: '/ten/' },
        { word: 'sunny', ipa: '/ˈsʌni/' },
    ],
    '/ŋ/': [
        { word: 'sing', ipa: '/sɪŋ/' },
        { word: 'long', ipa: '/lɒŋ/' },
        { word: 'finger', ipa: '/ˈfɪŋɡə/' },
    ],

    // Consonants - Fricatives
    '/f/': [
        { word: 'five', ipa: '/faɪv/' },
        { word: 'coffee', ipa: '/ˈkɒfi/' },
        { word: 'leaf', ipa: '/liːf/' },
    ],
    '/v/': [
        { word: 'very', ipa: '/ˈveri/' },
        { word: 'give', ipa: '/ɡɪv/' },
        { word: 'seven', ipa: '/ˈsevən/' },
    ],
    '/s/': [
        { word: 'see', ipa: '/siː/' },
        { word: 'bus', ipa: '/bʌs/' },
        { word: 'city', ipa: '/ˈsɪti/' },
    ],
    '/z/': [
        { word: 'zoo', ipa: '/zuː/' },
        { word: 'nose', ipa: '/nəʊz/' },
        { word: 'easy', ipa: '/ˈiːzi/' },
    ],
    '/θ/': [
        { word: 'think', ipa: '/θɪŋk/' },
        { word: 'three', ipa: '/θriː/' },
        { word: 'both', ipa: '/bəʊθ/' },
    ],
    '/ð/': [
        { word: 'this', ipa: '/ðɪs/' },
        { word: 'mother', ipa: '/ˈmʌðə/' },
        { word: 'they', ipa: '/ðeɪ/' },
    ],
    '/ʃ/': [
        { word: 'she', ipa: '/ʃiː/' },
        { word: 'shop', ipa: '/ʃɒp/' },
        { word: 'fish', ipa: '/fɪʃ/' },
    ],
    '/ʒ/': [
        { word: 'vision', ipa: '/ˈvɪʒən/' },
        { word: 'measure', ipa: '/ˈmeʒə/' },
        { word: 'television', ipa: '/ˈtelɪvɪʒən/' },
    ],
    '/h/': [
        { word: 'he', ipa: '/hiː/' },
        { word: 'home', ipa: '/həʊm/' },
        { word: 'help', ipa: '/help/' },
    ],

    // Consonants - Affricates
    '/tʃ/': [
        { word: 'chair', ipa: '/tʃeə/' },
        { word: 'teacher', ipa: '/ˈtiːtʃə/' },
        { word: 'watch', ipa: '/wɒtʃ/' },
    ],
    '/dʒ/': [
        { word: 'job', ipa: '/dʒɒb/' },
        { word: 'orange', ipa: '/ˈɒrɪndʒ/' },
        { word: 'bridge', ipa: '/brɪdʒ/' },
    ],

    // Consonants - Approximants
    '/w/': [
        { word: 'we', ipa: '/wiː/' },
        { word: 'window', ipa: '/ˈwɪndəʊ/' },
        { word: 'quick', ipa: '/kwɪk/' },
    ],
    '/r/': [
        { word: 'red', ipa: '/red/' },
        { word: 'river', ipa: '/ˈrɪvə/' },
        { word: 'right', ipa: '/raɪt/' },
    ],
    '/j/': [
        { word: 'yes', ipa: '/jes/' },
        { word: 'yellow', ipa: '/ˈjeləʊ/' },
        { word: 'you', ipa: '/juː/' },
    ],

    // Consonants - Lateral
    '/l/': [
        { word: 'let', ipa: '/let/' },
        { word: 'blue', ipa: '/bluː/' },
        { word: 'feel', ipa: '/fiːl/' },
    ],

    // Consonants - Clusters
    '/ts/': [
        { word: 'cats', ipa: '/kæts/' },
        { word: 'hats', ipa: '/hæts/' },
        { word: 'streets', ipa: '/striːts/' },
    ],
    '/dz/': [
        { word: 'kids', ipa: '/kɪdz/' },
        { word: 'hands', ipa: '/hændz/' },
        { word: 'reads', ipa: '/riːdz/' },
    ],
    '/tr/': [
        { word: 'tree', ipa: '/triː/' },
        { word: 'train', ipa: '/treɪn/' },
        { word: 'try', ipa: '/traɪ/' },
    ],
    '/dr/': [
        { word: 'dress', ipa: '/dres/' },
        { word: 'drive', ipa: '/draɪv/' },
        { word: 'dream', ipa: '/driːm/' },
    ],
};
