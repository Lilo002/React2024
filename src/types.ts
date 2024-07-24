import { Dispatch, SetStateAction } from 'react';

export type ResponseItem = {
  name: string;
  url: string;
};

export type Pokemon = {
  base_experience?: number;
  cries?: {
    latest: string;
    legacy: string;
  };
  forms?: Form[];
  game_indices?: Game[];
  height: number;
  held_items?: [];
  id: number;
  is_default?: boolean;
  location_area_encounters?: string;
  moves?: Move[];
  name: string;
  order?: number;
  past_abilities?: [];
  past_types?: [];
  species?: {
    name: string;
    url: string;
  };
  sprites: {
    back_default?: string | null;
    back_female?: string | null;
    back_shiny?: string | null;
    back_shiny_female?: string | null;
    front_default?: string | null;
    front_female?: string | null;
    front_shiny?: string | null;
    front_shiny_female?: string | null;
    other: {
      ['official-artwork']: {
        front_default: string;
      };
    };
    versions?: object;
  };
  stats?: Stat[];
  types: Type[];
  weight: number;
};

type Form = {
  name: string;
  url: string;
};

type Game = {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
};

type Move = {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type Type = {
  slot?: number;
  type: {
    name: string;
    url?: string;
  };
};

export type UseSearchQuery = [string, Dispatch<SetStateAction<string>>];
