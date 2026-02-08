export interface Item {
  id: string;
  artist: string;
  song: string;
}

export interface Action {
  id: string;
  type: string;
  item?: Item;
}

// @TODO remove unused properties
export interface Result {
  'id': string;
  'score': number;
  'artist-credit-id': string;
  'title': string;
  'length': number;
  'video': null;
  'artist-credit': [
    {
      name: string;
      artist: {
        'id': string;
        'name': string;
        'sort-name': string;
      };
    },
  ];
  'releases': [
    {
      'id': string;
      'count': number;
      'title': string;
      'release-group': {
        id: string;
        title: string;
      };
      'track-count': number;
      'media': [
        {
          'id': string;
          'position': number;
          'track': [
            {
              id: string;
              number: '14';
              title: string;
              length: number;
            },
          ];
          'track-count': number;
          'track-offset': number;
        },
      ];
    },
  ];
}

export interface MusicSearchResponse {
  recordings: Result[];
}
