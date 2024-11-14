"use client";
import React, { useState, ChangeEvent, useEffect, useCallback } from "react";
import L from 'leaflet';
import { useRouter } from 'next/navigation';
import {
  Country,
  State,
  City,
  Language,
  GetCountries,
  GetState,
  GetCity,
  GetLanguages,
} from "react-country-state-city";
import dynamic from 'next/dynamic';

// Custom types
interface Task {
  id: number;
  name: string;
}

interface LanguageOption {
  id: number;
  name: string;
}

// Dynamically import the Map component with no SSR
const MapComponent = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100" />
});

function useFetchTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return tasks;
}

export default function CreatePageComponent() {
  const [center, setCenter] = useState<[number, number]>([37.5665, 126.9780]);
  const [markerPosition, setMarkerPosition] = useState<L.LatLng | null>(null);
  const [zoom, setZoom] = useState(13);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);
  const [language, setLanguage] = useState(0);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState<State[]>([]);
  const [cityList, setCityList] = useState<City[]>([]);
  const [languageList, setLanguageList] = useState<LanguageOption[]>([]);
  const router = useRouter();
  const tasks = useFetchTasks();
  
  const [formData, setFormData] = useState({
    user: "1",
    type: "",
    title: "",
    location: "",
    start_date: new Date().toISOString().split("T")[0], 
    end_date: new Date().toISOString().split("T")[0], 
    language: "",
    description: "",
    image: "",
    latitude: "",
    longitude: "",
    zoom: "",
    country: "",
    state: "",
    city: "",
    tasks: [] as number[], 
  });

  const handleCountryChange = (e: any) => {
    const countryName = e?.name || '';
    const countryId = e?.id || 0;
    setCountryid(countryId);
    setFormData(prev => ({
      ...prev,
      country: countryName
    }));

    if (countryId) {
      GetState(countryId).then((result) => {
        if (result.length > 0) {
          setStateList(result as State[]);
        }
      });
    }
  };

  const handleStateChange = (e: any) => {
    const stateName = e?.name || '';
    const stateId = e?.id || 0;
    setStateid(stateId);
    setFormData(prev => ({
      ...prev,
      state: stateName
    }));

    if (stateId) {
      GetCity(countryid, stateId).then((result) => {
        if (result.length > 0) {
          setCityList(result as City[]);
        }
      });
    }
  };

  const handleCityChange = async (e: any) => {
    const cityName = e?.name || '';
    const cityId = e?.id || 0;
    setCityid(cityId);
    setFormData(prev => ({
      ...prev,
      city: cityName
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      router.push('/main');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  useEffect(() => {
    const initializeCountryStateCity = async () => {
      try {
        const countries = await GetCountries();
        setCountryList(countries);
        const languages = await GetLanguages();
        const languageOptions = (languages as string[]).map((lang, index) => ({
          id: index,
          name: lang
        }));
        setLanguageList(languageOptions);
      } catch (error) {
        console.error('Error initializing country-state-city:', error);
      }
    };
    
    initializeCountryStateCity();
  }, []);

  const handleLocationFound = useCallback((latlng: L.LatLng) => {
    setMarkerPosition(latlng);
    setCenter([latlng.lat, latlng.lng]);
    setFormData(prev => ({
      ...prev,
      latitude: latlng.lat.toString(),
      longitude: latlng.lng.toString(),
      zoom: zoom.toString()
    }));
  }, [zoom]);

  const handleLocationError = useCallback((error: L.ErrorEvent) => {
    setLocationError(error.message);
    console.error('Error getting location:', error);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Create New Task</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-6">
          {/* Map Section */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Location
            </label>
            <MapComponent
              center={center}
              zoom={zoom}
              markerPosition={markerPosition}
              onLocationFound={(location) => {
                setMarkerPosition(location);
                setCenter([location.lat, location.lng]);
                setFormData(prev => ({
                  ...prev,
                  latitude: location.lat.toString(),
                  longitude: location.lng.toString(),
                  zoom: zoom.toString()
                }));
              }}
              onLocationError={(error) => {
                setLocationError(error.message);
              }}
            />
            {locationError && (
              <p className="mt-2 text-sm text-red-600">{locationError}</p>
            )}
          </div>

          {/* Rest of the form */}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a type</option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
                <option value="type3">Type 3</option>
              </select>
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={(e) => {
                  const selectedCountry = countryList.find(country => country.name === e.target.value);
                  if (selectedCountry) {
                    handleCountryChange(selectedCountry);
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a country</option>
                {countryList.map((country) => (
                  <option key={country.id} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={(e) => {
                  const selectedState = stateList.find(state => state.name === e.target.value);
                  if (selectedState) {
                    handleStateChange(selectedState);
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a state</option>
                {stateList.map((state) => (
                  <option key={state.id} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={(e) => {
                  const selectedCity = cityList.find(city => city.name === e.target.value);
                  if (selectedCity) {
                    handleCityChange(selectedCity);
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a city</option>
                {cityList.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a language</option>
                {languageList.map((lang) => (
                  <option key={lang.id} value={lang.name}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="tasks" className="block text-sm font-medium text-gray-700">
                Tasks
              </label>
              <select
                multiple
                name="tasks"
                value={formData.tasks.map(String)}
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
                  setFormData(prev => ({
                    ...prev,
                    tasks: selectedOptions
                  }));
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
