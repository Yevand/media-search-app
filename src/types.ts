export interface Item {
  id: string;
  name: string;
  title: string;
}

export interface Action {
  id: string;
  type: string;
  item?: Item;
}

export interface Result {
  'id': string;
  'title': string;
  'artist-credit': [
    {
      artist: {
        name: string;
      };
    },
  ];
}

export interface MusicSearchResponse {
  recordings: Result[];
}
