// src/app/create/page.tsx
"use client"; // 이 부분을 추가
import React, { useState, ChangeEvent, useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
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
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
type Task = {
  id: number;
  name: string;
  // other properties...
};
const useFetchTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  process.env.NEXT_PUBLIC_API_URL
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(apiUrl+"/api-task/", {
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
const icon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// 지도 이벤트를 처리하는 컴포넌트
function MapEvents({ onLocationFound, onLocationError }: { 
  onLocationFound: (location: L.LatLng) => void;
  onLocationError: (error: L.ErrorEvent) => void;
}) {
  const map = useMapEvents({
    locationfound(e) {
      onLocationFound(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    locationerror(e) {
      onLocationError(e);
    },
    click(e) {
      onLocationFound(e.latlng);
    }
  });
  return null;
}

// 지도 중심을 변경하는 컴포넌트
function ChangeView({ center, zoom }: { center: L.LatLngExpression; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function CreatePage() {
   // State to hold user's current location
  const [center, setCenter] = useState<L.LatLngExpression>([37.5665, 126.9780]); // 서울
  const [zoom, setZoom] = useState(13);
  const [markerPosition, setMarkerPosition] = useState<L.LatLng | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
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

  const [mapError, setMapError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    // Function to run when the Google Maps library is ready
    const onGoogleMapReady = () => {
      setGoogleLibReady(true);
    };

    // Try to get user's current location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter([position.coords.latitude, position.coords.longitude]);
          setMarkerPosition(L.latLng(position.coords.latitude, position.coords.longitude));
          setLocationError(null);
        },
        (error) => {
          console.log("위치 정보를 가져올 수 없습니다:", error.message);
          setLocationError("위치 정보를 가져올 수 없습니다. 지도를 클릭하여 위치를 선택해주세요.");
          // 기본 위치를 서울로 설정
          setCenter([37.5665, 126.9780]);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
      // 기본 위치를 서울로 설정
      setCenter([37.5665, 126.9780]);
    }
  }, []);

  // Google Maps 로드 에러 처리
  const handleLoadError = (error: Error) => {
    console.log("Google Maps 로드 실패:", error);
    setMapError("지도를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.");
  };

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
    const res = await fetch(apiUrl+"/api-job/posting/", {
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
          setCenter([position.coords.latitude, position.coords.longitude]);
          setMarkerPosition(L.latLng(position.coords.latitude, position.coords.longitude));
          setLocationError(null);
        },
        (error) => {
          console.log("위치 정보를 가져올 수 없습니다:", error.message);
          setLocationError("위치 정보를 가져올 수 없습니다. 지도를 클릭하여 위치를 선택해주세요.");
          // 기본 위치를 서울로 설정
          setCenter([37.5665, 126.9780]);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
      // 기본 위치를 서울로 설정
      setCenter([37.5665, 126.9780]);
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

  

  // 위치 찾기 성공 핸들러
  const handleLocationFound = useCallback((latlng: L.LatLng) => {
    setMarkerPosition(latlng);
    setCenter([latlng.lat, latlng.lng]);
    setFormData(prev => ({
      ...prev,
      latitude: latlng.lat.toString(),
      longitude: latlng.lng.toString(),
    }));
    setLocationError(null);
  }, []);

  // 위치 찾기 실패 핸들러
  const handleLocationError = useCallback((error: L.ErrorEvent) => {
    console.log("위치 정보를 가져올 수 없습니다:", error.message);
    setLocationError("위치 정보를 가져올 수 없습니다. 지도를 클릭하여 위치를 선택해주세요.");
  }, []);

  // 현재 위치 찾기
  const findMyLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latlng = L.latLng(position.coords.latitude, position.coords.longitude);
          handleLocationFound(latlng);
        },
        (error) => {
          handleLocationError({ type: 'locationerror', message: error.message } as L.ErrorEvent);
        }
      );
    } else {
      setLocationError("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
    }
  }, [handleLocationFound, handleLocationError]);

  return (
    <main className="container mx-auto px-4 py-8 bg-gradient-to-b from-slate-100 to-slate-200 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          선교지 등록하기
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 섹션 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">기본 정보</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="선교지 제목을 입력해주세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  선교사 유형 <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">선택해주세요</option>
                  <option value="01">선교사 요청</option>
                  <option value="02">단기 선교사 요청</option>
                </select>
              </div>
            </div>
          </section>

          {/* 기간 섹션 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">선교 기간</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  시작일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  placeholder="시작일을 입력해주세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  종료일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  placeholder="종료일을 입력해주세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </section>

          {/* 위치 정보 섹션 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">위치 정보</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  국가 <span className="text-red-500">*</span>
                </label>
                <CountrySelect
                  containerClassName="form-group"
                  inputClassName="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleCountryChange}
                  placeHolder="국가를 선택해주세요"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  주/도
                </label>
                <StateSelect
                  countryid={countryid}
                  containerClassName="form-group"
                  inputClassName="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e: { id: React.SetStateAction<number> }) => {
                    setStateid(e.id);
                  }}
                  placeHolder="주/도를 선택해주세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  도시
                </label>
                <CitySelect
                  countryid={countryid}
                  stateid={stateid}
                  containerClassName="form-group"
                  inputClassName="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleCityChange}
                  placeHolder="도시를 선택해주세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  상세 주소 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="상세 주소를 입력해주세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="rounded-lg overflow-hidden border border-gray-300">
                {locationError && (
                  <div className="bg-yellow-50 p-4 rounded-md mb-4">
                    <p className="text-yellow-700">{locationError}</p>
                  </div>
                )}
                <div className="h-[400px] rounded-lg overflow-hidden border border-gray-300">
                  <MapContainer
                    center={center}
                    zoom={zoom}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapEvents
                      onLocationFound={handleLocationFound}
                      onLocationError={handleLocationError}
                    />
                    <ChangeView center={center} zoom={zoom} />
                    {markerPosition && (
                      <Marker position={markerPosition} icon={icon} />
                    )}
                  </MapContainer>
                </div>
                <p className="text-sm text-gray-500">
                  지도를 클릭하여 정확한 위치를 선택하거나, '내 위치 찾기' 버튼을 눌러주세요.
                </p>
                <button
                  type="button"
                  onClick={findMyLocation}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  내 위치 찾기
                </button>
              </div>
            </div>
          </section>

          {/* 추가 정보 섹션 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">추가 정보</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  언어 <span className="text-red-500">*</span>
                </label>
                <LanguageSelect
                  containerClassName="form-group"
                  inputClassName="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleLanguageChange}
                  displayNative={false}
                  placeHolder="사용 언어를 선택해주세요"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  필요한 사역 <span className="text-red-500">*</span>
                </label>
                <Select
                  instanceId="taskSelect"
                  isMulti
                  options={taskOptions}
                  name="tasks"
                  placeholder="필요한 사역을 선택해주세요"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(selected) =>
                    setFormData({ ...formData, tasks: selected.map((s) => s.value) })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  대표 이미지
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 015.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>이미지 업로드</span>
                        <input
                          id="file-upload"
                          name="image"
                          type="file"
                          className="sr-only"
                          onChange={handleFileUpload}
                        />
                      </label>
                      <p className="pl-1">또는 드래그 앤 드롭</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  상세 설명 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="선교지에 대한 상세한 설명을 입력해주세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                  required
                ></textarea>
              </div>
            </div>
          </section>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
