declare module 'react-country-state-city' {
export interface Country {
    id: number;
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phone_code: number;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    native: string;
    region: string;
    subregion: string;
    emoji: string;
    emojiU: string;
    tld: string;
    latitude: string;
    longitude: string;
  }
  export interface State {
    id: number;
    name: string;
    state_code: string;
    latitude: string;
    longitude: string;
  }
  export interface Language {
    code: string;
    name: string;
    native: string;
  }
  export interface CountryState {
    id: number;
    states: [State];
  }
  export interface City {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
  }
  export interface CountryStateCity {
    id: number;
    states: [
      {
        id: number;
        cities: [City];
      }
    ];
  }

//   type PageProps = {
//     containerClassName?: string;
//     inputClassName?: string;
//     onChange?: (e: City) => void;
//     onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
//     defaultValue?: City;
//     countryid: number;
//     stateid: number;
//     placeHolder?: string;
//   };
  
  export function CitySelect(props: PageProps): JSX.Element;
  export function CountrySelect(props: PageProps): JSX.Element;
  export function StateSelect(props: PageProps): JSX.Element;
  export function LanguageSelect(props: PageProps): JSX.Element;
  export function GetCountries(): Promise<Country[] | []>;
  export function GetLanguages(): Promise<Language[] | []>;
  export function GetState(id: number): Promise<State[] | []>;
  export function GetCity(countryid: number, stateid: number): Promise<City[] | []>;
}
