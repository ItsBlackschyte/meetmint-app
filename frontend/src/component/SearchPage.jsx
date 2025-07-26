import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import EventCard from './EventCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get('query') || '';
  // const location = searchParams.get('location') || '';

  useEffect(() => {
    if (query.trim() === '') {
      navigate('/');
    }
  }, [query, navigate]);

  const events = [
    {
      id: 1,
      title: 'Music Concert',
      location: 'Mumbai',
      date: '2025-08-01',
      price: 500,
      image: 'https://www.cvent.com/sites/default/files/image/2023-10/Event_Experience-Cvent_CONNECT_2023.jpg',
    },
    {
      id: 2,
      title: 'Art Workshop',
      location: 'Delhi',
      date: '2025-08-15',
      price: 300,
      image: 'https://www.cvent.com/sites/default/files/image/2023-10/Event_Experience-Cvent_CONNECT_2023.jpg',
    },
    {
      id: 3,
      title: 'Tech Conference',
      location: 'Bangalore',
      date: '2025-09-10',
      price: 1000,
      image: 'https://www.cvent.com/sites/default/files/image/2023-10/Event_Experience-Cvent_CONNECT_2023.jpg',
    },
  ].filter(
    (event) =>
      event.title.toLowerCase().includes(query.toLowerCase()) 
    // &&  (location ? event.location.toLowerCase() === location.toLowerCase() : true)
  );

  return (
    <div className="py-4 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Search Results for "{query}" 
        {/* {location ? `in ${location}` : ''} */}
      </h2>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              location={event.location}
              date={event.date}
              price={event.price}
              image={event.image}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No events found.</p>
      )}
    </div>
  );
};

export default SearchPage;
