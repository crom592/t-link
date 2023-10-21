// src/app/create/page.tsx
"use client"; // 이 부분을 추가
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";
import { useRouter } from "next/navigation";
import { GoogleMap, useJsApiLoader,Marker } from '@react-google-maps/api';
import Select from "react-select"; // react-select 라이브러리
import {
  Country,
  Language,
  City,
  State,
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
  GetCountries,
  GetLanguages,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import Script from "next/script";
import Image from 'next/image';
type Task = {
  id: number;
  name: string;
  // other properties...
};
const useFetchTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("http://127.0.0.1:8000/api-task/", {
        headers: {
          accept: "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    };
    fetchTasks();
  }, []);

  return tasks;
};
export default function CreatePage() {
   // State to hold user's current location
  const [userLocation, setUserLocation] = useState({
    lat: -3.745, // default values
    lng: -38.523,
  });
  const center = userLocation; // Use the user's location as the center
  // State to manage marker rendering
  const [showMarker, setShowMarker] = useState(false);
  const containerStyle = {
    width: '100%',
    height: '400px'
  };
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);
  const [language, setLanguage] = useState(0);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [languageList, setLanguageList] = useState<Language[]>([]);
  // const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
  const router = useRouter();
  // Use the custom hook here
  const tasks = useFetchTasks();
  const [isGoogleLibReady, setGoogleLibReady] = useState(false);
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
  const [formData, setFormData] = useState({
    user :"1",
    type: "",
    title: "",
    location: "",
    start_date: new Date().toISOString().split("T")[0], // Today's date
    end_date: new Date().toISOString().split("T")[0], // Today's date
    language: "",
    description: "",
    image: "",
    latitude: "",
    longitude: "",
    zoom: "",
    country: "",
    tasks: [] as number[], // Assuming tasks are an array of integers
  });
  const mapRef = useRef(null); // 지도가 그려질 DOM 요소를 참조
  const initMap = () => {
    if (mapRef.current) {
      // Add this check
      const google = window.google;

      const sydney = new google.maps.LatLng(-33.867, 151.195);
      const infowindow = new google.maps.InfoWindow();
      const map = new google.maps.Map(mapRef.current, {
        center: sydney,
        zoom: 15,
      });

      const request = {
        query: "Museum of Contemporary Art Australia",
        fields: ["name", "geometry"],
      };

      const service = new google.maps.places.PlacesService(map);

      service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
          if (results[0].geometry && results[0].geometry.location) {
            map.setCenter(results[0].geometry.location);
          }
        }
      });

      const createMarker = (place: google.maps.places.PlaceResult) => {
        if (place.geometry?.location) {
          const marker = new google.maps.Marker({
            map,
            position: place.geometry.location,
          });
          google.maps.event.addListener(
            marker,
            "click",
            function (this: google.maps.Marker) {
              infowindow.setContent(place.name);
              infowindow.open(map, this);
            }
          );
        }
      };
    }
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || ''
  })
  
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map:any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map:any) {
    setMap(null)
  }, [])
  // Explicitly setting types for e
  const handleCountryChange = (e: any) => {
    const countryName = e?.name || '';
    const countryId = e?.id || 0;
    setFormData({
      ...formData,
      country: countryName,
    });
    setCountryid(countryId); // Don't forget to update countryid as well
  };
  

  const handleStateChange = (e: any) => {
    // Replace any with the correct type
    setStateid(e.id);
  };

  const handleLanguageChange = (e: any) => {
    console.log(e);
    const languageCode = e?.code || '';
    setFormData({
      ...formData,
      language: languageCode,  // 언어 코드 저장
    });
  };


  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    // Handle file upload and get image URL
    // For now, just setting the file name as the image URL
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file.name });
    }
  };

  const handleTaskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTasks = Array.from(e.target.selectedOptions, (option) =>
      Number(option.value)
    );
    setFormData({ ...formData, tasks: selectedTasks });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAsyncSubmit();
  };

  const handleAsyncSubmit = async () => {
    // Validation before sending formData to server
    if (!formData.country) {
          alert("Country is required.");
          return;
        }
    
    if (!formData.language) {
          alert("Language is required.");
          return;
        }
    if (!formData.latitude || !formData.longitude || !formData.zoom) {
      alert("Latitude, Longitude, and Zoom are required.");
      return;
    }
    if (!formData.user) {
      alert("User is required.");
      return;
    }
  
    console.log(JSON.stringify(formData));
    const res = await fetch("http://127.0.0.1:8000/api-job/posting/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        user_id: "1", // Replace this with the actual user ID
      }),
    });
  
    if (res.ok) {
      const data = await res.json();
      console.log("Data added:", data);
      router.push(`/detail/${data.id}`);
    } else {
      console.log("Error:", res.status);
    }
  };
  

  const taskOptions = tasks.map((task) => ({
    value: task.id,
    label: task.name,
  }));

  // 도시 선택 시 실행할 함수
  const handleCityChange = (e: any) => {
    console.log(e);
    const google = window.google;
    if (mapRef.current) {
      // Add this check
      const sydney = new google.maps.LatLng(-33.867, 151.195);
      const infowindow = new google.maps.InfoWindow();
      const cityName = e?.name || '';  // 가정: e.name에 도시 이름이 들어있다.

    
      // Places API를 사용한 도시 검색
      const request = {
        query: cityName,
        fields: ['name', 'geometry'],
      };
      const map = new google.maps.Map(mapRef.current, {
        center: sydney,
        zoom: 15,
      });
      const service = new google.maps.places.PlacesService(map); // map은 Google Maps 객체입니다.
    
      // service.findPlaceFromQuery(request, function(results, status) {
      //   if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      //     const coordinates = results[0]?.geometry?.location;
      //     if (coordinates) {
      //       const lat = coordinates.lat();
      //       const lng = coordinates.lng();
      //       // 좌표를 state나 form data에 저장
      //       setFormData({
      //         ...formData,
      //         latitude: lat,
      //         longitude: lng,
      //         // ... 기타 필드
      //       });
      //       // 지도 중심을 새로운 좌표로 이동
      //       setUserLocation({ lat, lng });
      //     }
      //   }
      // });
  }
}

  useEffect(() => {
    // Function to run when the Google Maps library is ready
    const onGoogleMapReady = () => {
      setGoogleLibReady(true);
    };
    // Try to get user's current location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setShowMarker(true);  // Show marker once the location is obtained
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }

  }, []);

  useEffect(() => {
    GetCountries().then((result) => {
      if (result.length > 0) {
        setCountryList(result as Country[]);
      }
    });
    GetLanguages().then((result) => {
      if (result.length > 0) {
        setLanguageList(result as Language[]);
      }
    });
  }, []);

  useEffect(() => {
    if (isGoogleLibReady) {
      // Google Maps 스크립트가 로드된 후 실행되는 코드
      initMap();
    }
  }, []);

  

  return (
    <main className="container mx-auto flex flex-col justify-center items-center min-h-screen p-8 bg-slate-300 w-full">
      <h1 className="text-3xl font-bold text-white mb-4 mt-8">Write Demand</h1>

      <form className="w-full md:w-3/4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded mb-4 w-full"
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
        >
          <option value="01">선교사 요청</option>
          <option value="02">단기 선교사 요청</option>
        </select>
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700 mb-2">START DATE</label>
            <DatePicker
              name="start_date"
              selected={new Date(formData.start_date)}
              onChange={(date: Date) => {
                setFormData({
                  ...formData,
                  start_date: format(date, "yyyy-MM-dd"),
                });
              }}
              dateFormat="yyyy-MM-dd"
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 mb-2">END DATE</label>
            <DatePicker
              name="end_date"
              selected={new Date(formData.end_date)}
              onChange={(date: Date) => {
                setFormData({
                  ...formData,
                  end_date: format(date, "yyyy-MM-dd"),
                });
              }}
              dateFormat="yyyy-MM-dd"
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
        <div className="col-lg-6 mx-auto">
          <h6 className="mt-3 mb-3">Country</h6>
          <CountrySelect
            containerClassName="form-group"
            inputClassName=""
            onChange={handleCountryChange}  // 이 부분을 수정
            onTextChange={(e: any) => {
              console.log(e);
            }}
            placeHolder="Select Country"
          />
          <h6 className="mt-3 mb-3">State</h6>
          <StateSelect
            countryid={countryid}
            containerClassName="form-group"
            inputClassName="form-control"
            onChange={(e: { id: React.SetStateAction<number> }) => {
              setStateid(e.id);
            }}
            onTextChange={(e: any) => {
              console.log(e);
            }}
            placeHolder="Select State"
          />
         <h6 className="mt-3 mb-3">City</h6>
          <CitySelect
            countryid={countryid}
            stateid={stateid}
            containerClassName="form-group"
            inputClassName="form-control"
            onChange={handleCityChange}
            onTextChange={(e: any) => {
              console.log(e);
            }}
            placeHolder="Select City"
          />
          <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 rounded mb-4 w-full"
          />
          <div style={{ width: "100%", height: "400px" }} className="flex justify-center items-center">
            {isLoaded ? (
              <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8} onLoad={onLoad} onUnmount={onUnmount}>
                {/* You can put markers, info windows, etc. as child components here */}
                {showMarker && <Marker position={userLocation} />}
              </GoogleMap>
            ) : (
              <p>Loading map...</p>
            )}
          </div>
          <h6 className="mt-3 mb-3">Language</h6>
          <LanguageSelect
            containerClassName="form-group"
            inputClassName="form-control"
            onChange={handleLanguageChange}
            onTextChange={(e: any) => {
              console.log(e);
            }}
            displayNative={false}
            placeHolder="Select Language"
          />
        </div>
        <Select
          instanceId="taskSelect"
          isMulti
          options={taskOptions}
          name="tasks"
          placeholder="tasks"
          onChange={(selected) =>
            setFormData({ ...formData, tasks: selected.map((s) => s.value) })
          }
        />
        <div>
          <h1>Image</h1>
        <input type="file" name="image" onChange={handleFileUpload} />
        </div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="DESCRIPTION."
          className="border p-2 rounded mb-4 w-full"
        ></textarea>
        {/* 이미지 URL과 지도 정보 등도 추가할 수 있습니다. */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full mt-4"
        >
          submit
        </button>
      </form>
    </main>
  );
}
