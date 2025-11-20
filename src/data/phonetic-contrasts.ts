export interface ContrastPair {
    otherSymbol: string;
    word1: string; // Word with the current symbol
    word2: string; // Word with the other symbol
    ipa1: string;
    ipa2: string;
}

export const PHONETIC_CONTRASTS: Record<string, ContrastPair[]> = {
    // Vowels
    '/iː/': [
        { otherSymbol: '/ɪ/', word1: 'eat', word2: 'it', ipa1: '/iːt/', ipa2: '/ɪt/' },
        { otherSymbol: '/ɪ/', word1: 'sheep', word2: 'ship', ipa1: '/ʃiːp/', ipa2: '/ʃɪp/' },
    ],
    '/ɪ/': [
        { otherSymbol: '/iː/', word1: 'it', word2: 'eat', ipa1: '/ɪt/', ipa2: '/iːt/' },
        { otherSymbol: '/e/', word1: 'bit', word2: 'bet', ipa1: '/bɪt/', ipa2: '/bet/' },
    ],
    '/e/': [
        { otherSymbol: '/ɪ/', word1: 'bet', word2: 'bit', ipa1: '/bet/', ipa2: '/bɪt/' },
        { otherSymbol: '/æ/', word1: 'bed', word2: 'bad', ipa1: '/bed/', ipa2: '/bæd/' },
        { otherSymbol: '/eɪ/', word1: 'wet', word2: 'wait', ipa1: '/wet/', ipa2: '/weɪt/' },
    ],
    '/æ/': [
        { otherSymbol: '/e/', word1: 'bad', word2: 'bed', ipa1: '/bæd/', ipa2: '/bed/' },
        { otherSymbol: '/ʌ/', word1: 'cat', word2: 'cut', ipa1: '/kæt/', ipa2: '/kʌt/' },
        { otherSymbol: '/ɑː/', word1: 'had', word2: 'hard', ipa1: '/hæd/', ipa2: '/hɑːd/' },
    ],
    '/ʌ/': [
        { otherSymbol: '/æ/', word1: 'cut', word2: 'cat', ipa1: '/kʌt/', ipa2: '/kæt/' },
        { otherSymbol: '/ɑː/', word1: 'cup', word2: 'carp', ipa1: '/kʌp/', ipa2: '/kɑːp/' },
    ],
    '/ɑː/': [
        { otherSymbol: '/ʌ/', word1: 'carp', word2: 'cup', ipa1: '/kɑːp/', ipa2: '/kʌp/' },
        { otherSymbol: '/æ/', word1: 'hard', word2: 'had', ipa1: '/hɑːd/', ipa2: '/hæd/' },
        { otherSymbol: '/ɜː/', word1: 'far', word2: 'fur', ipa1: '/fɑː/', ipa2: '/fɜː/' },
    ],
    '/ɒ/': [
        { otherSymbol: '/ɔː/', word1: 'spot', word2: 'sport', ipa1: '/spɒt/', ipa2: '/spɔːt/' },
    ],
    '/ɔː/': [
        { otherSymbol: '/ɒ/', word1: 'sport', word2: 'spot', ipa1: '/spɔːt/', ipa2: '/spɒt/' },
    ],
    '/uː/': [
        { otherSymbol: '/ʊ/', word1: 'pool', word2: 'pull', ipa1: '/puːl/', ipa2: '/pʊl/' },
    ],
    '/ʊ/': [
        { otherSymbol: '/uː/', word1: 'pull', word2: 'pool', ipa1: '/pʊl/', ipa2: '/puːl/' },
    ],
    '/ɜː/': [
        { otherSymbol: '/ɑː/', word1: 'fur', word2: 'far', ipa1: '/fɜː/', ipa2: '/fɑː/' },
    ],

    // Diphthongs
    '/eɪ/': [
        { otherSymbol: '/e/', word1: 'wait', word2: 'wet', ipa1: '/weɪt/', ipa2: '/wet/' },
    ],
    '/aɪ/': [],
    '/ɔɪ/': [],
    '/aʊ/': [
        { otherSymbol: '/əʊ/', word1: 'now', word2: 'know', ipa1: '/naʊ/', ipa2: '/nəʊ/' },
    ],
    '/əʊ/': [
        { otherSymbol: '/aʊ/', word1: 'know', word2: 'now', ipa1: '/nəʊ/', ipa2: '/naʊ/' },
    ],

    // Consonants
    '/p/': [
        { otherSymbol: '/b/', word1: 'pig', word2: 'big', ipa1: '/pɪɡ/', ipa2: '/bɪɡ/' },
        { otherSymbol: '/f/', word1: 'pan', word2: 'fan', ipa1: '/pæn/', ipa2: '/fæn/' },
    ],
    '/b/': [
        { otherSymbol: '/p/', word1: 'big', word2: 'pig', ipa1: '/bɪɡ/', ipa2: '/pɪɡ/' },
        { otherSymbol: '/v/', word1: 'ban', word2: 'van', ipa1: '/bæn/', ipa2: '/væn/' },
    ],
    '/t/': [
        { otherSymbol: '/d/', word1: 'tie', word2: 'die', ipa1: '/taɪ/', ipa2: '/daɪ/' },
        { otherSymbol: '/θ/', word1: 'tank', word2: 'thank', ipa1: '/tæŋk/', ipa2: '/θæŋk/' },
    ],
    '/d/': [
        { otherSymbol: '/t/', word1: 'die', word2: 'tie', ipa1: '/daɪ/', ipa2: '/taɪ/' },
        { otherSymbol: '/ð/', word1: 'day', word2: 'they', ipa1: '/deɪ/', ipa2: '/ðeɪ/' },
    ],
    '/k/': [
        { otherSymbol: '/g/', word1: 'cold', word2: 'gold', ipa1: '/kəʊld/', ipa2: '/ɡəʊld/' },
    ],
    '/g/': [
        { otherSymbol: '/k/', word1: 'gold', word2: 'cold', ipa1: '/ɡəʊld/', ipa2: '/kəʊld/' },
    ],
    '/f/': [
        { otherSymbol: '/v/', word1: 'fan', word2: 'van', ipa1: '/fæn/', ipa2: '/væn/' },
        { otherSymbol: '/θ/', word1: 'fin', word2: 'thin', ipa1: '/fɪn/', ipa2: '/θɪn/' },
    ],
    '/v/': [
        { otherSymbol: '/f/', word1: 'van', word2: 'fan', ipa1: '/væn/', ipa2: '/fæn/' },
        { otherSymbol: '/w/', word1: 'vet', word2: 'wet', ipa1: '/vet/', ipa2: '/wet/' },
    ],
    '/s/': [
        { otherSymbol: '/z/', word1: 'bus', word2: 'buzz', ipa1: '/bʌs/', ipa2: '/bʌz/' },
        { otherSymbol: '/ʃ/', word1: 'so', word2: 'show', ipa1: '/səʊ/', ipa2: '/ʃəʊ/' },
        { otherSymbol: '/θ/', word1: 'sing', word2: 'thing', ipa1: '/sɪŋ/', ipa2: '/θɪŋ/' },
    ],
    '/z/': [
        { otherSymbol: '/s/', word1: 'buzz', word2: 'bus', ipa1: '/bʌz/', ipa2: '/bʌs/' },
        { otherSymbol: '/ð/', word1: 'close', word2: 'clothe', ipa1: '/kləʊz/', ipa2: '/kləʊð/' },
    ],
    '/ʃ/': [
        { otherSymbol: '/s/', word1: 'show', word2: 'so', ipa1: '/ʃəʊ/', ipa2: '/səʊ/' },
        { otherSymbol: '/tʃ/', word1: 'sheep', word2: 'cheap', ipa1: '/ʃiːp/', ipa2: '/tʃiːp/' },
    ],
    '/ʒ/': [],
    '/tʃ/': [
        { otherSymbol: '/ʃ/', word1: 'cheap', word2: 'sheep', ipa1: '/tʃiːp/', ipa2: '/ʃiːp/' },
        { otherSymbol: '/dʒ/', word1: 'cheese', word2: 'jeez', ipa1: '/tʃiːz/', ipa2: '/dʒiːz/' },
    ],
    '/dʒ/': [
        { otherSymbol: '/tʃ/', word1: 'jeez', word2: 'cheese', ipa1: '/dʒiːz/', ipa2: '/tʃiːz/' },
        { otherSymbol: '/j/', word1: 'jam', word2: 'yam', ipa1: '/dʒæm/', ipa2: '/jæm/' },
    ],
    '/θ/': [
        { otherSymbol: '/s/', word1: 'thing', word2: 'sing', ipa1: '/θɪŋ/', ipa2: '/sɪŋ/' },
        { otherSymbol: '/f/', word1: 'thin', word2: 'fin', ipa1: '/θɪn/', ipa2: '/fɪn/' },
        { otherSymbol: '/t/', word1: 'thank', word2: 'tank', ipa1: '/θæŋk/', ipa2: '/tæŋk/' },
    ],
    '/ð/': [
        { otherSymbol: '/d/', word1: 'they', word2: 'day', ipa1: '/ðeɪ/', ipa2: '/deɪ/' },
        { otherSymbol: '/z/', word1: 'clothe', word2: 'close', ipa1: '/kləʊð/', ipa2: '/kləʊz/' },
    ],
    '/m/': [
        { otherSymbol: '/n/', word1: 'mine', word2: 'nine', ipa1: '/maɪn/', ipa2: '/naɪn/' },
    ],
    '/n/': [
        { otherSymbol: '/m/', word1: 'nine', word2: 'mine', ipa1: '/naɪn/', ipa2: '/maɪn/' },
        { otherSymbol: '/ŋ/', word1: 'sin', word2: 'sing', ipa1: '/sɪn/', ipa2: '/sɪŋ/' },
    ],
    '/ŋ/': [
        { otherSymbol: '/n/', word1: 'sing', word2: 'sin', ipa1: '/sɪŋ/', ipa2: '/sɪn/' },
    ],
    '/l/': [
        { otherSymbol: '/r/', word1: 'law', word2: 'raw', ipa1: '/lɔː/', ipa2: '/rɔː/' },
    ],
    '/r/': [
        { otherSymbol: '/l/', word1: 'raw', word2: 'law', ipa1: '/rɔː/', ipa2: '/lɔː/' },
        { otherSymbol: '/w/', word1: 'rare', word2: 'where', ipa1: '/reə/', ipa2: '/weə/' },
    ],
    '/w/': [
        { otherSymbol: '/v/', word1: 'wet', word2: 'vet', ipa1: '/wet/', ipa2: '/vet/' },
    ],
    '/j/': [
        { otherSymbol: '/dʒ/', word1: 'yam', word2: 'jam', ipa1: '/jæm/', ipa2: '/dʒæm/' },
    ],
    '/h/': [
        { otherSymbol: '/f/', word1: 'hat', word2: 'fat', ipa1: '/hæt/', ipa2: '/fæt/' },
    ],
};
